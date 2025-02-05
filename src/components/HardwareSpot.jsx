//  React Hooks
import { useEffect } from "react";


//  React Compontents




export default function HardwareSpot({ object, setInspectedObject }) {


  useEffect(() => {
    $('.draggableObject').draggable({
      helper: 'clone',
      revert: 'invalid',
      start: function (e, ui) {
        const objectTemplateKey = $(this).attr('data-object-template-key');
        ui.helper.data("objectTemplateKey", objectTemplateKey);
      },
      opacity: 0.5
    });
  }, [object]);



  function handleObjectClick(clickedObject) {
    setInspectedObject(clickedObject);
  }


  function formatHardwareBarrelText() {
    let hardwareBarrelText = '';
    let barrelCount = parseInt(object.options.barrels.split('_')[1]);

    if (barrelCount != 6 && barrelCount != 0) {
      let totalBarrels = 0;

      Object.keys(object.options.barrelConfig).forEach((barrel, index) => {
        if (object.options.barrelConfig[barrel].barrelRings == null || index > barrelCount) { return; }

        totalBarrels += parseInt(object.options.barrelConfig[barrel].barrelRings.split('_')[3]);
      });

      hardwareBarrelText = `N:${totalBarrels}`;
    }
    else if (barrelCount == 0) { hardwareBarrelText = 'NC' }

    return hardwareBarrelText;
  }


  return (
    <div className={`flex flex-col items-center gap-2 absolute text-black text-center font-bold uppercase leading-4`} style={{ left: `${object.position.x}px`, top: `${object.position.y}px` }}>
      <div data-object-id={object.id} className={`draggableObject cursor-pointer rounded-full w-[90px] h-[90px] object ${object.status == 'spot' ? 'bg-yellow-300' : `bg-green-500${object.status == 'faded' ? '/70' : ''}`}`} onClick={() => handleObjectClick(object)}>
        <div className="flex flex-col h-full justify-center">
          {object.status == 'spot' && (<a className="text-xxl flex justify-center items-center h-full"><i className="bi bi-plus"></i></a>)}
          <p>{object.objectSN != null ? `${object.hardwareType} ${object.objectSN}` : ''}</p>
          <p>{object.options.barrels != null && formatHardwareBarrelText()}</p>
        </div>
      </div>

      <p className="text-xs leading-3 w-[90px]">{!object.objectSN && object.objectName}</p>
    </div>
  )
}
