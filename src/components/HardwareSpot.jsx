//  React Hooks



//  React Compontents




export default function HardwareSpot({ spot, hardware, setInspectedObject }) {
  // strip props from spot and hardware object
  const { hardwareId, spotName, spotType } = spot || {};
  const { spotId, standId, objectName, hardwareType } = hardware || {};

  // get common props based on func args
  const { id } = spot ? spot : hardware;
  const { position } = spot ? spot : hardware;


  const coordinateMultiplier = 90+20;



  function handleObjectClick(clickedSpot, clickedHardware) {
    setInspectedObject(clickedSpot ? clickedSpot : clickedHardware);
  }


  return (
    <div className={`flex flex-col items-center gap-2 absolute uppercase text-center text-black font-bold`} style={{ left: `${position.x * coordinateMultiplier}px`, top: `${position.y * coordinateMultiplier}px` }}>
      <div data-object-id={id} className={`cursor-pointer rounded-full w-[90px] h-[90px] ${spot && hardwareId == '' ? 'bg-yellow-300' : `bg-green-500`}`} onClick={() => handleObjectClick(spot, hardware)}>
        <div className="flex flex-col h-full justify-center">
          {spot && hardwareId == "" && (<a className="text-xxl flex justify-center items-center h-full"><i className="bi bi-plus"></i></a>)}
          <p>{hardware ? hardwareType != "Barrel" ? objectName : '' : ''}</p>
          <p>{hardware ? hardwareType != "Barrel" ? '' : 'ax:4' : ''}</p>
        </div>
      </div>

      <p className="text-sm">{(spot && spotName) ? spotName : standId}</p>
    </div>
  )
}
