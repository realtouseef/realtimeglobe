import React from 'react';

interface GlobeControlsProps {
  onAddPoint: () => void;
  onAddArc: () => void;
  onClear: () => void;
  avatarStyle: string;
  avatarOptions: { value: string; label: string }[];
  onAvatarStyleChange: (style: string) => void;
}

export const GlobeControls: React.FC<GlobeControlsProps> = ({
  onAddPoint,
  onClear,
  avatarStyle,
  avatarOptions,
  onAvatarStyleChange
}) => {
  const buttonClass = "px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 text-gray-200 cursor-pointer transition-all duration-200 text-[13px] font-medium text-left outline-none hover:bg-white/10";
  const selectClass = "px-2.5 py-2 rounded-lg border border-white/10 bg-white/5 text-gray-200 cursor-pointer text-xs outline-none hover:bg-white/10";

  return (
    <div className="absolute top-5 right-5 bg-[#14141e]/60 backdrop-blur-md p-5 rounded-xl flex flex-col gap-3 z-10 text-white border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.5)] font-sans">
      <h3 className="m-0 mb-1 text-sm uppercase tracking-widest text-white font-bold">Controls</h3>
      
      <button onClick={onAddPoint} className={buttonClass}>
        Add Test Visitor
      </button>

      <div className="flex flex-col gap-1.5">
        <div className="text-[11px] text-[#aaa] uppercase tracking-wider">
          Avatar Style
        </div>
        <select
          value={avatarStyle}
          onChange={(e) => onAvatarStyleChange(e.target.value)}
          className={selectClass}
        >
          {avatarOptions.map((option) => (
            <option key={option.value} value={option.value} className="text-black">
              {option.label}
            </option>
          ))}
        </select>
      </div>
      
      <div className="h-px bg-white/10 my-1" />
      
      <button onClick={onClear} className={`${buttonClass} text-[#ff6b6b] border-[#ff6b6b]/30 hover:bg-[#ff6b6b]/10`}>
        Clear Data
      </button>
    </div>
  );
};
// Ideally we would use CSS modules or styled-components, but inline is fine for this demo.
// We can assume the user will interact with it and see the native button behavior, 
// or we could add simple onMouseEnter/Leave handlers if we really wanted to perfect it.
