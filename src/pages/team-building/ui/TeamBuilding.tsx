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
import {ChevronDown, ChevronRight} from 'lucide-react';
import * as React from 'react';
import {RoleSelector} from './RoleSelector';
import {FilterSection} from './FilterSection';
import {UserList, User} from './UserList';
import robot from '@/assets/images/robot.png';

interface TeamBuildingProps {
  groups: {
    groupId: number;
    groupName: string;
  }[];
}

export const TeamBuilding = ({groups}: TeamBuildingProps) => {
  const [open, setOpen] = React.useState(false);
  const [selectedGroup, setSelectedGroup] = React.useState<{
    groupId: number;
    groupName: string;
  } | null>(null);
  const [selectedRole, setSelectedRole] = React.useState('pm');
  const [excludeClosed, setExcludeClosed] = React.useState(false);
  const [sortOption, setSortOption] = React.useState('인기순');
  const [likedUserIds, setLikedUserIds] = React.useState<number[]>([]);

  const handleUserClick = (userId: number) => {
    console.log('User clicked:', userId);
    // Navigate to user detail or perform action
  };

  const handleLikeToggle = (userId: number) => {
    setLikedUserIds(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId],
    );
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center py-2.5 px-5">
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-2 hover:bg-white max-w-[150px] truncate"
            >
              {selectedGroup ? <>{selectedGroup.groupName}</> : <>그룹 선택</>}
              <ChevronDown className="w-5 h-5 stroke-[1.5]" />
            </Button>
          </DrawerTrigger>
          <DrawerContent className="max-w-[500px] mx-auto">
            <div className="mt-4 border-t">
              <Command>
                <CommandInput placeholder="그룹 검색" />
                <CommandList>
                  <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
                  <CommandGroup>
                    {groups.map(group => (
                      <CommandItem
                        key={group.groupId}
                        value={group.groupName}
                        onSelect={groupName => {
                          setSelectedGroup(
                            groups.find(
                              group => group.groupName === groupName,
                            ) || null,
                          );
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

        <Button variant="ghost" className="hover:bg-white">
          진행상황 보기
        </Button>
      </div>

      <div className="rounded-lg mx-3 shadow-[0px_0px_2px_0px_rgba(0,0,0,0.25)] p-3 flex items-center justify-between bg-white">
        <div className="flex gap-2">
          <div className="px-1 py-2 bg-[#D9D9D9] rounded-lg w-24 h-24">
            <img src={robot} alt="robot" className="w-full h-full" />
          </div>
          <div>아무개</div>
        </div>

        <div className="flex flex-col justify-between items-end self-stretch">
          <button className="flex items-center">
            수정 <ChevronRight className="w-5 h-5 stroke-[1.5]" />
          </button>

          <div className="flex items-center gap-1">
            <div className="rounded px-2 bg-[#D9D9D9]">마감</div>
            <div className="rounded px-2 bg-[#FFF2E4] text-[#FF8A30]">
              디자이너
            </div>
          </div>
        </div>
      </div>

      <div className="mt-2 mx-3 bg-white grid grid-cols-2 gap-x-9 px-3.5 py-5 gap-y-3 rounded-lg shadow-[0px_0px_2px_0px_rgba(0,0,0,0.25)]">
        <div className="flex justify-between items-center">
          <span className="text-[#979797]">PM</span>
          <div className="flex gap-1">
            <span>아무개</span>
            <span>아무개</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-[#979797]">프론트엔드</span>
          <div className="flex gap-1">
            <span>아무개</span>
            <span>아무개</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-[#979797]">디자이너</span>
          <div className="flex gap-1">
            <span>아무개</span>
            <span>아무개</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-[#979797]">백엔드</span>
          <div className="flex gap-1">
            <span>아무개</span>
            <span>아무개</span>
          </div>
        </div>
      </div>

      <div className="sticky -top-3 z-10">
        <RoleSelector
          selectedRole={selectedRole}
          onRoleSelect={setSelectedRole}
        />

        <FilterSection
          excludeClosed={excludeClosed}
          onExcludeClosedChange={setExcludeClosed}
          sortOption={sortOption}
          onSortOptionChange={setSortOption}
        />
      </div>

      <UserList
        users={MOCK_USERS}
        onUserClick={handleUserClick}
        likedUserIds={likedUserIds}
        onLikeToggle={handleLikeToggle}
      />
    </div>
  );
};

// Mock data for demonstration
const MOCK_USERS: User[] = Array.from(Array(40)).map((_, index) => ({
  id: index,
  userName: '아무개',
  userType: '목표를 향해 달리는 로봇 유형',
  position: '프론트엔드',
}));
