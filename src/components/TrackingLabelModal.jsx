//  React Hooks
import { useLocation } from "react-router-dom";
import { useRef } from "react";


//  React Compontents
import InventoryLabel1 from "./InventoryLabel1";


//  Data
import hardware from '../hardware.json';
import spots from '../spots.json';



import { copyText } from '../utils/utils.js';
import html2canvas from "html2canvas";




export default function TrackingLabelModal() {
  const copyLinkRef = useRef();

  const location = useLocation();

  const selectedObject = hardware.objects.find(object => object.id == new URLSearchParams(location.search).get('id')) || spots.spots.find(spot => spot.id == new URLSearchParams(location.search).get('id'));



  //  FIND YT TUT ON THIS
  function downloadLabel() {
    
  }



  return (
    <>
      <section className="flex flex-col gap-5 w-screen h-screen bg-black shadow-md rounded px-10 py-5 justify-start items-start">
        <section className="text-xl font-semibold uppercase">
          <h1>Inventory Label</h1>
          <h2 className="text-base">{selectedObject.objectSN ? `${selectedObject.hardwareType} ${selectedObject.objectSN}` : selectedObject.objectName}</h2>
        </section>

        <section className="flex h-min justify-center items-center">
          <InventoryLabel1 object={selectedObject} />
        </section>

        <section className="flex gap-3">
          <a className="ring-1 ring-white hover:bg-white hover:text-black w-[40px] aspect-square flex justify-center items-center rounded cursor-pointer" ref={copyLinkRef} onClick={() => copyText(window.location.href, copyLinkRef.current)}><i className="bi bi-link-45deg flex"></i></a>
          <a className="ring-1 ring-white hover:bg-white hover:text-black w-[40px] aspect-square flex justify-center items-center rounded cursor-pointer" onClick={downloadLabel}><i className="bi bi-download flex"></i></a>
        </section>
      </section>
    </>
  )
}
