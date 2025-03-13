//  React Hooks
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../Authenticator.jsx';


//  React Compontents
import NavigationBar from '../components/NavigationBar.jsx'

import ArmControls from "../components/Chopstick/ArmControls.jsx";
import ArmPresets from "../components/Chopstick/ArmPresets";
import ArmReadings from "../components/Chopstick/ArmReadings";
import QDControls from "../components/Chopstick/QDControls";
import QDStabReadings from "../components/Chopstick/QDStabReadings";
import StabControls from "../components/Chopstick/StabControls";
import TowerTopDown from "../components/Chopstick/TowerTopDown";


//  Data

import { socket, fetchChopstickData, updateChopstickData } from '../utils/socketIOHandler.js';




export default function Chopstick() {
  const { user, logout } = useAuth();


  const [chopsticksData, setChopsticksData] = useState(null);
  
  const location = useLocation();
  const chopstickId = new URLSearchParams(location.search).get('id');


  useEffect(() => {
    fetchChopstickData(chopstickId);

    const handleRes = (data) => {
      if (data.error_message) { console.error(data); return; }
      setChopsticksData(data[0]);
    }
    
    socket.on('chopstickFetchRes', handleRes);
    
    return () => { socket.off('chopstickFetchRes', handleRes) }
  }, []);
  
  

  function updateChopstickDataProp(propName, newValue, saveToDB) {
    let newChopstickData = chopsticksData;

    newChopstickData[propName] = newValue;

    updateChopstickData(newChopstickData, saveToDB);
  }



  return (
    <>
      <NavigationBar logout={logout} user={user} />
      
      <section className="bg-black ms-[320px] h-screen flex-wrap flex flex-col">
        <div className="w-4/12 h-screen border border-white flex flex-col">
          <h4 className="text-center uppercase py-4 font-semibold">OLIT-1</h4>
        </div>
        <div className="w-8/12 h-screen">

          <div className="h-1/2 flex">
            <TowerTopDown />

            <div className="w-7/12 flex flex-wrap">
              <div className="h-1/2 w-1/2">
                <ArmReadings />
              </div>

              <div className="h-1/2 w-1/2">
                <ArmPresets />
              </div>

              <ArmControls chopsticksData={chopsticksData} updateChopstickDataProp={updateChopstickDataProp} />
            </div>
          </div>

          <div className="h-1/2 flex">
            <div className="w-7/12 flex flex-wrap">
              <QDControls />

              <QDStabReadings />
            </div>

            <StabControls />
          </div>

        </div>
      </section>
    </>
  );
}
