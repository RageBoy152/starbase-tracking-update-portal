//  React Hooks
import React, { useEffect, useState, useRef } from "react";


//  React Compontents




export const HardwareSpot = React.memo(({ object, setInspectedObject, updateObject, mapScale }) => {

  const lastUpdateTime = useRef(0);  // For throttle updates
  const throttleInterval = 75;  // Throttle interval for visual updates (faster, e.g., 100 ms)

  const draggingObjectId = useRef(null);

  const [armSetInspect, setArmSetInspect] = useState(false);
  const objectMoveSpeed = 1;

  const [newPos, setNewPos] = useState({ x: object.position.x, y: object.position.y });


  useEffect(() => {
    if (newPos.x !== object.position.x || newPos.y !== object.position.y) {
      setNewPos({ x: object.position.x, y: object.position.y });
    }
  }, [object]);


  function handleMouseDown(e) {
    if (draggingObjectId.current) return;

    setArmSetInspect(true);
    draggingObjectId.current = object.id;

    e.currentTarget.style.zIndex = 100;
    document.body.style.userSelect = 'none';
  }

  function handleMouseUp(e) {
    if (armSetInspect) { setInspectedObject(object); }

    // save position of object on mouse up
    updateObject(object.id, newPos.x, newPos.y, true, true);  // set "moving" and "save" flags to true

    draggingObjectId.current = null;
    e.currentTarget.style.zIndex = object.zIndex.split('_')[1];
    document.body.style.userSelect = 'unset';
  }

  function handleMouseMove(e) {
    // must be moving mouse over currently dragging object
    if (draggingObjectId.current != object.id) return;

    // must be holding LMB
    if (e.buttons != 1) return;

    // don't try to click object onmouseup if we have moved at all
    if (Math.abs(e.movementX) || Math.abs(e.movementY)) { setArmSetInspect(false); }


    const currentTime = Date.now();

    setNewPos((prevPos) => {
      const newX = prevPos.x + (e.movementX * (objectMoveSpeed / mapScale));
      const newY = prevPos.y + (e.movementY * (objectMoveSpeed / mapScale));


      // tell socket to update on interval
      if (currentTime - lastUpdateTime.current >= throttleInterval) {
        lastUpdateTime.current = currentTime;

        // tell backend to update object for other clients
        updateObject(object.id, newX, newY, true, false);  // "movement"=true; "save"=false
      }

      // set new pos x,y
      return { x: newX, y: newY };
    });

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
    <div className={`flex flex-col items-center gap-2 absolute text-black text-center font-bold uppercase leading-4`} style={{ left: `${newPos.x}px`, top: `${newPos.y}px` }}>
      <div onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onMouseMove={handleMouseMove} data-object-id={object.id} className={`z-[${object.zIndex.split('_')[1]}] cursor-pointer rounded-full w-[90px] h-[90px] object ${object.status == 'spot' ? 'bg-yellow-300' : `bg-green-500${object.status == 'faded' ? '/70' : ''}`}`}>
        <div className="flex flex-col h-full justify-center">
          {/* {object.status == 'spot' && (<a className="text-xxl flex justify-center items-center h-full"><i className="bi bi-plus"></i></a>)} */}
          {object.objectName.split('_')[1] == '' && (
            <>
              <p>{object.objectSN != null ? `${object.hardwareType} ${object.objectSN.split('_')[1]}` : ''}</p>
              <p>{object.options.barrels != null && formatHardwareBarrelText()}</p>
            </>
          )}

          {object.objectName.split('_')[1] !== '' &&
            object.objectName.split('_')[1].split("\n").map((line, index) => (
              <p key={index}>{line}</p>
            ))
          }
        </div>
      </div>

      <p className="text-xs leading-3 w-[90px]">{!object.objectSN.split('_')[1] && object.objectName.split('_')[1]}</p>
    </div>
  )
})
