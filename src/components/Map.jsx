//  React Hooks

import { useState } from "react";


//  React Compontents

import HardwareSpot from "./HardwareSpot";



export default function Map({ spots, hardware, setInspectedObject }) {

  // map navigation states
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [start, setStart] = useState({ x: 0, y: 0 });



  // zoom via mouse scroll
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

  // map drag start
  const handleMouseDown = (e) => {
    setDragging(true);
    setStart({ x: e.clientX - position.x, y: e.clientY - position.y });

    // prevent selection of text
    document.body.style.userSelect = "none";
  };

  // map dragging
  const handleMouseMove = (e) => {
    if (!dragging) return;
    setPosition({
      x: e.clientX - start.x,
      y: e.clientY - start.y,
    });
  };

  // map drag end
  const handleMouseUp = () => {
    setDragging(false);
  };



  return (
    <div
      className="relative w-screen h-screen overflow-hidden cursor-grab"
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <section
        className="relative"
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        {spots.map((spot, index) => (
          <HardwareSpot key={index} spot={spot} setInspectedObject={setInspectedObject} />
        ))}


        {hardware.map((hardware, index) => (
          <HardwareSpot key={index} hardware={hardware} setInspectedObject={setInspectedObject} />
        ))}
      </section>
    </div>
  );
}
