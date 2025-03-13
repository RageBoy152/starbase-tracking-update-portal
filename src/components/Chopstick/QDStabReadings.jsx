//  React Hooks



//  React Compontents




export default function QDStabReadings() {
  return (
    <div className="w-full h-1/2 border border-white overflow-y-auto">
      <h4 className="text-center uppercase py-4 font-semibold">QD & Stab Readings</h4>

      <div className="flex flex-col gap-3">
        <div className="flex flex-col items-center uppercase w-3/4 mx-auto">
          <div className="flex justify-between w-full">
            <p className="text-sm">Position:</p>
            <p className="text-sm font-bold">0.00, 0.00, 0.00</p>
          </div>
          <div className="flex justify-between w-full">
            <p className="text-sm">Rotation:</p>
            <p className="text-sm font-bold">0.00, 0.00, 0.00</p>
          </div>
          <div className="flex justify-between w-full">
            <p className="text-sm">Force:</p>
            <p className="text-sm font-bold">0.00, 0.00, 0.00</p>
          </div>
        </div>

        <div className="flex flex-col items-center uppercase w-3/4 mx-auto">
          <div className="flex justify-between w-full">
            <p className="text-sm">Position:</p>
            <p className="text-sm font-bold">0.00, 0.00, 0.00</p>
          </div>
          <div className="flex justify-between w-full">
            <p className="text-sm">Rotation:</p>
            <p className="text-sm font-bold">0.00, 0.00, 0.00</p>
          </div>
          <div className="flex justify-between w-full">
            <p className="text-sm">Force:</p>
            <p className="text-sm font-bold">0.00, 0.00, 0.00</p>
          </div>
        </div>
      </div>
    </div>
  );
}
