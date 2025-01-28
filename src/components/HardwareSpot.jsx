//  React Hooks



//  React Compontents




export default function HardwareSpot({ spot, setInspectedObject }) {
  const { id, hardwareId, spotName, spotType, position } = spot;
  

  function handleSpotClick(clickedSpot) {
    setInspectedObject(clickedSpot);
  }


  return (
    <div className={`flex flex-col items-center gap-2 absolute uppercase text-center text-black font-bold`} style={{ left: `${position.x}px`, top: `${position.y}px` }}>
      <div data-spot-id={id} className={`cursor-pointer rounded-full w-[90px] h-[90px] ${hardwareId == '' ? 'bg-yellow-300' : `bg-green-500`}`} onClick={() => handleSpotClick(spot)}>
        <div className="flex flex-col h-full justify-center">
          {hardwareId == "" && (<a className="text-xxl flex justify-center items-center h-full"><i className="bi bi-plus"></i></a>)}
          {/* <p>{vehicle}</p>
          <p>{barrel}</p> */}
        </div>
      </div>

      <p className="text-sm">{spotName}</p>
    </div>
  )
}
