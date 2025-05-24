import * as React from 'react';
import {useQuery} from '@tanstack/react-query';
import {ChevronLeft} from 'lucide-react';
import {Link, useNavigate, useParams} from 'react-router-dom';

import robot from '@/assets/images/robot.png';
import {managerQueries} from '@/entities/manager/api';
import {memberQueries} from '@/entities/member/api';
import ManagerHeader from '@/features/manager/layouts/ManagerHeader';
import {ChartBar} from '@/features/profile/CharacterCard';
import LeftMenu from '@/pages/manager-team-building/ui/LeftMenu';
import {useCardIdMap} from '@/shared/model/card-id-map';
import {Footer} from '@/shared/ui/desktop/Footer';
import {Main} from '@/shared/ui/desktop/Main';

export const Profile: React.FC = () => {
  const {groupId, memberId} = useParams<{groupId: string; memberId: string}>();

  const navigate = useNavigate();

  const memberIdNumber = Number(memberId);
  const isValidMemberId = !isNaN(memberIdNumber) && memberIdNumber > 0;
  const groupIdNumber = Number(groupId);
  const isValidGroupId = !isNaN(groupIdNumber) && groupIdNumber > 0;

  const {data: profile} = useQuery({
    ...memberQueries.profileByMemberId(memberIdNumber),
    enabled: isValidMemberId,
  });

  const {data: members} = useQuery({
    ...managerQueries.members(groupIdNumber),
    enabled: isValidGroupId,
  });

  const cardData = useCardIdMap();

  const member = members?.find(member => member.memberId === memberIdNumber);

  return (
    <>
      <ManagerHeader />
      <Main classNames={{main: 'bg-[#F9F9F9]'}}>
        <div className="flex flex-1">
          <LeftMenu />

          <main className="flex flex-1 flex-col gap-10 px-8 py-12">
            {!isValidMemberId && (
              <div className="text-2xl font-semibold">
                유효하지 않은 페이지입니다.
              </div>
            )}
            {isValidMemberId &&
              profile &&
              member &&
              cardData.state === 'hasData' && (
                <>
                  <div className="flex items-center gap-2 text-left text-2xl font-semibold">
                    <button onClick={() => navigate(-1)}>
                      <ChevronLeft className="size-6" />
                    </button>
                    {member.userName}님의 프로필
                  </div>
                  <div className="flex gap-5 rounded-xl bg-white px-8 py-6 shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]">
                    <div className="flex h-[255px] w-[290px] items-center justify-center rounded-xl bg-[#EEECFF] py-4">
                      <img
                        className="h-[240px] object-cover"
                        src={
                          cardData.data.get(member.cardId1 ?? -1)?.imgUrl ||
                          member.profileImageUrl ||
                          robot
                        }
                        alt="테스트 결과"
                      />
                    </div>

                    <div className="flex flex-col justify-between py-4">
                      <div className="flex items-end gap-2.5">
                        <span className="text-2xl font-semibold">
                          {member.userName}
                        </span>
                        <span className="text-gray-5 font-medium">
                          {cardData.data.get(member.cardId1 ?? -1)?.name}
                        </span>
                      </div>
                      <div className="flex h-[142px] w-[400px] flex-col justify-end gap-3 rounded-xl">
                        <ChartBar
                          label="외향형"
                          value={profile.numEI}
                          rightLabel="내향형"
                        />
                        <ChartBar
                          label="계획형"
                          value={profile.numPD}
                          rightLabel="실행형"
                        />
                        <ChartBar
                          label="창의형"
                          value={profile.numCL}
                          rightLabel="분석형"
                        />
                        <ChartBar
                          label="조율형"
                          value={profile.numVA}
                          rightLabel="주도형"
                        />
                      </div>
                    </div>

                    <div className="bg-gray-1 my-4 flex flex-1 flex-col justify-center gap-6 rounded-xl p-5">
                      <div className="flex items-center gap-2.5 text-lg font-medium">
                        <span className="text-gray-6 w-[60px]">직무</span>
                        <span>{member.position}</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-lg font-medium">
                        <span className="text-gray-6 w-[60px]">경력</span>
                        <span>
                          {((profile.workHistory ?? 0) / 12).toFixed(1)}년
                        </span>
                      </div>
                      <div className="flex items-center gap-2.5 text-lg font-medium">
                        <span className="text-gray-6 w-[60px]">목표</span>
                        <span>{profile.projectGoal}</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-lg font-medium">
                        <span className="text-gray-6 w-[60px]">목적</span>
                        <span>{profile.projectPurpose}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-start gap-5 rounded-xl bg-white px-8 py-6 shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]">
                    <div className="text-2xl leading-loose font-semibold">
                      포트폴리오
                    </div>

                    <div className="bg-gray-1 flex w-full rounded-lg px-5 py-3.5">
                      {profile.url && (
                        <Link
                          to={profile.url ?? ''}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          {profile.url}
                        </Link>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col items-start gap-5 rounded-xl bg-white px-8 py-6 shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]">
                    <div className="text-2xl leading-loose font-semibold">
                      자기 소개
                    </div>

                    <div className="bg-gray-1 flex min-h-[315px] w-full rounded-lg px-5 py-3.5">
                      {profile.introduction}
                    </div>
                  </div>
                </>
              )}
          </main>
        </div>
      </Main>
      <Footer />
    </>
  );
};
