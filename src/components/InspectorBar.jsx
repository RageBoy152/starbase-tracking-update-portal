//  React Hooks



//  React Compontents
import InspectorOption from "./InspectorOption"



import React from "react"
import { camelToCapitalized, toggleInputGroup } from '../utils/utils.js';



export default function InspectorBar({ inspectedObject, inspectedObjectOptions, setInspectedObjectOptionValue }) {
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



  return (
    <section className="w-2/12 min-w-[320px] fixed end-0 h-full flex flex-col bg-primary z-20">
      <section className="text-xl font-semibold uppercase p-6 ">
        <h1>{inspectedObject ? inspectedObject.objectName : 'Inspector'}</h1>
        {inspectedObject && <h2 className="text-base">Inspector</h2>}
      </section>

      <section className="flex flex-col text-sm overflow-y-scroll">
        {inspectedObjectOptions && spawnInspectorOption(inspectedObjectOptions)}
      </section>
    </section>
  )
}
