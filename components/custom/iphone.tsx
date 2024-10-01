import { BatteryMedium, BellOff } from 'lucide-react';

// iPhoneWindow.tsx

export default function Iphone() {
  return (
    <div className="">
      <div className="h-[480px] w-60 overflow-hidden rounded-3xl border-[6px] border-zinc-800 bg-background">
        <div className="flex h-8 w-full items-center justify-around bg-background">
          <div className="flex h-full w-1/3 items-center justify-center space-x-2 text-xs">
            <span>2:34</span>
            <BellOff size={14} />
          </div>
          <div className="h-4 w-1/3 rounded-full bg-zinc-800"></div>
          <div className="flex h-full w-1/3 items-center justify-center space-x-2 text-xs">
            <span>LTE</span>
            <BatteryMedium size={16} />
          </div>
        </div>
        <div className="h-full p-4 pt-16"></div>
      </div>
    </div>
  );
}
