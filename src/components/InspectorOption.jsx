//  React Hooks

import { useState } from "react"



//  React Compontents



import { camelToCapitalized } from '../utils/utils.js';



export default function InspectorBar({ inspectedObjectOption, setInspectedObjectOptionValue, optionDepth }) {
  let rawDefaultVal = inspectedObjectOption.optionValue.split('_')[1];

  const [newOptionValue, setNewOptionValue] = useState(rawDefaultVal === "true" ? true : rawDefaultVal === "false" ? false : rawDefaultVal);


  function handleInspectedObjectOptionValueChange(e) {
    setNewOptionValue(e.target.type === "checkbox" ? e.target.checked : e.target.value);
  }


  function handleInspectedObjectOptionValueInputKeyDown(e, ctrlRequired) { if (e.key == "Enter" && (ctrlRequired && e.ctrlKey)) { setInspectedObjectOptionValue(inspectedObjectOption.optionName, newOptionValue); } }
  function handleInspectedObjectOptionFieldSubmit(e) { setInspectedObjectOptionValue(inspectedObjectOption.optionName, e.target.type === "checkbox" ? e.target.checked : e.target.value); }

  

  // select input to add to DOM
  let inputHTML;
  let optionFieldParams = inspectedObjectOption.optionValue.split('_');     // 0=type, 1=value, 2=min, 3=max, 4=step

  if (inspectedObjectOption.optionValue.startsWith('number_')) {
    inputHTML = (<input className="bg-body/50 text-white ps-2 w-full rounded-sm" type="number" min={optionFieldParams[2] || 0} max={optionFieldParams[3] || Infinity} step={optionFieldParams[4] || 1} value={newOptionValue} onChange={(e) => { handleInspectedObjectOptionValueChange(e); handleInspectedObjectOptionFieldSubmit(e); }} />)
  }
  else if (inspectedObjectOption.optionValue.startsWith('slider_')) {
    inputHTML = (
      <>
        <input className="bg-body/25 w-full" type="range" min={optionFieldParams[2] || 0} max={optionFieldParams[3] || Infinity} step={optionFieldParams[4] || 1} value={newOptionValue} onMouseUp={handleInspectedObjectOptionFieldSubmit} onTouchEnd={handleInspectedObjectOptionFieldSubmit} onChange={handleInspectedObjectOptionValueChange} />
        <input className="bg-body/50 text-white ps-2 w-1/2 rounded-sm" type="number" min={optionFieldParams[2] || 0} max={optionFieldParams[3] || Infinity} step={optionFieldParams[4] || 1} value={newOptionValue} onChange={(e) => { handleInspectedObjectOptionValueChange(e); handleInspectedObjectOptionFieldSubmit(e); }} />
      </>
    )
  }
  else if (inspectedObjectOption.optionValue.startsWith('bool_')) {
    inputHTML = (<input className="bg-body/50 text-white ps-2 rounded-sm" type="checkbox" checked={newOptionValue} onChange={(e) => { handleInspectedObjectOptionValueChange(e); handleInspectedObjectOptionFieldSubmit(e); }} />)
  }
  else if (inspectedObjectOption.optionValue.startsWith('text_')) {
    inputHTML = (<input className="bg-body/50 text-white ps-2 w-full rounded-sm" type="text" value={newOptionValue} onBlur={handleInspectedObjectOptionFieldSubmit} onKeyDown={handleInspectedObjectOptionValueInputKeyDown} onChange={handleInspectedObjectOptionValueChange} />)
  }
  else if (inspectedObjectOption.optionValue.startsWith('longtext_')) {
    inputHTML = (<textarea className="bg-body/50 text-white ps-2 w-full rounded-sm resize-none" rows="4" value={newOptionValue} onBlur={handleInspectedObjectOptionFieldSubmit} onChange={handleInspectedObjectOptionValueChange}></textarea>)
  }
  


  return (
    <div className={`py-1 border-t border-black px-${((optionDepth*1)+5)} pe-5 flex inspector-option-field`}>
      <p className={`w-1/2 text-xs font-semibold`}>{camelToCapitalized(inspectedObjectOption.optionName)}</p>
      <div className="ms-auto flex items-center w-1/2">{inputHTML}</div>
    </div>
  )
}
