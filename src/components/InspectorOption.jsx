//  React Hooks

import { useState } from "react"



//  React Compontents



export default function InspectorBar({ inspectedObjectOption, setInspectedObjectOptionValue }) {
  const [newOptionValue, setNewOptionValue] = useState(inspectedObjectOption.optionValue);


  function handleInspectedObjectOptionValueChange(optionName, newValue, enterKeyPressed) {
    setNewOptionValue(newValue);
  }


  function handleInspectedObjectOptionValueInputKeyDown(e) { if (e.key == "Enter") { setInspectedObjectOptionValue(inspectedObjectOption.optionName, newOptionValue); } }
  function handleInspectedObjectOptionValueInputBlur() { setInspectedObjectOptionValue(inspectedObjectOption.optionName, newOptionValue); }


  return (
    <div className={`bg-body/50 py-3 hover:bg-body px-5`}>
      <p className={`min-w-1/2`}>{inspectedObjectOption.optionName}</p>
      <div className="ms-auto flex">
        <input className="text-black" type="text" value={newOptionValue} onBlur={handleInspectedObjectOptionValueInputBlur} onKeyDown={handleInspectedObjectOptionValueInputKeyDown} onChange={(e) => handleInspectedObjectOptionValueChange(inspectedObjectOption.optionName, e.target.value)} />
      </div>
    </div>
  )
}
