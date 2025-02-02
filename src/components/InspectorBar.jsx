//  React Hooks



//  React Compontents
import InspectorOption from "./InspectorOption"


import React, { useState, useEffect } from "react"
import { camelToCapitalized, toggleInputGroup } from '../utils/utils.js';



export default function InspectorBar({ inspectedObject, inspectedObjectOptions, setInspectedObjectOptionValue, objectTemplates, deleteInspectedObject }) {

  //    OBJECT OPTION FIELDS    \\
  const [searchValue, setSearchValue] = useState('');
  let filteredObjectTemplates = Object.keys(objectTemplates).filter((objectTemplateKey) => !searchValue ? objectTemplateKey=objectTemplateKey : objectTemplateKey.toLowerCase().includes(searchValue.toLowerCase()));



  //    OBJECT OPTION FIELDS    \\

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



  //    OPEN POPUP    \\

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



  //    OBJECT SPAWN DRAG START    \\
  function handleSpawnObjectDragStart(e, objectTemplateKey) {
    e.dataTransfer.setData('objectTemplateKey', objectTemplateKey)
  }



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
  }, [filteredObjectTemplates]);




  return (
    <section className="w-2/12 min-w-[320px] fixed end-0 h-full flex flex-col bg-primary z-20">

      {/*    INSPECTOR BAR HEADING    */}
      <section className="text-xl font-semibold uppercase p-6 ">
        <h1>{inspectedObject ? inspectedObject.objectSN != null ? `${inspectedObject.hardwareType} ${inspectedObject.objectSN}` : inspectedObject.objectName : 'Asset Inventory'}</h1>
        <h2 className="text-base">{inspectedObject ? 'Inspector' : 'Add Hardware'}</h2>
      </section>


      {/*    OBJECT ACTION BTNS    */}
      
      {inspectedObjectOptions && (
        <section className="flex justify-center items-center pb-7 px-7 gap-3">
          <a className="ring-1 ring-white hover:bg-white hover:text-black w-[40px] aspect-square flex justify-center items-center rounded cursor-pointer"><i className="bi bi-link-45deg flex"></i></a>
          <a className="ring-1 ring-white hover:bg-white hover:text-black w-[40px] aspect-square flex justify-center items-center rounded ms-auto cursor-pointer"><i className="bi bi-arrows-move flex"></i></a>
          <a className="ring-1 ring-white hover:bg-danger w-[40px] aspect-square flex justify-center items-center rounded cursor-pointer" onClick={deleteInspectedObject}><i className="bi bi-trash flex"></i></a>
        </section>
      )}



      {/*    INSPECTOR OPTIONS    */}

      <section className={`flex flex-col text-sm overflow-y-scroll pb-9`}>
        {inspectedObjectOptions && spawnInspectorOption(inspectedObjectOptions)}


        {/*    TRACKING DROPDOWN    */}
        {inspectedObjectOptions && (
          <div className="collapse-wrapper">
            <p className={`py-1 border-t pt-5 border-black px-5 font-semibold collapse-content-heading cursor-pointer`} onClick={toggleInputGroup}>
              <i className="bi bi-plus-square"></i>
              Tracking
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



        {/*    ASSET INVENTORY ON INSPECTOR BAR    */}

        {!inspectedObjectOptions && (
          <section className="flex flex-col gap-5 px-5">
            <div className="flex flex-col gap-2">
              <input className="bg-body/50 hover:bg-body/80 focus:bg-body/80 text-white ps-3 py-1 w-full outline-none rounded" type="text" placeholder="Search" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
              <p className="text-xs px-1">{searchValue ? `${filteredObjectTemplates.length} Results.` : '⠀'}</p>
            </div>

            <div className="text-black text-center font-bold uppercase leading-4 w-full flex justify-between px-7">
              
              {filteredObjectTemplates.map((objectTemplateKey, index) => (
                <div data-object-template-key={objectTemplateKey} key={objectTemplateKey} className={`draggableObject cursor-pointer rounded-full w-[90px] h-[90px] object bg-${objectTemplateKey.toLowerCase().includes('spot') ? 'yellow-300' : 'green-500'}`}>
                  <div className="flex flex-col h-full justify-center">
                    <p>{objectTemplateKey}</p>
                  </div>
                </div>
              ))}
              
            </div>
          </section>
        )}
      </section>
    </section>
  )
}
