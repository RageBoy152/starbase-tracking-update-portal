//  React Hooks

import { useEffect, useState } from "react";


//  React Compontents

import HardwareSpot from "./HardwareSpot";



export default function Map({ objects, setInspectedObject, inspectedObject, addNewObject }) {


  //    MAP NAVIGATION STATES    \\
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [start, setStart] = useState({ x: 0, y: 0 });



  //    MOUSE SCROLL = ZOOM    \\

  const handleWheel = (e) => {
    const zoomSpeed = 0.13;
    const newScale = Math.exp(Math.min(Math.log(5), Math.max(Math.log(0.05), Math.log(scale) - e.deltaY * zoomSpeed * 0.01)));


    // offset position to keep map centered during zoom
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const newPosition = {
      x: mouseX - ((mouseX - position.x) * newScale) / scale,
      y: mouseY - ((mouseY - position.y) * newScale) / scale,
    };

    setScale(newScale);
    setPosition(newPosition);
  };



  //    MAP DRAG EVENTS    \\

  const handleMouseDown = (e) => {
    setStart({ x: e.clientX - position.x, y: e.clientY - position.y });

    // prevent selection of text
    document.body.style.userSelect = "none";
  };


  const handleMouseMove = (e) => {
    if (e.buttons == 1) { setDragging(true); }
    else { return; }

    setPosition({
      x: e.clientX - start.x,
      y: e.clientY - start.y,
    });
  };


  const handleMouseUp = (e) => {
    !dragging && e.type != "mouseleave" && setInspectedObject(null);
    setDragging(false);
  };



  //    ACTIVE OBJECT CLASS    \\
  $(`.object.objectActive`).removeClass('objectActive border-2');
  if (inspectedObject) { $(`.object[data-object-id="${inspectedObject.id}"]:not(.objectActive)`).addClass('objectActive border-2'); }



  //    OBJECT DROP EVENT    \\

  function handleObjectDrop(e, ui) {               //  LOGIC ERROR HERE WHEN TRANSLATE AND ZOOM NOT DEFAULT ON MAP - DONT THINK IT ACCOUNTS FOR TRANSLATE AND ZOOM AT ALL RN
    // get template key from drag data
    let objectTemplateKey = ui.helper.data('objectTemplateKey');


    // get coords for calcing new positions
    let { x, y } = ui.helper[0].getBoundingClientRect();
    const mapRect = $('#objects-container')[0].getBoundingClientRect();
    
    // calc relative positions
    let spawnPosX = (x - mapRect.x);
    let spawnPosY = (y - mapRect.y);


    // add new object
    addNewObject(objectTemplateKey, spawnPosX, spawnPosY);
  }


  useEffect(() => {
    $(`#map-container`).droppable({
      helper: "clone",
      drop: function (e, ui) { handleObjectDrop(e, ui); },
      accept: '.draggableObject'
    });
  }, []);


  return (
    <div
      className="relative w-screen h-screen overflow-hidden cursor-grab"
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}

      // onDrop={handleObjectDrop}
      // onDragOver={(e) => e.preventDefault()}

      id="map-container"
    >

      {/*  SECTION FOR BTNS BOTTOMRIGHT OF MAP IF NEEDED  */}
      {/* <section className="flex justify-end items-center w-min fixed bottom-0 end-[320px] p-10">
        <a href="" className="ring-1 ring-white hover:bg-white hover:text-black w-[40px] aspect-square flex justify-center items-center rounded"><i className="bi bi-plus-lg flex"></i></a>
      </section> */}


      <section id="objects-container" className="relative" style={{ transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`, transformOrigin: "top left", }}>
        {objects && objects.map((object, index) => (
          <HardwareSpot key={index} object={object} setInspectedObject={setInspectedObject} />
        ))}
      </section>
    </div>
  );
}
