//  React Hooks



//  React Compontents




export default function QDControls() {
  return (
    <div className="w-full h-1/2 border border-white">
      <h4 className="text-center uppercase py-4 font-semibold">QD Controls</h4>

      <div className="flex">
        <div className="w-1/2 flex justify-center gap-5 px-5">

          {/*  UMBILICAL CONTROLS  */}

          <div className="flex flex-col items-center gap-2">
            <p className="uppercase text-[10px]">Umbilical</p>
            <input className="bg-body/75 w-1 slab thumb-success" orientation="vertical" type="range" min="0" max="1" step="0.1" />
          </div>

          <div className="flex flex-col w-1/2 items-center gap-2">
            <button className="border border-white hover:border-transparent hover:bg-white/80 text-white hover:text-black font-bold uppercase py-2 w-full text-[10px]">Umbilical Door</button>
            <button className="mt-auto border border-danger hover:border-transparent hover:bg-danger/80 text-danger hover:text-white font-bold uppercase py-2 w-full text-[10px]">Stop</button>
          </div>

          <div className="flex flex-col items-center gap-2">
            <p className="uppercase text-[10px]">Speed</p>
            <input className="bg-body/75 w-1 slab thumb-success" orientation="vertical" type="range" min="0" max="1" step="0.1" />
          </div>

        </div>

        <div className="w-1/2 flex justify-center gap-5 px-5 border-s border-white">

          {/*  ARM CONTROLS  */}
          
          <div className="flex flex-col items-center gap-2">
            <p className="uppercase text-[10px]">Arm</p>
            <input className="bg-body/75 w-1 slab thumb-success" orientation="vertical" type="range" min="0" max="1" step="0.1" />
          </div>

          <div className="flex flex-col w-1/2 items-center gap-2">
            <button className="border border-white hover:border-transparent hover:bg-white/80 text-white hover:text-black font-bold uppercase py-2 w-full text-[10px]">Work platform</button>
            <button className="border border-white hover:border-transparent hover:bg-white/80 text-white hover:text-black font-bold uppercase py-2 w-full text-[10px]">Full retract</button>
            <button className="mt-auto border border-danger hover:border-transparent hover:bg-danger/80 text-danger hover:text-white font-bold uppercase py-2 w-full text-[10px]">Stop</button>
          </div>

          <div className="flex flex-col items-center gap-2">
            <p className="uppercase text-[10px]">Arm Speed</p>
            <input className="bg-body/75 w-1 slab thumb-success" orientation="vertical" type="range" min="0" max="1" step="0.1" />
          </div>

        </div>
      </div>
    </div>
  );
}
