//  React Hooks
import { useState } from 'react';


//  React Compontents
import NavigationBar from '../components/NavigationBar.jsx'
import InspectorBar from '../components/InspectorBar.jsx'
import Map from '../components/Map.jsx'


//  Data
import spots from '../spots.json';



export default function Console() {
  const [inspectedObject, setInspectedObject] = useState(null);
  
  const inspectedObjectOptions = inspectedObject ? spots.spotTypes[inspectedObject.spotType].options : null;


  return (
    <>
      <NavigationBar />
      <InspectorBar inspectedObject={inspectedObject} inspectedObjectOptions={inspectedObjectOptions} />
      <Map spots={spots.spots} setInspectedObject={setInspectedObject} />
    </>
  )
}
