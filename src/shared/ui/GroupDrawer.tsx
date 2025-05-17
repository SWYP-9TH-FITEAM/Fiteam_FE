import {Button} from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {Drawer, DrawerContent, DrawerTrigger} from '@/components/ui/drawer';
import {userQueries} from '@/entities/user/api';
import {useCurrentGroupId, useSetCurrentGroupId} from '@/shared/model/group-id';
import {useQuery} from '@tanstack/react-query';
import {ChevronDown} from 'lucide-react';
import * as React from 'react';

export const GroupDrawer: React.FC = () => {
  const currentGroupId = useCurrentGroupId();
  const {data: groups} = useQuery(userQueries.groupsAccepted());

  const [open, setOpen] = React.useState(false);

  const setCurrentGroupId = useSetCurrentGroupId();

  if (!groups) return null;

  const groupName = groups.find(
    group => group.groupId === currentGroupId,
  )?.groupName;

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 hover:bg-white max-w-[150px] truncate"
        >
          {groupName ? <>{groupName}</> : <>그룹 선택</>}
          <ChevronDown className="w-5 h-5 stroke-[1.5]" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-w-[500px] mx-auto min-h-[60dvh]">
        <div className="mt-4 border-t border-border">
          <Command>
            <CommandInput placeholder="그룹 검색" />
            <CommandList>
              <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
              <CommandGroup>
                {groups.map(group => (
                  <CommandItem
                    key={group.groupId}
                    value={group.groupName}
                    onSelect={() => {
                      setCurrentGroupId(group.groupId);
                      setOpen(false);
                    }}
                  >
                    {group.groupName}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
