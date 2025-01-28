//  React Hooks



//  React Compontents
import InspectorOption from "./InspectorOption"



export default function InspectorBar({ inspectedObject, inspectedObjectOptions, setInspectedObjectOptionValue }) {
  console.log(inspectedObject);
  console.log(inspectedObjectOptions);


  function handleInspectedObjectOptionValueChange(optionName, newValue) {
    console.log(`${optionName}: ${newValue}`)
  }


  return (
    <section className="w-2/12 min-w-[320px] fixed end-0 h-full flex flex-col bg-primary z-20">
      <section className="text-xl font-semibold uppercase p-6">
        <h1>{inspectedObject ? inspectedObject.objectName : 'Inspector'}</h1>
        {inspectedObject && <h2 className="text-base">Inspector</h2>}
      </section>

      <section className="flex flex-col text-sm overflow-y-scroll">
        {inspectedObjectOptions && inspectedObjectOptions.map((inspectedObjectOption, index) => (
          <InspectorOption key={index} inspectedObjectOption={inspectedObjectOption} setInspectedObjectOptionValue={setInspectedObjectOptionValue} />
        ))}
      </section>
    </section>
  )
}
