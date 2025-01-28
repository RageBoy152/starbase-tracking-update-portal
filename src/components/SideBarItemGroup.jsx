//  React Hooks



//  React Compontents
import SideBarItem from './SideBarItem'



export default function SideBarItemGroup({ groupItems }) {

  return (
    <section className="flex flex-col text-sm">
      <SideBarItem itemName={groupItems[0].ItemName} itemType={groupItems[0].ItemName.ItemType} itemTabIndex={0} />

      {groupItems[0].SubItems && groupItems[0].SubItems.map((subGroupItem, index) => (
        <div className="flex flex-col text-sm" key={index}>
          <SideBarItem itemName={subGroupItem.ItemName} itemType={subGroupItem.ItemType} itemTabIndex={1} />

          {subGroupItem.SubItems && subGroupItem.SubItems.map((subSubGroupItem, index2) => (
            <SideBarItem key={`${index}-${index2}`} itemName={subSubGroupItem.ItemName} itemType={subSubGroupItem.ItemType} itemTabIndex={2} />
          ))}
        </div>
        ))}
    </section>
  );
}
