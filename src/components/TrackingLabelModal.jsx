//  React Hooks
import { useLocation } from "react-router-dom";
import { useRef, useState, useEffect } from "react";


//  React Compontents
import InventoryLabel1 from "./InventoryLabel1";


//  Data
// import hardware from '../hardware.json';
// import spots from '../spots.json';

import { socket } from '../utils/socketIOHandler.js';



import { copyText } from '../utils/utils.jsx';
// import html2canvas from "html2canvas";




export default function TrackingLabelModal() {
  const copyLinkRef = useRef();
  const location = useLocation();
  
  const [selectedObjectData, setSelectedObjectData] = useState(null);



  useEffect(() => {

    // fetch object
    const fetchObject = async () => {
      try {
        const objId = new URLSearchParams(location.search).get('id');
        if (!objId) { return; }

        const res = await fetch(`http://localhost:3002/objects/fetch-objects?id=${objId}`);
        if (!res.ok) { throw new Error(res.statusText); }

        const json = await res.json();
        
        setSelectedObjectData(json);
      }
      catch (error) {
        console.error("Error handling fetchObject response");
        console.error(error);
      }
    }


    fetchObject();
  }, []);

  

  //  FIND YT TUT ON THIS
  function downloadLabel() {
    
  }



  return (selectedObjectData && (
    <>
      <section className="flex flex-col gap-5 w-screen h-screen bg-black shadow-md rounded px-10 py-5 justify-start items-start">
        <section className="text-xl font-semibold uppercase">
          <h1>Inventory Label</h1>
          <h2 className="text-base">{selectedObjectData.objectSN ? `${selectedObjectData.hardwareType} ${selectedObjectData.objectSN.split('_')[1]}` : selectedObjectData.objectName.split('_')[1]}</h2>
        </section>

        <section className="flex h-min justify-center items-center">
          <InventoryLabel1 object={selectedObjectData} />
        </section>

        <section className="flex gap-3">
          <a className="ring-1 ring-white hover:bg-white hover:text-black w-[40px] aspect-square flex justify-center items-center rounded cursor-pointer" ref={copyLinkRef} onClick={() => copyText(window.location.href, copyLinkRef.current)}><i className="bi bi-link-45deg flex"></i></a>
          <a className="ring-1 ring-white hover:bg-white hover:text-black w-[40px] aspect-square flex justify-center items-center rounded cursor-pointer" onClick={downloadLabel}><i className="bi bi-download flex"></i></a>
        </section>
      </section>
    </>
  ))
}
