//  React Hooks



//  React Compontents




import { camelToCapitalized, toggleInputGroup } from '../utils/utils.js';



export default function NavigationBar() {
  return (
    // <section className="w-3/12 min-w-[320px] fixed h-full flex flex-col bg-primary z-20">
    //   <section className="text-xl font-semibold uppercase p-6">
    //     <h1>Starbase Tracking</h1>
    //     <h2 className="text-base">Update Portal</h2>
    //   </section>

    //   <section className="flex flex-col text-sm">
    //     <SideBarItemGroup groupItems={[
    //       { "ItemName": "Production Site" }
    //     ]} />

    //     <SideBarItemGroup groupItems={[{
    //       "ItemName": "Launch Site",
    //       "SubItems": [
    //         { "ItemName": "Pad A" },
    //         { "ItemName": "Pad B" },
    //         { "ItemName": "Tank Farm" }
    //       ]
    //     }]} />

    //     <SideBarItemGroup groupItems={[{
    //       "ItemName": "SPMTs"
    //     }]} />
    //   </section>
    // </section>


    <section className="w-2/12 min-w-[320px] fixed h-full flex flex-col bg-primary z-20">
      <section className="text-xl font-semibold uppercase p-6 ">
        <h1>Starbase Tracking</h1>
        <h2 className="text-base">Update Portal</h2>
      </section>

      <section className="flex flex-col text-sm overflow-y-scroll">
        
        <div className="collapse-wrapper">
          <p className={`py-1 border-t border-black px-5 font-semibold collapse-content-heading bg-body/50 text-blue-300`} onClick={toggleInputGroup}>
            <a href="" className='hover:text-blue-400 hover:underline w-full'>Production Site</a>
          </p>
        </div>

        <div className="collapse-wrapper">
          <p className={`py-1 border-t border-black px-5 font-semibold collapse-content-heading cursor-pointer`} onClick={toggleInputGroup}>
            <i className="bi bi-plus-square"></i>
            <a href="" className='hover:text-blue-400 hover:underline pe-5'>Launch Site</a>
          </p>
          <div className="collapse-content hidden">

            <div className={`py-1 border-t border-black px-7 pe-5 flex inspector-option-field`}>
              <a href="" className='hover:text-blue-400 hover:underline font-semibold w-full'>Pad A</a>
            </div>
            <div className={`py-1 border-t border-black px-7 pe-5 flex inspector-option-field`}>
              <a href="" className='hover:text-blue-400 hover:underline font-semibold w-full'>Pad B</a>
            </div>
            <div className={`py-1 border-t border-black px-7 pe-5 flex inspector-option-field`}>
              <a href="" className='hover:text-blue-400 hover:underline font-semibold w-full'>Tank Farm</a>
            </div>

          </div>
        </div>

        <div className="collapse-wrapper">
          <p className={`py-1 border-t border-black px-5 font-semibold collapse-content-heading`}>
            <a href="" className='hover:text-blue-400 hover:underline w-full'>Massey's</a>
          </p>
        </div>

      </section>
    </section>
  )
}
