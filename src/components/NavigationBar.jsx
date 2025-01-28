//  React Hooks



//  React Compontents
import SideBarItemGroup from "./SideBarItemGroup"



export default function NavigationBar() {
  return (
    <section className="w-3/12 min-w-[320px] fixed h-full flex flex-col bg-primary z-20">
      <section className="text-xl font-semibold uppercase p-6">
        <h1>Starbase Tracking</h1>
        <h2 className="text-base">Update Portal</h2>
      </section>

      <section className="flex flex-col text-sm">
        <SideBarItemGroup groupItems={[
          { "ItemName": "Production Site" }
        ]} />

        <SideBarItemGroup groupItems={[{
          "ItemName": "Launch Site",
          "SubItems": [
            { "ItemName": "Pad A" },
            { "ItemName": "Pad B" },
            { "ItemName": "Tank Farm" }
          ]
        }]} />

        <SideBarItemGroup groupItems={[{
          "ItemName": "SPMTs"
        }]} />
      </section>
    </section>
  )
}
