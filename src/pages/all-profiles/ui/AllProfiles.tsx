import type {GetManagerGroupsAllResponseDto} from '@/entities/manager/api';

import * as React from 'react';
import {Checkbox} from '@heroui/react';
import {useQuery} from '@tanstack/react-query';
import {Link} from 'react-router-dom';

import chatIcon from '@/assets/icons/chat.svg';
import robot from '@/assets/images/robot.png';
import {managerQueries} from '@/entities/manager/api';
import ManagerHeader from '@/features/manager/layouts/ManagerHeader';
import {cn} from '@/lib/utils';
import {GroupDropdown} from '@/pages/group-invite/ui/GroupDropdown';
import LeftMenu from '@/pages/manager-team-building/ui/LeftMenu';
import {useCardIdMap} from '@/shared/model/card-id-map';
import {Footer} from '@/shared/ui/desktop/Footer';
import {Main} from '@/shared/ui/desktop/Main';

export const AllProfiles: React.FC = () => {
  const {data: groups} = useQuery(managerQueries.groupsAll());

  const [excludeClosed, setExcludeClosed] = React.useState(false);

  const [selectedGroup, setSelectedGroup] = React.useState<
    GetManagerGroupsAllResponseDto[number] | null
  >(null);

  const {data: members} = useQuery({
    ...managerQueries.members(selectedGroup?.groupId ?? -1),
    enabled: !!selectedGroup,
  });

  const [activePosition, setActivePosition] = React.useState('all');

  const cardData = useCardIdMap();

  const filteredMembers = React.useMemo(() => {
    return members?.filter(
      member => activePosition === 'all' || member.position === activePosition,
    );
  }, [members, activePosition]);

  const positions = React.useMemo(() => {
    return Array.from(
      new Set([
        'all',
        ...(members?.map(member => member.position).filter(Boolean) ?? []),
      ]),
    );
  }, [members]);

  return (
    <>
      <ManagerHeader />
      <Main classNames={{main: 'bg-[#F9F9F9]'}}>
        <div className="flex flex-1">
          <LeftMenu />

          <main className="flex flex-1 flex-col gap-10 px-8 py-12">
            <div className="flex justify-between">
              <GroupDropdown
                groups={groups ?? []}
                onSelect={setSelectedGroup}
                selected={selectedGroup}
              />

              {selectedGroup && members && (
                <div className="flex items-center justify-center px-5">
                  {positions.map((role, index) => (
                    <button
                      key={index}
                      className={`flex items-center justify-center px-[15px] py-[10px] ${
                        activePosition === role
                          ? 'border-b border-[#5F4AFF] text-[#5F4AFF]'
                          : 'text-[#979797]'
                      }`}
                      onClick={() => setActivePosition(role ?? '')}
                    >
                      <span className="text-[18px] leading-[1.33] font-medium tracking-[-2.5%]">
                        {role === 'all' ? '전체 보기' : role}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              <Checkbox
                checked={excludeClosed}
                onValueChange={setExcludeClosed}
              >
                마감 제외하고 보기
              </Checkbox>
            </div>

            {selectedGroup && members && (
              <div className="flex flex-col gap-6">
                <div className="grid min-h-12 grid-cols-3 gap-4">
                  {cardData.state === 'hasData' &&
                    filteredMembers?.map(member => (
                      <Link
                        to={`/manager/team-building/profile/${member.memberId}`}
                        key={member.userId}
                        className={cn(
                          'flex items-center justify-between rounded-xl border-b border-[#EEEEEE] bg-white p-4 shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]',
                        )}
                      >
                        <div className="flex gap-2">
                          <div className="relative h-24 w-24 overflow-hidden rounded-[10px] bg-[#E9E9E9]">
                            <img
                              src={member.profileImageUrl || robot}
                              alt={`${member.userName}'s profile`}
                              className="h-full w-full object-cover"
                            />
                          </div>

                          <div className="flex w-[101px] flex-col gap-1 pt-1 text-left">
                            <span className="text-[18px] leading-[1.33] font-medium tracking-[-2.5%] text-[#111111]">
                              {member.userName}
                            </span>

                            <span className="text-[13px] leading-[1.23] font-medium tracking-[-2.5%] text-[#111111]">
                              {cardData.data.get(member.cardId1 ?? -1)?.name}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col items-end justify-between self-stretch">
                          <div className="flex items-center gap-1">
                            <div className="flex items-center gap-1">
                              <button className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F1F2F4]">
                                <img
                                  src={chatIcon}
                                  alt="Message icon"
                                  className="h-4 w-4"
                                />
                              </button>
                            </div>
                          </div>

                          <div className="flex h-5 items-center justify-center rounded-[4px] bg-[#D9D9D9] px-3">
                            <span className="text-[13px] leading-[1.23] font-medium tracking-[-2.5%] text-[#111111]">
                              {member.position}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            )}
          </main>
        </div>
      </Main>
      <Footer />
    </>
  );
};
