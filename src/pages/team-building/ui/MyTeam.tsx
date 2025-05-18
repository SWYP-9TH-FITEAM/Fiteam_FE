import * as React from 'react';
import {useQueries} from '@tanstack/react-query';
import {ChevronLeft} from 'lucide-react';
import {useNavigate} from 'react-router-dom';
import {A11y, FreeMode, Mousewheel} from 'swiper/modules';
import {Swiper, SwiperSlide} from 'swiper/react';

import chatIcon from '@/assets/icons/chat.svg';
import robot from '@/assets/images/robot.png';
import {memberQueries} from '@/entities/member/api';
import {teamQueries} from '@/entities/team/api/team.query';
import {LayoutBottomBar} from '@/layouts/LayoutBottomBar';
import {cn} from '@/lib/utils';
import {useCardIdMap} from '@/shared/model/card-id-map';
import {useCurrentGroupId} from '@/shared/model/group-id';
import {GroupDrawer} from '@/shared/ui/GroupDrawer';
import {TeamLeaveButton} from './TeamLeaveButton';

import './swiper.css';

export const MyTeam: React.FC = () => {
  const navigate = useNavigate();
  const currentGroupId = useCurrentGroupId();

  const [tab, setTab] = React.useState<'profile' | 'otherTeam'>('profile');

  const [activePosition, setActivePosition] = React.useState('all');

  const [excludeClosed, setExcludeClosed] = React.useState(false);

  const {
    data: [{data: myTeam}, {data: positions}, {data: teamBuildingStatus}],
    loading,
    error,
  } = useQueries({
    queries: [
      {
        ...teamQueries.myTeam(currentGroupId ?? -1),
        enabled: currentGroupId !== null,
      },
      {
        ...memberQueries.positionsByGroupId(currentGroupId ?? -1),
        enabled: currentGroupId !== null,
      },
      {
        ...teamQueries.teamBuildingStatus(currentGroupId ?? -1),
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

  const cardData = useCardIdMap();

  const filteredMembers = React.useMemo(() => {
    return myTeam?.members.filter(
      member => activePosition === 'all' || member.position === activePosition,
    );
  }, [myTeam, activePosition]);

  const filteredTeamBuildingStatus = React.useMemo(() => {
    return teamBuildingStatus?.filter(team =>
      excludeClosed ? team.teamStatus !== '모집 완료' : true,
    );
  }, [teamBuildingStatus, excludeClosed]);

  const header = (
    <header className="flex items-center gap-2.5 px-3 py-2.5">
      <button onClick={() => navigate(-1)}>
        <ChevronLeft className="h-6 w-6 stroke-[1.5]" />
      </button>
      <span className="text-xl font-semibold tracking-[-0.5px]">나의 팀</span>

      {myTeam && <TeamLeaveButton teamId={myTeam.teamId} />}
    </header>
  );

  if (error) {
    return (
      <LayoutBottomBar
        hideBottomBar
        classNames={{
          wrapper: 'bg-white',
        }}
        header={header}
      >
        <div className="text-red-500">
          데이터를 불러오는 중 오류가 발생했습니다.
        </div>
      </LayoutBottomBar>
    );
  }

  return (
    <LayoutBottomBar
      hideBottomBar
      classNames={{
        wrapper: 'bg-white',
      }}
      header={header}
    >
      <GroupDrawer />
      <div
        className={cn(
          'mx-3 mt-2 rounded-lg bg-[#F1F2F4] shadow-[0px_0px_2px_0px_rgba(0,0,0,0.25)]',
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
              <span className="text-[#767676]">{teamMember.position}</span>
              <div className="flex gap-1">
                <span>{teamMember.userName}</span>
              </div>
            </div>
          ))}
      </div>

      <div className="mt-3 flex items-center justify-center rounded-[20px_16px_0px_0px] bg-white">
        <button
          className={cn(
            `flex flex-1 items-center justify-center py-2.5`,
            tab === 'profile'
              ? 'border-b border-black text-black'
              : 'text-[#979797]',
          )}
          onClick={() => setTab('profile')}
        >
          <span className="text-[18px] leading-[1.33] font-medium tracking-[-2.5%]">
            프로필 카드
          </span>
        </button>

        <button
          className={cn(
            `flex flex-1 items-center justify-center py-2.5`,
            tab === 'otherTeam'
              ? 'border-b border-black text-black'
              : 'text-[#979797]',
          )}
          onClick={() => setTab('otherTeam')}
        >
          <span className="text-[18px] leading-[1.33] font-medium tracking-[-2.5%]">
            팀 구성 현황
          </span>
        </button>
      </div>

      {tab === 'profile' && (
        <>
          <Swiper
            modules={[A11y, Mousewheel, FreeMode]}
            slidesPerView="auto"
            className="relative my-4 flex w-full items-center gap-2"
            wrapperClass="gap-2"
            mousewheel={{forceToAxis: true, enabled: true}}
            watchOverflow
            freeMode
          >
            <SwiperSlide>
              <button
                className={cn(
                  'flex rounded-full bg-[#EEE] px-4 py-1',
                  activePosition === 'all' && 'bg-[#5F4AFF] text-white',
                )}
                onClick={() => setActivePosition('all')}
              >
                전체
              </button>
            </SwiperSlide>
            {positions?.map((position, index) => {
              return (
                <SwiperSlide key={index}>
                  <button
                    className={cn(
                      'flex rounded-full bg-[#EEE] px-4 py-1',
                      activePosition === position && 'bg-[#5F4AFF] text-white',
                    )}
                    onClick={() => setActivePosition(position)}
                  >
                    {position}
                  </button>
                </SwiperSlide>
              );
            })}
          </Swiper>

          {cardData.state === 'hasData' &&
            filteredMembers?.map(member => (
              <div
                key={member.userId}
                className={cn(
                  'flex items-center justify-between border-b border-[#EEEEEE] bg-white p-[14px_20px_24px]',
                )}
              >
                <div className="flex gap-2">
                  <div className="relative h-24 w-24 overflow-hidden rounded-[10px] bg-[#E9E9E9]">
                    <img
                      src={member.profileImgUrl || robot}
                      alt={`${member.userName}'s profile`}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="flex w-[101px] flex-col gap-1 pt-1 text-left">
                    <span className="text-[18px] leading-[1.33] font-medium tracking-[-2.5%] text-[#111111]">
                      {member.userName}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end justify-between self-stretch">
                  <div className="flex items-center gap-1">
                    <div className="flex items-center gap-1">
                      <button className="flex h-6 items-center justify-center rounded-[11.5px] bg-[#F1F2F4] px-2">
                        <span className="text-[13px] leading-[1.23] font-medium tracking-[-2.5%] text-[#111111]">
                          궁합
                        </span>
                      </button>

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
              </div>
            ))}
        </>
      )}
      {tab === 'otherTeam' && (
        <>
          <div className="flex items-center justify-between gap-4 bg-white px-5 py-4">
            <div className="flex items-center gap-2.5">
              <label className="flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={excludeClosed}
                  onChange={() => setExcludeClosed(prev => !prev)}
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
                  모집 완료된 팀 제외하고 보기
                </span>
              </label>
            </div>
          </div>
          {filteredTeamBuildingStatus?.map(({teamStatus, members, teamId}) => (
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
                      <span>{teamMember.userName}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </>
      )}
    </LayoutBottomBar>
  );
};
