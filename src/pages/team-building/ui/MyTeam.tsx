import {memberQueries} from '@/entities/member/api';
import {teamQueries} from '@/entities/team/api/team.query';
import {LayoutBottomBar} from '@/layouts/LayoutBottomBar';
import {cn} from '@/lib/utils';
import {useCurrentGroupId} from '@/shared/model/group-id';
import {GroupDrawer} from '@/shared/ui/GroupDrawer';
import {useQueries} from '@tanstack/react-query';
import {ChevronLeft} from 'lucide-react';
import * as React from 'react';
import {useNavigate} from 'react-router-dom';
import {Swiper, SwiperSlide} from 'swiper/react';
import {A11y, FreeMode, Mousewheel} from 'swiper/modules';
import chatIcon from '@/assets/icons/chat.svg';
import {useCardIdMap} from '@/shared/model/card-id-map';
import robot from '@/assets/images/robot.png';

import './swiper.css';
import {TeamLeaveButton} from './TeamLeaveButton';

export const MyTeam: React.FC = () => {
  const navigate = useNavigate();
  const currentGroupId = useCurrentGroupId();

  const [tab, setTab] = React.useState<'profile' | 'otherTeam'>('profile');

  const [activePosition, setActivePosition] = React.useState('all');

  const [excludeClosed, setExcludeClosed] = React.useState(false);

  const {
    data: [{data: myTeam}, {data: positions}, {data: teamBuildingStatus}],
    loading,
  } = useQueries({
    queries: [
      {
        ...teamQueries.myTeam(currentGroupId ?? 0),
        enabled: currentGroupId !== null,
      },
      {
        ...memberQueries.positionsByGroupId(currentGroupId ?? 0),
        enabled: currentGroupId !== null,
      },
      {
        ...teamQueries.teamBuildingStatus(currentGroupId ?? 0),
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

  return (
    <LayoutBottomBar
      hideBottomBar
      classNames={{
        wrapper: 'bg-white',
      }}
      header={
        <header className="px-3 py-2.5 flex gap-2.5 items-center">
          <button onClick={() => navigate(-1)}>
            <ChevronLeft className="w-6 h-6 stroke-[1.5]" />
          </button>
          <span className="text-xl tracking-[-0.5px] font-semibold">
            나의 팀
          </span>

          {myTeam && <TeamLeaveButton teamId={myTeam.teamId} />}
        </header>
      }
    >
      <GroupDrawer />
      <div
        className={cn(
          'mt-2 mx-3 rounded-lg shadow-[0px_0px_2px_0px_rgba(0,0,0,0.25)] bg-[#F1F2F4]',
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
              <span className="text-[#767676]">{teamMember.position}</span>
              <div className="flex gap-1">
                <span>{teamMember.userName}</span>
              </div>
            </div>
          ))}
      </div>

      <div className="flex items-center mt-3 justify-center bg-white rounded-[20px_16px_0px_0px]">
        <button
          className={cn(
            `flex justify-center items-center py-2.5 flex-1`,
            tab === 'profile'
              ? 'border-b border-black text-black'
              : 'text-[#979797]',
          )}
          onClick={() => setTab('profile')}
        >
          <span className="font-medium text-[18px] leading-[1.33] tracking-[-2.5%]">
            프로필 카드
          </span>
        </button>

        <button
          className={cn(
            `flex justify-center  items-center py-2.5 flex-1`,
            tab === 'otherTeam'
              ? 'border-b border-black text-black'
              : 'text-[#979797]',
          )}
          onClick={() => setTab('otherTeam')}
        >
          <span className="font-medium text-[18px] leading-[1.33] tracking-[-2.5%]">
            팀 구성 현황
          </span>
        </button>
      </div>

      {tab === 'profile' && (
        <>
          <Swiper
            modules={[A11y, Mousewheel, FreeMode]}
            slidesPerView="auto"
            className="relative flex w-full items-center gap-2 my-4"
            wrapperClass="gap-2"
            mousewheel={{forceToAxis: true, enabled: true}}
            watchOverflow
            freeMode
          >
            <SwiperSlide>
              <button
                className={cn(
                  'flex py-1 px-4 rounded-full bg-[#EEE]',
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
                      'flex py-1 px-4 rounded-full bg-[#EEE]',
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
                className={cn(
                  'flex justify-between items-center p-[14px_20px_24px] bg-white border-b border-[#EEEEEE]',
                )}
              >
                <div className="flex gap-2">
                  <div className="w-24 h-24 rounded-[10px] bg-[#E9E9E9] overflow-hidden relative">
                    <img
                      src={member.profileImgUrl || robot}
                      alt={`${member.userName}'s profile`}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex flex-col gap-1 w-[101px] pt-1 text-left">
                    <span className="text-[18px] font-medium leading-[1.33] tracking-[-2.5%] text-[#111111]">
                      {member.userName}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end justify-between self-stretch">
                  <div className="flex items-center gap-1">
                    <div className="flex items-center gap-1">
                      <button className="px-2 h-6 rounded-[11.5px] bg-[#F1F2F4] flex items-center justify-center">
                        <span className="text-[13px] font-medium leading-[1.23] tracking-[-2.5%] text-[#111111]">
                          궁합
                        </span>
                      </button>

                      <button className="w-6 h-6 rounded-full bg-[#F1F2F4] flex items-center justify-center">
                        <img
                          src={chatIcon}
                          alt="Message icon"
                          className="w-4 h-4"
                        />
                      </button>
                    </div>
                  </div>

                  <div className="px-3 h-5 rounded-[4px] bg-[#D9D9D9] flex items-center justify-center">
                    <span className="text-[13px] font-medium leading-[1.23] tracking-[-2.5%] text-[#111111]">
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
          <div className="flex justify-between items-center gap-4 px-5 py-4 bg-white">
            <div className="flex items-center gap-2.5">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={excludeClosed}
                  onChange={() => setExcludeClosed(prev => !prev)}
                />
                <span
                  className={`relative w-4 h-4 border ${
                    excludeClosed ? 'border-[#BEBEBE]' : 'border-[#BEBEBE]'
                  } rounded inline-block mr-2.5`}
                >
                  {excludeClosed && (
                    <span className="absolute inset-0 flex items-center justify-center text-xs">
                      ✓
                    </span>
                  )}
                </span>
                <span className="text-[13px] font-medium leading-[1.23] text-[#111111] tracking-[-2.5%]">
                  모집 완료된 팀 제외하고 보기
                </span>
              </label>
            </div>
          </div>
          {filteredTeamBuildingStatus?.map(({teamStatus, members, teamId}) => (
            <div
              key={teamId}
              className={cn(
                'mt-2 mx-3 rounded-lg shadow-[0px_0px_2px_0px_rgba(0,0,0,0.25)] bg-[#F1F2F4]',
              )}
            >
              <div className="flex justify-end items-center pt-2 pr-2">
                <div className="bg-white w-fit rounded-sm px-2 py-0.5 text-sm">
                  {teamStatus}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-x-9 px-3.5 py-5 gap-y-3">
                {members.map(teamMember => (
                  <div
                    key={teamMember.userId}
                    className="flex justify-between items-center text-sm"
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
