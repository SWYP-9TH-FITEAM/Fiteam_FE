import type {GetManagerGroupsAllResponseDto} from '@/entities/manager/api';

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

interface GroupDropdownProps {
  selected: GetManagerGroupsAllResponseDto[number] | null;
  onSelect: (groupId: GetManagerGroupsAllResponseDto[number]) => void;
  groups: GetManagerGroupsAllResponseDto;
}

export const GroupDropdown: React.FC<GroupDropdownProps> = ({
  selected,
  onSelect,
  groups,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex w-fit min-w-[182px] items-center justify-between border-gray-300 px-3 py-[9px] text-base font-medium text-gray-700 hover:bg-gray-50"
        >
          {selected?.groupName ?? '그룹 선택'}
          <ChevronDown className="ml-2 h-5 w-5 text-gray-500" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="border-border w-[182px]">
        {groups && groups.length > 0 ? (
          groups.map(group => (
            <DropdownMenuItem
              key={group.groupId}
              onClick={() => onSelect(group)}
              className={cn(
                'text-base',
                selected?.groupId === group.groupId &&
                  'bg-gray-100 font-semibold',
              )}
            >
              {group.groupName}
            </DropdownMenuItem>
          ))
        ) : (
          <DropdownMenuItem disabled className="text-base text-gray-500">
            그룹이 없습니다.
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
