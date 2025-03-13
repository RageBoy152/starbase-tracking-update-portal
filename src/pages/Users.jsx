//  React Hooks
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../Authenticator.jsx';


//  React Compontents
import NavigationBar from '../components/NavigationBar.jsx'
import UsersList from '../components/UsersList.jsx';


//  Data




export default function Users() {
  const { user, logout } = useAuth();

  const [users, setUsers] = useState([
    {
      userId: "08422688-7b03-472c-80ce-efe8406aa804",
      username: "Rage",
      userDiscordSynced: true,
      userStatus: 0,
    },
    {
      userId: "e103fa24-5b2c-4d55-b875-70335e0065ef",
      username: "Kevin Michael Reed",
      userDiscordSynced: true,
      userStatus: 1,
    },
    {
      userId: "277108b3-7b72-4dd0-afd7-c5477c0fb7e3",
      username: "Ring",
      userDiscordSynced: false,
      userStatus: 0,
    },
    {
      userId: "8100dace-2883-45ba-9241-4cec301d3bc7",
      username: "FrogShapedPlane",
      userDiscordSynced: false,
      userStatus: 2,
    }
  ]);


  return (
    <>
      <NavigationBar logout={logout} user={user} />
      <section className='ms-[320px] h-screen flex flex-wrap'>
        <div className="h-1/2 w-1/2 border border-white">
          <div className="h-1/5 flex justify-between w-3/4 mx-auto items-center">
            <h4 className="text-center uppercase py-4 font-semibold">Online ({users.length})</h4>

            <input className="bg-black/50 hover:bg-black/80 focus:bg-black/80 text-white ps-2 py-1 w-1/2 text-sm outline-none rounded h-min" type="text" placeholder="Search online users..." />
          </div>

          <div className="h-4/5">
            <UsersList users={users} />
          </div>
        </div>
        <div className="h-1/2 w-1/2 border border-white">
          <div className="h-1/5 flex justify-between w-3/4 mx-auto items-center">
            <h4 className="text-center uppercase py-4 font-semibold">All time ({users.length})</h4>

            <input className="bg-black/50 hover:bg-black/80 focus:bg-black/80 text-white ps-2 py-1 w-1/2 text-sm outline-none rounded h-min" type="text" placeholder="Search all-time users..." />
          </div>

          <div className="h-4/5">
            <UsersList users={users} />
          </div>
        </div>
      </section>
    </>
  );
}
