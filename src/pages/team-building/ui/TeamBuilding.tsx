import * as React from 'react';
import {useQueries} from '@tanstack/react-query';
import {ChevronRight} from 'lucide-react';
import {Link} from 'react-router-dom';

import robot from '@/assets/images/robot.png';
import {Button} from '@/components/ui/button';
import {memberQueries} from '@/entities/member/api';
import {teamQueries} from '@/entities/team/api/team.query';
import {cn} from '@/lib/utils';
import {useCardIdMap} from '@/shared/model/card-id-map';
import {useCurrentGroupId} from '@/shared/model/group-id';
import {GroupDrawer} from '@/shared/ui/GroupDrawer';
import {FilterSection} from './FilterSection';
import {RoleSelector} from './RoleSelector';
import {UserList} from './UserList';

export const TeamBuilding = () => {
  const currentGroupId = useCurrentGroupId();

  const cardData = useCardIdMap();

  const {
    data: [{data: myTeam}, {data: myProfileMini}, {data: positions}],
    loading,
    error,
  } = useQueries({
    queries: [
      {
        ...teamQueries.myTeam(currentGroupId ?? -1),
        enabled: currentGroupId !== null,
      },
      {
        ...memberQueries.myProfileMini(currentGroupId ?? -1),
        enabled: currentGroupId !== null,
      },
      {
        ...memberQueries.positionsByGroupId(currentGroupId ?? -1),
        enabled: currentGroupId !== null,
      },
    ],
    combine: data => {
      return {
        data,
        loading: data.some(data => data.isLoading),
        error: data.some(data => data.isError),
      };
    },
  });

  const [selectedRole, setSelectedRole] = React.useState(positions?.[0] ?? '');
  const [excludeClosed, setExcludeClosed] = React.useState(false);

  React.useEffect(() => {
    if (!loading && positions && !selectedRole) {
      setSelectedRole(positions[0]);
    }
  }, [positions, loading, selectedRole]);

  if (error) {
    return (
      <div className="p-4 text-red-500">
        데이터를 불러오는 중 오류가 발생했습니다.
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 py-2.5">
        <GroupDrawer />

        <Button asChild variant="ghost" className="hover:bg-white">
          <Link to="/my-team">진행상황 보기</Link>
        </Button>
      </div>

      <div className="mx-3 flex items-center justify-between rounded-lg bg-white p-3 shadow-[0px_0px_2px_0px_rgba(0,0,0,0.25)]">
        <div className="flex gap-2">
          <div className="h-24 w-24 rounded-lg bg-[#D9D9D9] px-1 py-2">
            <img
              src={
                (cardData.state === 'hasData' &&
                  cardData.data.get(myProfileMini?.cardId ?? -1)?.imgUrl) ||
                myProfileMini?.imageUrl ||
                robot
              }
              alt="내 프로필 이미지"
              className="h-full w-full"
            />
          </div>
          <div>{myProfileMini?.userName}</div>
        </div>

        <div className="flex flex-col items-end justify-between self-stretch text-sm">
          <Link to="/profile" className="flex items-center text-[#767676]">
            자세히 보기 <ChevronRight className="h-5 w-5 stroke-[1.5]" />
          </Link>

          <div className="flex items-center gap-1">
            <div className="rounded bg-[#D9D9D9] px-2">
              {myProfileMini?.teamStatus}
            </div>
            <div className="rounded bg-[#FFF2E4] px-2 text-[#FF8A30]">
              {myProfileMini?.position}
            </div>
          </div>
        </div>
      </div>

      <div
        className={cn(
          'mx-3 mt-2 rounded-lg bg-white shadow-[0px_0px_2px_0px_rgba(0,0,0,0.25)]',
          !loading && !myTeam && 'flex items-center justify-center',
          !loading && myTeam && 'grid grid-cols-2 gap-x-9 gap-y-3 px-3.5 py-5',
          loading && 'flex items-center justify-center',
        )}
      >
        {loading && <div className="loading loading-spinner loading-xl" />}
        {!loading && !myTeam && <div className="p-4">팀이 없습니다.</div>}
        {!loading &&
          myTeam &&
          myTeam.members.map(teamMember => (
            <div
              key={teamMember.userId}
              className="flex items-center justify-between text-sm"
            >
              <span className="text-[#979797]">{teamMember.position}</span>
              <div className="flex gap-1">
                <span>{teamMember.userName}</span>
              </div>
            </div>
          ))}
      </div>

      <div className="sticky -top-3 z-10">
        <RoleSelector
          selectedRole={selectedRole}
          onRoleSelect={setSelectedRole}
        />

        <FilterSection
          excludeClosed={excludeClosed}
          onExcludeClosedChange={setExcludeClosed}
        />
      </div>

      <UserList selectedRole={selectedRole} excludeClosed={excludeClosed} />
    </div>
  );
};
