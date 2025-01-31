//  React Hooks



//  React Compontents
import InspectorOption from "./InspectorOption"


import React from "react"
import { camelToCapitalized, toggleInputGroup } from '../utils/utils.js';



export default function InspectorBar({ inspectedObject, inspectedObjectOptions, hardwareTypes, setInspectedObjectOptionValue, setInspectorModalOpen }) {
  // console.log(inspectedObject);
  // console.log(inspectedObjectOptions);


  function handleInspectedObjectOptionValueChange(optionName, newValue) {
    console.log(`${optionName}: ${newValue}`)
  }



  function spawnInspectorOption(options, depth=0) {

    // loop through options object
    return Object.keys(options).map((optionKey, index) => {
      // get option value and check if its an object
      let val = options[optionKey];
      let isObj = typeof val == "object" && !Array.isArray(val);


      if (isObj) {
        // loop through options > options object
        return (
          <React.Fragment key={optionKey}>
            <div className="collapse-wrapper">
              <p className={`py-1 border-t pt-5 border-black px-${((depth*1)+5)} font-semibold collapse-content-heading cursor-pointer`} onClick={toggleInputGroup}>
                <i className="bi bi-plus-square"></i>
                {camelToCapitalized(optionKey)}
              </p>
              <div className="collapse-content hidden">
                {spawnInspectorOption(val, depth+1)}
              </div>
            </div>
          </React.Fragment>
        )
      }
      else {
        // end of chain, add option to DOM
        return (
          <InspectorOption optionDepth={depth} key={optionKey} inspectedObjectOption={{optionName: optionKey, optionValue: val}} setInspectedObjectOptionValue={setInspectedObjectOptionValue} />
        )
      }
    });

  }


  function openPopup(e) {
    e.preventDefault();

    // popup dimensions
    const popupWidth = 600;
    const popupHeight = 450;

    // calc window pos
    const left = (window.innerWidth - popupWidth) / 2 + window.screenX;
    const top = (window.innerHeight - popupHeight) / 2 + window.screenY;

    // open popup
    window.open(e.currentTarget.href, "_blank", `width=${popupWidth},height=${popupHeight},top=${top},left=${left},noopener,noreferrer`);
  }



  return (
    <section className="w-2/12 min-w-[320px] fixed end-0 h-full flex flex-col bg-primary z-20">
      <section className="text-xl font-semibold uppercase p-6 ">
        <h1>{inspectedObject ? inspectedObject.objectSN ? `${inspectedObject.hardwareType} ${inspectedObject.objectSN}` : inspectedObject.objectName : 'Asset Inventory'}</h1>
        <h2 className="text-base">{inspectedObject ? 'Inspector' : 'Add Hardware'}</h2>
      </section>
      
      {inspectedObjectOptions && (
        <section className="flex justify-center items-center pb-7 px-7 gap-3">
          <a href="" className="ring-1 ring-white hover:bg-white hover:text-black w-[40px] aspect-square flex justify-center items-center rounded"><i className="bi bi-link-45deg flex"></i></a>
          <a href="" className="ring-1 ring-white hover:bg-white hover:text-black w-[40px] aspect-square flex justify-center items-center rounded ms-auto"><i className="bi bi-arrows-move flex"></i></a>
          <a href="" className="ring-1 ring-white hover:bg-danger w-[40px] aspect-square flex justify-center items-center rounded"><i className="bi bi-trash flex"></i></a>
        </section>
      )}

      <section className={`flex flex-col text-sm overflow-y-scroll pb-9`}>
        {inspectedObjectOptions && spawnInspectorOption(inspectedObjectOptions)}

        {inspectedObjectOptions && (
          <div className="collapse-wrapper">
            <p className={`py-1 border-t pt-5 border-black px-5 font-semibold collapse-content-heading cursor-pointer`} onClick={toggleInputGroup}>
              <i className="bi bi-plus-square"></i>
              Inventory
            </p>
            <div className="collapse-content hidden">
              <div className="py-1 border-t border-black px-5 flex">
                <a href={`/tracking-label?id=${inspectedObject.id}`} className="w-full text-xs font-semibold hover:text-blue-400 hover:underline" onClick={openPopup}>View tracking label</a>
              </div>
              <div className="py-1 border-t border-black px-5 flex">
                <p className="w-full text-xs font-semibold hover:text-blue-400 hover:underline cursor-pointer">View in 3D</p>
              </div>
              <div className="py-1 border-t border-black px-5 flex">
                <p className="w-full text-xs font-semibold hover:text-blue-400 hover:underline cursor-pointer">Tracking Logs</p>
              </div>
            </div>
          </div>
        )}

        {!inspectedObjectOptions && (
          <div className="text-black text-center font-bold uppercase leading-4 w-full flex justify-between px-9">
            
            {Object.keys(hardwareTypes).concat('Hardware Spot').map((hardwareTypeKey, index) => (
              <div key={hardwareTypeKey} className={`cursor-pointer rounded-full w-[90px] h-[90px] object bg-${hardwareTypeKey.toLowerCase().includes('spot') ? 'yellow-300' : 'green-500'}`}>
                <div className="flex flex-col h-full justify-center">
                  <p>{hardwareTypeKey}</p>
                </div>
              </div>
            ))}
            
          </div>
        )}
      </section>
    </section>
  )
}
