//  React Hooks



//  React Compontents




export default function HardwareSpot({ spot, object, setInspectedObject }) {
  // strip props from spot and hardware object
  const { hardwareId, spotName, spotType } = spot || {};
  const { spotId, standId, objectName, hardwareType } = object || {};

  // get common props based on func args
  const { id } = spot ? spot : object;
  const { position } = spot ? spot : object;


  const coordinateMultiplier = 90+20;



  function handleObjectClick(clickedSpot, clickedObject) {
    setInspectedObject(clickedSpot ? clickedSpot : clickedObject);
  }


  return (
    <div className={`flex flex-col items-center gap-2 absolute uppercase text-center text-black font-bold`} style={{ left: `${position.x * coordinateMultiplier}px`, top: `${position.y * coordinateMultiplier}px` }}>
      <div data-object-id={id} className={`cursor-pointer rounded-full w-[90px] h-[90px] object ${spot && hardwareId == '' ? 'bg-yellow-300' : `bg-green-500`}`} onClick={() => handleObjectClick(spot, object)}>
        <div className="flex flex-col h-full justify-center">
          {spot && hardwareId == "" && (<a className="text-xxl flex justify-center items-center h-full"><i className="bi bi-plus"></i></a>)}
          <p>{object ? hardwareType != "Barrel" ? objectName : '' : ''}</p>
          <p>{object ? hardwareType != "Barrel" ? '' : 'ax:4' : ''}</p>
        </div>
      </div>

      <p className="text-sm">{(spot && spotName) ? spotName : standId}</p>
    </div>
  )
}
