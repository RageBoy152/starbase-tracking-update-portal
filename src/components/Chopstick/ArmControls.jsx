//  React Hooks

import { useEffect, useState } from "react";



//  React Compontents




export default function ArmControls({ chopsticksData, updateChopstickDataProp }) {
  const [carriageHeightSetting, setCarriageHeightSetting] = useState(30);
  const [leftArmSetting, setLeftArmSetting] = useState(0);
  const [rightArmSetting, setRightArmSetting] = useState(0);

  const [armSpeedSetting, setArmSpeedSetting] = useState(0);
  const [carriageSpeedSetting, setCarriageSpeedSetting] = useState(0);


  useEffect(() => {
    if (chopsticksData == null) { return; }

    setCarriageHeightSetting(chopsticksData.carriageHeight);
  }, [chopsticksData])



  function handleSubmitOption(e) {
    updateChopstickDataProp(e.target.dataset.optionname, e.target.value, true);
  }

  function handleChangeOption(e) {
    let propName = e.target.dataset.optionname;
    let propVal = e.target.value;

    if (propName == "carriageHeight") { setCarriageHeightSetting(e.target.value); }
    else if (propName == "leftArm") { setLeftArmSetting(propVal); }
    else if (propName == "rightArm") { setRightArmSetting(propVal); }
    else if (propName == "armSpeed") { setArmSpeedSetting(propVal); }
    else if (propName == "carriageSpeed") { setCarriageSpeedSetting(propVal); }

    updateChopstickDataProp(propName, propVal, false);
  }




  return (
    <div className="h-1/2 w-full border border-white">
      <h4 className="text-center uppercase py-4 font-semibold">Mechazilla Controls</h4>

      <div className="flex">
        <div className="w-5/12 flex justify-center gap-5 px-5">

          {/*  VERTICAL CONTROLS  */}

          <div className="flex flex-col items-center gap-2">
            <p className="uppercase text-[10px]">Set Height</p>
            <input className="bg-body/75 w-1 slab thumb-success" orientation="vertical" type="range" min="30" max="80" step="0.1" data-optionname="carriageHeight" value={carriageHeightSetting} onChange={handleChangeOption} onMouseUp={handleSubmitOption} />
          </div>

          <div className="flex flex-col w-[80px] items-center gap-2">
            <button className="mt-auto border border-danger hover:border-transparent hover:bg-danger/80 text-danger hover:text-white font-bold uppercase py-2 w-full text-[10px]">Stop</button>
          </div>

          <div className="flex flex-col items-center gap-2">
            <p className="uppercase text-[10px]">Speed</p>
            <input className="bg-body/75 w-1 slab thumb-success" orientation="vertical" type="range" min="0" max="2" step="0.1" data-optionname="carriageSpeed" value={carriageSpeedSetting} onChange={handleChangeOption} onMouseUp={handleSubmitOption} />
          </div>

        </div>

        <div className="w-7/12 flex justify-center gap-5 px-5 border-s border-white">

          {/*  ARM CONTROLS  */}
          
          <div className="flex flex-col items-center gap-2">
            <p className="uppercase text-[10px]">Left</p>
            <input className="bg-body/75 w-1 slab thumb-success" orientation="vertical" type="range" min="-1" max="1" step="0.01" data-optionname="leftArm" value={leftArmSetting} onChange={handleChangeOption} onMouseUp={handleSubmitOption} />
          </div>

          <div className="flex flex-col items-center gap-2">
            <p className="uppercase text-[10px]">Open/Close</p>
            <input className="bg-body/75 w-1 slab thumb-success" orientation="vertical" type="range" min="0" max="1" step="0.01" />
          </div>

          <div className="flex flex-col items-center gap-2">
            <p className="uppercase text-[10px]">Right</p>
            <input className="bg-body/75 w-1 slab thumb-success" orientation="vertical" type="range" min="-1" max="1" step="0.01" data-optionname="rightArm" value={rightArmSetting} onChange={handleChangeOption} onMouseUp={handleSubmitOption} />
          </div>

          <div className="flex flex-col w-[80px] items-center gap-2">
            <button className="border border-white hover:border-transparent hover:bg-white/80 text-white hover:text-black font-bold uppercase py-2 w-full text-[10px]">Pair Sticks</button>
            <button className="mt-auto border border-danger hover:border-transparent hover:bg-danger/80 text-danger hover:text-white font-bold uppercase py-2 w-full text-[10px]">Stop</button>
          </div>

          <div className="flex flex-col items-center gap-2">
            <p className="uppercase text-[10px]">Speed</p>
            <input className="bg-body/75 w-1 slab thumb-success" orientation="vertical" type="range" min="0" max="2" step="0.1" data-optionname="armSpeed" value={armSpeedSetting} onChange={handleChangeOption} onMouseUp={handleSubmitOption} />
          </div>

        </div>
      </div>
    </div>
  );
}
