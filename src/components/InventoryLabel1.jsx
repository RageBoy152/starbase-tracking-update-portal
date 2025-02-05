//  React Hooks
import { useEffect, useState } from "react";



//  React Compontents


import bwipjs from "bwip-js";



export default function InventoryLabel1({ object, quantity=1 }) {
  const [src, setImageSrc] = useState('');


  //  create data matrix image
  useEffect(() => {
    let canvas = document.createElement("canvas");
    bwipjs.toCanvas(canvas, {
      bcid: "datamatrix", // Barcode type
      text: object.id, // Text to encode
      scale: 1, // 3x scaling factor
      height: 20, // Bar height, in millimeters
      includetext: true, // Show human-readable text
      textxalign: "center" // Always good to set this
    });
    setImageSrc(canvas.toDataURL("image/png"));
  }, []);



  function getInvItemName() {
    let objectName = '';

    switch (object.hardwareType) {
      case 'Ship':
        objectName = 'Starship';
        break;
      case 'Booster':
        objectName = 'Superheavy';
        break;
    }

    return objectName != '' && object.objectSN != null ? `${objectName} ${objectName[0]}N${object.objectSN}` : object.objectName;
  }



  // Simple hash function to generate a numeric seed from the UUIDv4
  function uuidToSeed(uuid) {
    let hash = 0;
    for (let i = 0; i < uuid.length; i++) {
      hash = (hash << 5) - hash + uuid.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  }

  // Simple RNG seeded with the hash of the UUIDv4
  function seededRandom(seed) {
    seed = (seed ^ 61) ^ (seed >>> 16);
    seed += seed << 3;
    seed ^= seed >>> 4;
    seed *= 0x27d4eb2d;
    seed ^= seed >>> 15;
    return (seed & 0xFFFFFFFF) / 0xFFFFFFFF;
  }

  function genRanPartNum() {
    return `LO${Math.floor(100 + seededRandom(uuidToSeed(object.id)) * 900)}-${Math.floor(10 + seededRandom(uuidToSeed(object.id)) * 90)}${String.fromCharCode(65 + Math.floor(seededRandom(uuidToSeed(object.id)) * 26))}`;
  }

  function genRanLotNum() {
    return `FX0-${Math.floor(10000 + seededRandom(uuidToSeed(object.id)) * 90000)}-${Math.floor(1 + seededRandom(uuidToSeed(object.id)) * 9)}`;
  }

  function genRanTrackNum() {
    const seed = uuidToSeed(object.id);
    let trackString = "";
  
    // Generate a 7-character alphanumeric string
    for (let i = 0; i < 7; i++) {
      const randValue = Math.floor(seededRandom(seed + i) * 36); // 0-9, A-Z
      trackString += randValue < 10 ? randValue.toString() : String.fromCharCode(65 + randValue - 10);
    }
  
    return `SPX-${trackString}`;
  }




  return (
    <section className="flex flex-col bg-white text-black rounded-xl px-5 py-1 font-Bebas min-w-[400px] min-h-[150px]">
      <section className="flex">
        <div className="flex flex-col items-center justify-center me-8">
          <img src="./SpaceXLogoBlack.png" alt="SpaceX" />
          <p className="text-center leading-5 tracking-wider mt-3 text-l">{object.hardwareOrigin} <br></br> {object.hardwareType} {['Ship', 'Booster'].includes(object.hardwareType) && 'Tribe$'}</p>
        </div>
        <div className="flex flex-col">
          <div className="flex justify-between">
            <p className="mb-2">QTY: <span className="text-l">{quantity}</span></p>
            <p className="border-black border-e pe-3 me-9 mt-1">EA</p>
          </div>
          <div className="border-black border border-b-0 flex flex-col pt-1 px-2">
            <p className="flex items-baseline gap-3"><span className="text-sm">LOT#:</span> {genRanLotNum()}</p>
            <p className="text-center" style={{marginTop: -5}}>{genRanTrackNum()}</p>
          </div>
        </div>
        <div className="flex items-end pb-3 ps-7">
          <img className="h-[50px]" src={src} alt="data matrix" />
        </div>
      </section>
      <section className="flex flex-col border-black border-t-2 me-4">
        <p className="mt-1 tracking-wide">{getInvItemName()}</p>
        <p className="text-l tracking-wider" style={{marginTop: -7}}>{genRanPartNum()}</p>
      </section>
    </section>
  )
}