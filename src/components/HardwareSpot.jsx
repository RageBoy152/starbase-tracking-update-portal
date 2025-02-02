//  React Hooks



//  React Compontents




export default function HardwareSpot({ object, setInspectedObject }) {



  function handleObjectClick(clickedObject) {
    setInspectedObject(clickedObject);
  }



  return (
    <div className={`flex flex-col items-center gap-2 absolute text-black text-center font-bold uppercase leading-4`} style={{ left: `${object.position.x}px`, top: `${object.position.y}px` }}>
      <div data-object-id={object.id} className={`cursor-pointer rounded-full w-[90px] h-[90px] object ${object.status == 'spot' ? 'bg-yellow-300' : `bg-green-500${object.status == 'faded' ? '/70' : ''}`}`} onClick={() => handleObjectClick(object)}>
        <div className="flex flex-col h-full justify-center">
          {object.status == 'spot' && (<a className="text-xxl flex justify-center items-center h-full"><i className="bi bi-plus"></i></a>)}
          <p>{object.objectSN != null ? `${object.hardwareType} ${object.objectSN}` : ''}</p>
          <p>{object.options.barrels != null && object.options.barrels.split('number_')[1].split('_')[0] != 6 ? Object.keys(object.options.barrelConfig)[object.options.barrels.split('number_')[1].split('_')[0]] : ''}</p>
        </div>
      </div>

      <p className="text-xs leading-3 w-[90px]">{!object.objectSN && object.objectName}</p>
    </div>
  )
}
