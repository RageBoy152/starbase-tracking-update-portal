//  React Hooks


//  React Compontents
import InspectorOption from "./InspectorOption"


import React, { useState, useEffect, useRef } from "react"
import { camelToCapitalized, copyText, toggleInputGroup, formatObjectNameText } from '../utils/utils.jsx';



export default function InspectorBar({ inspectedObject, setInspectedObjectOptionValue, objectTemplates, deleteObject }) {

  const inspectorBarCopyLinkRef = useRef();



  //    OBJECT OPTION FIELDS    \\
  const [searchValue, setSearchValue] = useState('');
  let filteredObjectTemplates = Object.keys(objectTemplates).filter((objectTemplateKey) => !searchValue ? objectTemplateKey=objectTemplateKey : objectTemplateKey.toLowerCase().includes(searchValue.toLowerCase()));



  //    OBJECT OPTION FIELDS    \\

  function spawnInspectorOption(object, path=[], depth=0) {
    // extract exposed props from object
    const { objectSN, hardwareOrigin, objectName, zIndex, options, ...rest } = object;

    
    // merge extracted props
    const mergedOptions = depth == 0 ? { objectSN, hardwareOrigin, objectName, zIndex, ...(options || {}) } : object;
    

    // loop through options object
    return Object.keys(mergedOptions).map((optionKey, index) => {

      // get option value and check if its an object
      let val = mergedOptions[optionKey];
      let isObj = val && typeof val === "object"; //  && !Array.isArray(val)

      const newPath = [...path, optionKey];

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
                {spawnInspectorOption(val, newPath, depth+1)}
              </div>
            </div>
          </React.Fragment>
        )
      }
      else {
        // end of chain, add option to DOM

        return (
          <InspectorOption optionDepth={depth} key={optionKey} inspectedObjectOption={{ optionPath: path, optionName: optionKey, optionValue: val ?? "" }} setInspectedObjectOptionValue={setInspectedObjectOptionValue} />
        )
      }
    });

  }



  //    OPEN POPUP    \\

  function openPopup(e) {
    e.preventDefault();

    // popup dimensions
    const popupWidth = e.currentTarget.dataset.popupwidth;
    const popupHeight = e.currentTarget.dataset.popupheight;

    // calc window pos
    const left = (window.innerWidth - popupWidth) / 2 + window.screenX;
    const top = (window.innerHeight - popupHeight) / 2 + window.screenY;

    // open popup
    window.open(e.currentTarget.href, "_blank", `width=${popupWidth},height=${popupHeight},top=${top},left=${left},noopener,noreferrer`);
  }



  // //    OBJECT SPAWN DRAG START    \\
  // function handleSpawnObjectDragStart(e, objectTemplateKey) {
  //   e.dataTransfer.setData('objectTemplateKey', objectTemplateKey)
  // }



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
        <h1>{inspectedObject ? formatObjectNameText(inspectedObject)[1] : 'Asset Inventory'}</h1>
        <h2 className="text-base">{inspectedObject ? 'Inspector' : 'Add Hardware'}</h2>
      </section>


      {/*    OBJECT ACTION BTNS    */}
      
      {inspectedObject && (
        <section className="flex justify-start items-center pb-7 px-7 gap-3">
          <a ref={inspectorBarCopyLinkRef} className="ring-1 ring-white hover:bg-white hover:text-black w-[40px] aspect-square flex justify-center items-center rounded cursor-pointer" onClick={() => copyText(`${location.origin}/to-object?id=${inspectedObject.id}`, inspectorBarCopyLinkRef.current)}><i className="bi bi-link-45deg flex"></i></a>
          <a className="ring-1 ring-white hover:bg-danger w-[40px] aspect-square flex justify-center items-center rounded cursor-pointer" onClick={() => { deleteObject(inspectedObject.id); }}><i className="bi bi-trash flex"></i></a>
          <a className="ring-1 ring-white hover:bg-white hover:text-black w-[40px] aspect-square flex justify-center items-center rounded cursor-pointer ms-auto"><i className="bi bi-arrow-right flex"></i></a>
        </section>
      )}



      {/*    INSPECTOR OPTIONS    */}

      <section className={`flex flex-col text-sm overflow-y-auto pb-9`}>
        {inspectedObject && spawnInspectorOption(inspectedObject)}



        {/*    TRACKING DROPDOWN    */}
        {inspectedObject && (
          <div className="collapse-wrapper">
            <p className={`py-1 border-t pt-5 border-black px-5 font-semibold collapse-content-heading cursor-pointer`} onClick={toggleInputGroup}>
              <i className="bi bi-plus-square"></i>
              Tracking
            </p>
            <div className="collapse-content hidden">
              <div className="py-1 border-t border-black px-5 flex">
                <a data-popupwidth="600" data-popupheight="450" href={`/tracking-label?id=${inspectedObject.id}`} className="w-full text-xs font-semibold hover:text-blue-400 hover:underline" onClick={openPopup}>View tracking label</a>
              </div>
              <div className="py-1 border-t border-black px-5 flex">
                <p className="w-full text-xs font-semibold hover:text-blue-400 hover:underline cursor-pointer">View in 3D</p>
              </div>
              <div className="py-1 border-t border-black px-5 flex">
                <a data-popupwidth="1100" data-popupheight="700" href={`/tracking-log?id=${inspectedObject.id}`} className="w-full text-xs font-semibold hover:text-blue-400 hover:underline" onClick={openPopup}>Tracking Logs</a>
              </div>
            </div>
          </div>
        )}



        {/*    ASSET INVENTORY ON INSPECTOR BAR    */}

        {!inspectedObject && (
          <section className="flex flex-col gap-5 px-5">
            <div className="flex flex-col gap-2">
              <input className="bg-body/50 hover:bg-body/80 focus:bg-body/80 text-white ps-3 py-1 w-full outline-none rounded" type="text" placeholder="Search" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
              <p className="text-xs px-1">{searchValue ? `${filteredObjectTemplates.length} Results.` : '⠀'}</p>
            </div>

            <div className="text-black text-center font-bold uppercase leading-4 w-full flex flex-wrap gap-5 justify-between px-7">
              
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
