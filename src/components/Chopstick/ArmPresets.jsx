//  React Hooks



//  React Compontents




export default function ArmPresets() {
  return (
    <div className="h-full border border-white overflow-y-auto">
      <h4 className="text-center uppercase py-4 font-semibold">Presets</h4>

      <div className="flex flex-col items-center gap-3 pb-5 text-sm">
        <button className="border border-white hover:border-transparent hover:bg-white/80 text-white hover:text-black font-bold uppercase py-2 w-3/4">Launch Pos</button>
        <button className="border border-white hover:border-transparent hover:bg-white/80 text-white hover:text-black font-bold uppercase py-2 w-3/4">OLM Pos</button>
        <button className="border border-white hover:border-transparent hover:bg-white/80 text-white hover:text-black font-bold uppercase py-2 w-3/4">Lift Pos</button>
      </div>
    </div>
  );
}
