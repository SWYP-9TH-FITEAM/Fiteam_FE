import * as React from 'react';

interface FilterSectionProps {
  excludeClosed?: boolean;
  onExcludeClosedChange?: (exclude: boolean) => void;
  sortOption?: string;
  onSortOptionChange?: (option: string) => void;
}

export const FilterSection = ({
  excludeClosed = false,
  onExcludeClosedChange,
}: FilterSectionProps) => {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onExcludeClosedChange?.(e.target.checked);
  };

  return (
    <div className="flex justify-between items-center gap-4 px-5 py-4 bg-white">
      <div className="flex items-center gap-2.5">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only"
            checked={excludeClosed}
            onChange={handleCheckboxChange}
          />
          <span
            className={`relative w-4 h-4 border ${
              excludeClosed ? 'border-[#BEBEBE]' : 'border-[#BEBEBE]'
            } rounded inline-block mr-2.5`}
          >
            {excludeClosed && (
              <span className="absolute inset-0 flex items-center justify-center text-xs">
                ✓
              </span>
            )}
          </span>
          <span className="text-[13px] font-medium leading-[1.23] text-[#111111] tracking-[-2.5%]">
            마감 제외하고 보기
          </span>
        </label>
      </div>
    </div>
  );
};
