import * as React from 'react';
import {ChevronDown} from 'lucide-react';

import {Button} from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {cn} from '@/lib/utils';

interface GroupStatusFilterProps {
  currentFilter: string;
  onFilterChange: (filter: string) => void;
  statusSet: Set<string>;
}

const GroupStatusFilter: React.FC<GroupStatusFilterProps> = ({
  currentFilter,
  onFilterChange,
  statusSet,
}) => {
  const statusArray = Array.from(statusSet);

  const selectedLabel =
    statusArray.find(option => option === currentFilter) || '전체';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex min-w-[182px] items-center justify-between border-gray-300 px-3 py-[9px] text-base font-medium text-gray-700 hover:bg-gray-50"
        >
          {selectedLabel}
          <ChevronDown className="ml-2 h-5 w-5 text-gray-500" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="border-border w-[182px]">
        {statusArray.map(option => (
          <DropdownMenuItem
            key={option}
            onClick={() => onFilterChange(option)}
            className={cn(
              'text-base',
              currentFilter === option && 'bg-gray-100 font-semibold',
            )}
          >
            {option}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default GroupStatusFilter;
