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
    <div className="flex items-center justify-between gap-4 bg-white px-5 py-4">
      <div className="flex items-center gap-2.5">
        <label className="flex cursor-pointer items-center">
          <input
            type="checkbox"
            className="sr-only"
            checked={excludeClosed}
            onChange={handleCheckboxChange}
          />
          <span
            className={`relative h-4 w-4 border ${
              excludeClosed ? 'border-[#BEBEBE]' : 'border-[#BEBEBE]'
            } mr-2.5 inline-block rounded`}
          >
            {excludeClosed && (
              <span className="absolute inset-0 flex items-center justify-center text-xs">
                ✓
              </span>
            )}
          </span>
          <span className="text-[13px] leading-[1.23] font-medium tracking-[-2.5%] text-[#111111]">
            마감 제외하고 보기
          </span>
        </label>
      </div>
    </div>
  );
};
