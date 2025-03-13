//  React Hooks
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../Authenticator.jsx';


//  React Compontents
import NavigationBar from '../components/NavigationBar.jsx'
import InspectorBar from '../components/InspectorBar.jsx'
import Map from '../components/Map.jsx'


//  Data
// import hardware from '../hardware.json';
import objectTemplates from '../objectTemplates.json';

import { socket, socketUpdateObject, socketAddNewObject, socketDeleteObject } from '../utils/socketIOHandler.js';



export default function ProductionSite() {
  const { user, logout } = useAuth();


  const [objectsData, setObjectsData] = useState(null);
  const [inspectedObject, setInspectedObject] = useState(null);

  const location = useLocation();
  const [selectedObjectId, setSelectedObjectId] = useState(new URLSearchParams(location.search).get('id'));



  useEffect(() => {

    // fetch objects
    const fetchObjects = async () => {
      try {
        const res = await fetch(`http://localhost:3002/objects/fetch-objects`);
        if (!res.ok) { throw new Error(res.statusText); }

        const json = await res.json();
        
        setObjectsData(json);
      }
      catch (error) {
        console.error("Error handling fetchObjects response");
        console.error(error);
      }
    }


    
    // update object
    socket.on('updateThisObject', object => {
      setObjectsData(prevObjects => {
        const objectIsNew = !prevObjects.some(item => item.id == object.id);

        if (objectIsNew) { return [...prevObjects, object]; }
        else { return prevObjects.map(item => item.id == object.id ? object : item); }
      });
    });



    // delete object
    socket.on('deleteThisObject', objectId => {
      setObjectsData(prevObjects => prevObjects.filter(item => item.id !== objectId));
    });



    // error during socket request
    socket.on('objectSocketRequestError', errObj => {
      console.error(`Server error on '${errObj.action}'. Message: ${errObj.error_message}`);
      console.error(errObj.error);
    });



    fetchObjects();


    return () => {
      socket.off('updateThisObject');
      socket.off('deleteThisObject');
      socket.off('objectSocketRequestError');
    }
  }, []);



  useEffect(() => {
    if (!inspectedObject && objectsData && selectedObjectId) {
      // automatically inspect object if id in url
      setInspectedObject(objectsData.find(obj => obj.id == selectedObjectId));
      setSelectedObjectId(null);  // only behave like this on first load
    }
    else if (inspectedObject && objectsData) {
      // update inspected object to reflect new data
      setInspectedObject(prevInspectedObject => objectsData.find(object => object.id == prevInspectedObject.id));
    }
  }, [objectsData])



  // used by inspector options onchange or onsubmit
  function setInspectedObjectOptionValue(optionPath, optionName, newValue) {
    // ask socket.io server to update clients and db here
    console.log(`Setting '${optionName}' to '${newValue}'`);


    let editedObject = { ...inspectedObject };
    let parentObj = editedObject;


    // Traverse the path in the edited object
    if (parentObj[optionName] == null) {
      parentObj = parentObj.options;
      
      for (let i=0; i<optionPath.length; i++) {
        parentObj = parentObj[optionPath[i]];
      }
    }
    

    // Ensure the value follows the format <type>_<value>_<min>_<max>_<step>
    let splitVal = parentObj[optionName].split('_');
    splitVal[1] = newValue;  // Replace the current value with the new one

    // Update the final key in the object
    parentObj[optionName] = splitVal.join('_');


    // tell socket to update
    socketUpdateObject(editedObject, { save: true });
  }



  // used by map ondrop
  function addNewObject(objectTemplateKey, spawnPosX, spawnPosY) {
    let newObject = objectTemplates[objectTemplateKey];
    newObject.position = { x: spawnPosX, y: spawnPosY };
    newObject.hardwareOnMap = location.pathname.split('/')[1];

    socketAddNewObject(newObject);
  }

  

  // used by HardwareSpot onmove
  function updateObject(objectId, newPosX, newPosY, moving, save) {
    let editedObject = { ...objectsData.find(object => object.id == objectId) };
    editedObject.position = { x: newPosX, y: newPosY };
    editedObject.hardwareOnMap = location.pathname.split('/')[1];

    socketUpdateObject(editedObject, { moving: moving, save: save });
  }



  return (
    <>
      <NavigationBar logout={logout} user={user} />
      <InspectorBar inspectedObject={inspectedObject} objectTemplates={objectTemplates} setInspectedObjectOptionValue={setInspectedObjectOptionValue} deleteObject={socketDeleteObject} />
      <Map objects={objectsData} setInspectedObject={setInspectedObject} inspectedObject={inspectedObject} addNewObject={addNewObject} updateObject={updateObject} />
    </>
  )
}
