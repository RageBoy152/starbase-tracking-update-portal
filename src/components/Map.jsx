//  React Hooks

import { useState } from "react";


//  React Compontents

import HardwareSpot from "./HardwareSpot";



export default function Map({ spots, setInspectedObject }) {
  const [scale, setScale] = useState(1); // Zoom level
  const [position, setPosition] = useState({ x: 0, y: 0 }); // Container position
  const [dragging, setDragging] = useState(false); // Dragging state
  const [start, setStart] = useState({ x: 0, y: 0 }); // Initial drag position



  // Handle zooming with mouse wheel
  const handleWheel = (e) => {
    const zoomSpeed = 0.13;
    const newScale = Math.exp(Math.min(Math.log(5), Math.max(Math.log(0.05), Math.log(scale) - e.deltaY * zoomSpeed * 0.01)));


    // Adjust position to keep the zoom focused on the mouse pointer
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

  // Start dragging
  const handleMouseDown = (e) => {
    e.preventDefault();
    setDragging(true);
    setStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  // Dragging movement
  const handleMouseMove = (e) => {
    if (!dragging) return;
    setPosition({
      x: e.clientX - start.x,
      y: e.clientY - start.y,
    });
  };

  // Stop dragging
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
      </section>
    </div>
  );
}
