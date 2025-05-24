import type {GetManagerGroupsAllResponseDto} from '@/entities/manager/api';

import * as React from 'react';
import {useQuery} from '@tanstack/react-query';

import {managerQueries} from '@/entities/manager/api';
import {teamQueries} from '@/entities/team/api/team.query';
import ManagerHeader from '@/features/manager/layouts/ManagerHeader';
import {cn} from '@/lib/utils';
import {GroupDropdown} from '@/pages/group-invite/ui/GroupDropdown';
import LeftMenu from '@/pages/manager-team-building/ui/LeftMenu';
import {Footer} from '@/shared/ui/desktop/Footer';
import {Main} from '@/shared/ui/desktop/Main';

export const TeamList: React.FC = () => {
  const {data: groups} = useQuery(managerQueries.groupsAll());

  const [selectedGroup, setSelectedGroup] = React.useState<
    GetManagerGroupsAllResponseDto[number] | null
  >(null);

  const {data: members} = useQuery({
    ...teamQueries.teamBuildingStatus(selectedGroup?.groupId ?? -1),
    enabled: !!selectedGroup,
  });

  return (
    <>
      <ManagerHeader />
      <Main classNames={{main: 'bg-[#F9F9F9]'}}>
        <div className="flex flex-1">
          <LeftMenu />

          <main className="flex flex-1 flex-col gap-10 px-8 py-12">
            <div className="text-left text-2xl font-semibold">
              전체 팀 구성 현황
            </div>
            <GroupDropdown
              groups={groups ?? []}
              onSelect={setSelectedGroup}
              selected={selectedGroup}
            />
            {selectedGroup && members && (
              <div className="flex flex-col gap-6">
                <div className="grid min-h-12 grid-cols-3 rounded-xl bg-white p-4 shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]">
                  {members.map(
                    ({teamId, teamStatus, members, masterUserId}) => (
                      <div
                        key={teamId}
                        className={cn(
                          'mx-3 mt-2 rounded-lg bg-[#F1F2F4] shadow-[0px_0px_2px_0px_rgba(0,0,0,0.25)]',
                        )}
                      >
                        <div className="flex items-center justify-end pt-2 pr-2">
                          <div className="w-fit rounded-sm bg-white px-2 py-0.5 text-sm">
                            {teamStatus}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-x-9 gap-y-3 px-3.5 py-5">
                          {members.map(teamMember => (
                            <div
                              key={teamMember.userId}
                              className="flex items-center justify-between text-sm"
                            >
                              <span className="text-[#767676]">
                                {teamMember.position}
                              </span>
                              <div className="flex gap-1">
                                <span>
                                  {teamMember.userName}
                                  {masterUserId === teamMember.userId && ' 👑'}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ),
                  )}
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
