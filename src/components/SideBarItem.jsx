//  React Hooks



//  React Compontents




export default function SideBarItem({ itemName, itemTabIndex, itemType }) {
  itemType = !itemType ? 'drop' : itemType;
  
  
  return (
    <div className={`bg-body/50 py-3 hover:bg-body ${itemTabIndex == 0 ? 'px-5' : itemTabIndex == 1 ? 'px-8' : 'px-11'} ${itemType != "drop" && 'flex'}`}>
      <p className={`${itemType != "drop" && 'w-1/2'} min-w-1/2`}>{itemName}</p>
      <div className="ms-auto flex">
        {itemType == "toggle" && (<input type="checkbox"></input>)}
        {itemType.startsWith("slider") && (<input type="range"></input>)}
      </div>
    </div>
  )
}
