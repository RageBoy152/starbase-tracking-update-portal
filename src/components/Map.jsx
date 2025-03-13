//  React Hooks

import { useEffect, useState, useRef, useMemo } from "react";


//  React Compontents

import { HardwareSpot } from "./HardwareSpot";



export default function Map({ objects, setInspectedObject, inspectedObject, addNewObject, updateObject }) {
  const memoizedObjects = useMemo(() => objects, [objects]);



  //    MAP NAVIGATION STATES    \\
  
  const zoomSpeed = 0.1;
  const minZoom = 0.5;
  const maxZoom = 3;

  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const [armClearInspect, setArmClearInspect] = useState(false);
  const [cancelDrag, setCancelDrag] = useState(false);


  const mapRef = useRef(null);



  function handleScroll(e) {
    if (!mapRef.current) return;

    const rect = mapRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const scaleFactor = 1 + zoomSpeed * -Math.sign(e.deltaY);
    const newScale = Math.max(minZoom, Math.min(maxZoom, scale * scaleFactor));

    // Calculate how much the zoom is shifting the position
    const scaleRatio = newScale / scale;
    const newPosX = mouseX - (mouseX - position.x) * scaleRatio;
    const newPosY = mouseY - (mouseY - position.y) * scaleRatio;

    setScale(newScale);
    setPosition({ x: newPosX, y: newPosY });
  }

  function handleMouseDown(e) {
    // allow clicks on map objects
    if (e.target != mapRef.current) { setCancelDrag(true); }
    
    setArmClearInspect(true);
    document.body.style.userSelect = 'none';
  }

  function handleMouseUp(e) {
    if (armClearInspect && !cancelDrag) { setInspectedObject(null); }

    setCancelDrag(false);
    document.body.style.userSelect = 'unset';
  }

  function handleMouseMove(e) {
    // must be holding LMB
    if (e.buttons != 1 || cancelDrag) { return; }

    setArmClearInspect(false);

    setPosition({
      x: position.x + e.movementX,
      y: position.y + e.movementY
    });
  }



  //    ACTIVE OBJECT CLASS    \\
  $(`.object.objectActive`).removeClass('objectActive border-2');
  if (inspectedObject) { $(`.object[data-object-id="${inspectedObject.id}"]:not(.objectActive)`).addClass('objectActive border-2'); }



  //    OBJECT DROP EVENT - ADD NEW OBJECT    \\

  function handleNewObjectDrop(e, ui) {               //  LOGIC ERROR HERE - ON GETTING POSITION
    // get template key from drag data
    let objectTemplateKey = ui.helper.data('objectTemplateKey');

    // get coords for calcing new positions
    let { x, y } = ui.helper[0].getBoundingClientRect();
    const mapRect = $('#objects-container')[0].getBoundingClientRect();
    
    // calc relative positions
    let spawnPosX = ((x - mapRect.x) - position.x) / scale;
    let spawnPosY = ((y - mapRect.y) - position.y) / scale;

    // add new object
    addNewObject(objectTemplateKey, spawnPosX, spawnPosY);
  }


  useEffect(() => {
    $(mapRef.current).droppable({
      helper: "clone",
      drop: function (e, ui) { handleNewObjectDrop(e, ui); },
      accept: '.draggableObject'
    });
  }, [objects]);


  return (
    <div
      className="relative w-screen h-screen overflow-hidden cursor-grab"
      ref={mapRef}

      onWheel={handleScroll}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      <section id="objects-container" className="relative"
      style={{
        transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
        transformOrigin: "top left"
        }}
      >
        {memoizedObjects && memoizedObjects.map((object, index) => (
          <HardwareSpot key={index} object={object} setInspectedObject={setInspectedObject} updateObject={updateObject} mapScale={scale} />
        ))}
      </section>
    </div>
  );
}
