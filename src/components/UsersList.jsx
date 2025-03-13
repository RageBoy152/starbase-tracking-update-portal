//  React Hooks


//  React Compontents



//  Data




export default function UsersList({ users }) {
  return (
    <div className="flex flex-col h-full">

      <div className="border-b border-white/50 bg-black flex gap-2">
        <p className="border-s border-white w-4/12 px-2 text-sm uppercase font-semibold">User ID</p>
        <p className="border-s border-white w-3/12 px-2 text-sm uppercase font-semibold">Username</p>
        <p className="border-s border-white w-1/12 px-2 text-sm uppercase font-semibold">DC?</p>
        <p className="border-s border-white w-4/12 px-2 text-sm uppercase font-semibold">Actions</p>
      </div>


      <div className="flex flex-col h-full overflow-y-auto">

        {users && users.map((user, index) => (

          <div className={`border-b border-white/50 ${user.userStatus == 0 ? `bg-black/${index%2 == 0 ? '25' : '75'}` : `bg-danger/${user.userStatus == 1 ? '25' : '50'}`} flex gap-2`}>
            <p className="border-s border-white w-4/12 px-2 text-xs flex items-center">{user.userId}</p>
            <p className="border-s border-white w-3/12 px-2 text-xs flex items-center">{user.username}</p>
            <p className="border-s border-white w-1/12 px-2 text-xs flex items-center">{user.userDiscordSynced ? 'YES' : 'NO'}</p>
            <div className="border-s border-white w-4/12 px-2 text-xs flex gap-5">
              <button className={`text-blue-400 hover:underline w-1/2 text-start ${user.userStatus == 2 ? 'opacity-0 pointer-events-none select-none' : ''}`}>{user.userStatus == 0 ? 'Soft ban' : 'Lift soft ban'}</button>
              <button className="text-blue-400 hover:underline w-1/2 text-start">{user.userStatus != 2 ? 'Ban' : 'Lift ban'}</button>
            </div>
          </div>
          
        ))}

      </div>



    </div>
  );
}
