//  React Hooks
import { useState, useEffect } from 'react';


//  React Compontents
import NavigationBar from '../components/NavigationBar.jsx'
import InspectorBar from '../components/InspectorBar.jsx'
import Map from '../components/Map.jsx'


//  Data
// import hardware from '../hardware.json';
import objectTemplates from '../objectTemplates.json';

import { socket, fetchObjectsData, socketAddNewObject, socketDeleteInspectedObject, socketUpdateInspectedObject } from '../utils/socketIOHandler.js';



export default function ProductionSite() {
  const [objectsData, setObjectsData] = useState(null);
  const [inspectedObject, setInspectedObject] = useState(null);
  
  const inspectedObjectOptions = inspectedObject ? inspectedObject.options : null;



  useEffect(() => {
    fetchObjectsData();

    const handleRes = (data) => { setObjectsData(data); }

    socket.on('objectsFetchRes', handleRes);

    return () => { socket.off('objectsFetchRes', handleRes) }
  }, []);



  function setInspectedObjectOptionValue(optionName, newValue) {
    // temp function - would ask socket.io server to update clients and db here
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
    socketUpdateInspectedObject(editedObject);
  }


  function addNewObject(objectTemplateKey, spawnPosX, spawnPosY) {
    // temp function - would ask socket.io server to add to the db and update clients here
    // console.log(`Adding object from template '${objectTemplateKey}' at positions | X: ${spawnPosX}, Y: ${spawnPosY} |`);
    
    let newObject = objectTemplates[objectTemplateKey];
    newObject.position = { x: spawnPosX, y: spawnPosY };

    socketAddNewObject(newObject);
  }


  function deleteInspectedObject() {
    socketDeleteInspectedObject(inspectedObject.id);
    setInspectedObject(null);
  }



  return (
    <>
      <NavigationBar />
      <InspectorBar inspectedObject={inspectedObject} inspectedObjectOptions={inspectedObjectOptions} objectTemplates={objectTemplates} setInspectedObjectOptionValue={setInspectedObjectOptionValue} deleteInspectedObject={deleteInspectedObject} />
      <Map objects={objectsData} setInspectedObject={setInspectedObject} inspectedObject={inspectedObject} addNewObject={addNewObject} />
    </>
  )
}
