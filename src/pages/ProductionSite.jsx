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

import { socket, fetchObjectsData, socketUpdateObject, socketAddNewObject, socketDeleteInspectedObject } from '../utils/socketIOHandler.js';



export default function ProductionSite() {
  const { user, logout } = useAuth();


  const [objectsData, setObjectsData] = useState(null);
  const [inspectedObject, setInspectedObject] = useState(null);

  const location = useLocation();
  const urlSelectedObjectId = new URLSearchParams(location.search).get('id');



  useEffect(() => {
    fetchObjectsData();

    const handleRes = (data, updateSingleObject) => {
      if (updateSingleObject) {
        if (inspectedObject && inspectedObject.id == data.id) { setInspectedObject(data); }

        setObjectsData(prevData => 
          prevData.map(obj => obj.id == data.id ? data : obj)
        );
      }
      else {
        if (inspectedObject) { setInspectedObject(data.find(object => object.id == inspectedObject.id)); }
        setObjectsData(data);
      }

    }

    socket.on('objectsFetchRes', handleRes);

    return () => { socket.off('objectsFetchRes', handleRes) }
  }, []);


  useEffect(() => {
    if (inspectedObject) {
      const updatedObject = objectsData?.find(obj => obj.id === inspectedObject.id);

      if (updatedObject && updatedObject !== inspectedObject) {
        setInspectedObject({ ...updatedObject });
      }
    }


    if (objectsData && urlSelectedObjectId) {
      setInspectedObject(objectsData.find(object => object.id == urlSelectedObjectId));
    }
  }, [objectsData]);


  function setInspectedObjectOptionValue(optionName, newValue) {
    // ask socket.io server to update clients and db here
    console.log(`Setting '${optionName}' to '${newValue}'`);


    function findPropPathInObject(object, path = []) {
      // If it's an object, check each key
      if (typeof object === 'object' && object !== null) {
        for (const key in object) {
          const currentPath = [...path, key];
          
          // If we find the key, return the path
          if (key === optionName) {
            return currentPath;
          }
  
          // Otherwise, recursively search deeper
          const result = findPropPathInObject(object[key], currentPath);
          if (result) return result;  // If found, return the result path
        }
      }
  
      return null;  // Return null if the key isn't found
    }


    let propPath = findPropPathInObject(inspectedObject);
    let editedObject = { ...inspectedObject };

    // Use the propPath to assign the new value
    let currentObj = editedObject;
    for (let i = 0; i < propPath.length - 1; i++) {
      currentObj = currentObj[propPath[i]];  // Traverse the path
    }

    // Now set the value of the final key in the path
    let splitVal = currentObj[propPath[propPath.length - 1]].split('_');
    splitVal[1] = newValue;

    currentObj[propPath[propPath.length - 1]] = splitVal.join('_');


    // tell socket to update
    socketUpdateObject(editedObject);
  }


  function addNewObject(objectTemplateKey, spawnPosX, spawnPosY) {
    let newObject = objectTemplates[objectTemplateKey];
    newObject.position = { x: spawnPosX, y: spawnPosY };
    newObject.hardwareOnMap = location.pathname.split('/')[1];

    socketAddNewObject(newObject);
  }

  
  function updateObject(objectId, newPosX, newPosY, moving, save) {
    let editedObject = { ...objectsData.find(object => object.id == objectId) };
    editedObject.position = { x: newPosX, y: newPosY };
    editedObject.hardwareOnMap = location.pathname.split('/')[1];

    socketUpdateObject(editedObject, moving, save);
  }


  function deleteInspectedObject() {
    socketDeleteInspectedObject(inspectedObject.id);
    setInspectedObject(null);
  }



  return (
    <>
      <NavigationBar logout={logout} user={user} />
      <InspectorBar inspectedObject={inspectedObject} objectTemplates={objectTemplates} setInspectedObjectOptionValue={setInspectedObjectOptionValue} deleteInspectedObject={deleteInspectedObject} />
      <Map objects={objectsData} setInspectedObject={setInspectedObject} inspectedObject={inspectedObject} addNewObject={addNewObject} updateObject={updateObject} />
    </>
  )
}
