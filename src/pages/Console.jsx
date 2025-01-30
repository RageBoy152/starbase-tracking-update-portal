//  React Hooks
import { useState } from 'react';


//  React Compontents
import NavigationBar from '../components/NavigationBar.jsx'
import InspectorBar from '../components/InspectorBar.jsx'
import Map from '../components/Map.jsx'


//  Data
import spots from '../spots.json';
import hardware from '../hardware.json';



export default function Console() {
  const [inspectedObject, setInspectedObject] = useState(null);
  
  const inspectedObjectOptions = inspectedObject ? spots.spotTypes[inspectedObject.spotType] ? spots.spotTypes[inspectedObject.spotType].options : hardware.hardwareTypes[inspectedObject.hardwareType].options : null;


  function setInspectedObjectOptionValue(optionName, newValue) {
    // temp function - would ask socket.io server to update clients and db here
    console.log(`Setting '${optionName}' to '${newValue}'`);
  }



  return (
    <>
      <NavigationBar />
      <InspectorBar inspectedObject={inspectedObject} inspectedObjectOptions={inspectedObjectOptions} setInspectedObjectOptionValue={setInspectedObjectOptionValue} />
      <Map spots={spots.spots} objects={hardware.objects} setInspectedObject={setInspectedObject} inspectedObject={inspectedObject} />
    </>
  )
}
