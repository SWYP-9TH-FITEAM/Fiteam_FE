import {Button} from '@/components/ui/button';

import {ChevronRight} from 'lucide-react';
import * as React from 'react';
import {RoleSelector} from './RoleSelector';
import {FilterSection} from './FilterSection';
import {UserList} from './UserList';
import {useCurrentGroupId} from '@/shared/model/group-id';
import {useQueries} from '@tanstack/react-query';
import {memberQueries} from '@/entities/member/api';
import {teamQueries} from '@/entities/team/api/team.query';
import {cn} from '@/lib/utils';
import {GroupDrawer} from '@/shared/ui/GroupDrawer';
import {useCardIdMap} from '@/shared/model/card-id-map';
import robot from '@/assets/images/robot.png';
import {Link} from 'react-router-dom';

export const TeamBuilding = () => {
  const currentGroupId = useCurrentGroupId();

  const cardData = useCardIdMap();

  const {
    data: [{data: myTeam}, {data: myProfileMini}, {data: positions}],
    loading,
  } = useQueries({
    queries: [
      {
        ...teamQueries.myTeam(currentGroupId ?? 0),
        enabled: currentGroupId !== null,
      },
      {
        ...memberQueries.myProfileMini(currentGroupId ?? 0),
        enabled: currentGroupId !== null,
      },
      {
        ...memberQueries.positionsByGroupId(currentGroupId ?? 0),
        enabled: currentGroupId !== null,
      },
    ],
    combine: data => {
      return {
        data,
        loading: data.some(data => data.isLoading),
      };
    },
  });

  const [selectedRole, setSelectedRole] = React.useState(positions?.[0] ?? '');
  const [excludeClosed, setExcludeClosed] = React.useState(false);

  React.useEffect(() => {
    if (!loading && positions) {
      setSelectedRole(positions[0]);
    }
  }, [positions, loading]);

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center py-2.5 px-5">
        <GroupDrawer />

        <Button asChild variant="ghost" className="hover:bg-white">
          <Link to="/my-team">진행상황 보기</Link>
        </Button>
      </div>

      <div className="rounded-lg mx-3 shadow-[0px_0px_2px_0px_rgba(0,0,0,0.25)] p-3 flex items-center justify-between bg-white">
        <div className="flex gap-2">
          <div className="px-1 py-2 bg-[#D9D9D9] rounded-lg w-24 h-24">
            <img
              src={
                (cardData.state === 'hasData' &&
                  cardData.data.get(myProfileMini?.cardId ?? 0)?.imgUrl) ||
                myProfileMini?.imageUrl ||
                robot
              }
              alt="내 프로필 이미지"
              className="w-full h-full"
            />
          </div>
          <div>{myProfileMini?.userName}</div>
        </div>

        <div className="flex flex-col justify-between items-end self-stretch text-sm">
          <Link to="/profile" className="flex items-center text-[#767676]">
            자세히 보기 <ChevronRight className="w-5 h-5 stroke-[1.5]" />
          </Link>

          <div className="flex items-center gap-1">
            <div className="rounded px-2 bg-[#D9D9D9]">
              {myProfileMini?.teamStatus}
            </div>
            <div className="rounded px-2 bg-[#FFF2E4] text-[#FF8A30]">
              {myProfileMini?.position}
            </div>
          </div>
        </div>
      </div>

      <div
        className={cn(
          'mt-2 mx-3 bg-white rounded-lg shadow-[0px_0px_2px_0px_rgba(0,0,0,0.25)]',
          !loading && !myTeam && 'flex justify-center items-center',
          !loading && myTeam && 'grid grid-cols-2 gap-x-9 px-3.5 py-5 gap-y-3',
          loading && 'flex justify-center items-center',
        )}
      >
        {loading && <div className="loading loading-spinner loading-xl" />}
        {!loading && !myTeam && <div className="p-4">팀이 없습니다.</div>}
        {!loading &&
          myTeam &&
          myTeam.members.map(teamMember => (
            <div
              key={teamMember.userId}
              className="flex justify-between items-center text-sm"
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
