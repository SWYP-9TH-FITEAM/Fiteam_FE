import * as React from 'react';
import {useQuery} from '@tanstack/react-query';
import {format} from 'date-fns';
import {ChevronLeft} from 'lucide-react';
import {useNavigate, useParams} from 'react-router-dom';

import {Button} from '@/components/ui/button';
import {Separator} from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {GetGroupGroupIdDataResponseDto} from '@/entities/group/api';
import {groupQueries} from '@/entities/group/api/group.query';
import {managerQueries} from '@/entities/manager/api';
import ManagerHeader from '@/features/manager/layouts/ManagerHeader';
import LeftMenu from '@/pages/manager-team-building/ui/LeftMenu';
import {Footer} from '@/shared/ui/desktop/Footer';
import {Main} from '@/shared/ui/desktop/Main';

export const GroupDetail: React.FC = () => {
  const {groupId} = useParams<{groupId: string}>();

  const groupIdNumber = Number(groupId);

  const isValidGroupId = !isNaN(groupIdNumber) && groupIdNumber > 0;

  const {data: group} = useQuery({
    ...groupQueries.group(groupIdNumber),
    enabled: isValidGroupId,
  });

  const {data: groupMembers} = useQuery({
    ...managerQueries.members(groupIdNumber),
    enabled: isValidGroupId,
  });

  const {data: notices} = useQuery({
    ...managerQueries.notices(),
  });

  const navigate = useNavigate();

  const getIsPending = (group: GetGroupGroupIdDataResponseDto) => {
    return new Date(group.startDatetime).getTime() - Date.now() > 0;
  };

  const getIsEnded = (group: GetGroupGroupIdDataResponseDto) => {
    return new Date(group.endDatetime).getTime() - Date.now() < 0;
  };

  const getIsOngoing = (group: GetGroupGroupIdDataResponseDto) => {
    return !getIsPending(group) && !getIsEnded(group);
  };

  return (
    <>
      <ManagerHeader />
      <Main classNames={{main: 'bg-[#F9F9F9]'}}>
        <div className="flex flex-1">
          <LeftMenu />

          <main className="flex flex-1 flex-col gap-10 px-8 py-12">
            {!isValidGroupId && (
              <div className="text-2xl font-semibold">
                그룹 아이디가 올바르지 않습니다.
              </div>
            )}
            {isValidGroupId && group && groupMembers && notices && (
              <>
                <div className="flex items-center gap-2 text-left text-2xl font-semibold">
                  <button onClick={() => navigate(-1)}>
                    <ChevronLeft className="size-6" />
                  </button>
                  {group.name} 상세보기
                </div>
                <div className="flex flex-col gap-5 rounded-xl bg-white px-8 py-6 shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]">
                  <div className="flex items-center gap-2 text-lg font-semibold">
                    <span>
                      {getIsPending(group) && '[대기중]'}
                      {getIsOngoing(group) && '[진행중]'}
                      {getIsEnded(group) && '[종료]'}
                    </span>
                    {group.name}
                  </div>

                  <Separator />

                  <div className="flex items-center gap-8">
                    <span className="w-[110px] text-left font-medium">
                      일정
                    </span>
                    <div className="bg-gray-1 flex flex-1 items-center px-5 py-2.5">
                      {format(group.startDatetime, 'yyyy.MM.dd HH:mm')} ~{' '}
                      {format(group.endDatetime, 'yyyy.MM.dd HH:mm')}
                    </div>
                    <Button variant="outline" className="w-[120px]">
                      그룹 삭제
                    </Button>
                  </div>

                  <div className="flex items-center gap-8">
                    <span className="w-[110px] text-left font-medium">
                      구성
                    </span>
                    <div className="bg-gray-1 flex flex-1 items-center px-5 py-2.5">
                      {group.positionBased ? '직접' : '랜덤'} |{' '}
                      {groupMembers.length}명
                    </div>
                    <Button variant="outline" className="w-[120px]">
                      전체 프로필
                    </Button>
                  </div>

                  <div className="flex items-start gap-8">
                    <span className="w-[110px] text-left font-medium">
                      그룹원
                    </span>
                    <div className="bg-gray-1 flex flex-1 items-center px-5 py-2.5">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>포지션</TableHead>
                            <TableHead>이름</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {groupMembers.map(
                            ({memberId, userName, position}) => (
                              <TableRow key={memberId}>
                                <TableCell className="text-left">
                                  {position}
                                </TableCell>
                                <TableCell className="text-left">
                                  {userName}
                                </TableCell>
                              </TableRow>
                            ),
                          )}
                        </TableBody>
                      </Table>
                    </div>
                    <Button variant="outline" className="w-[120px]">
                      그룹원 방출
                    </Button>
                  </div>

                  <div className="flex items-start gap-8">
                    <span className="w-[110px] text-left font-medium">
                      공지 내역
                    </span>
                    <div className="bg-gray-1 flex h-full flex-1 items-start px-5 py-2.5">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>제목</TableHead>
                            <TableHead>작성일</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {notices
                            .filter(({groupId}) => groupId === groupIdNumber)
                            .sort(
                              (a, b) =>
                                new Date(b.createdAt).getTime() -
                                new Date(a.createdAt).getTime(),
                            )
                            .map(({id, title, createdAt}) => (
                              <TableRow key={id}>
                                <TableCell className="text-left">
                                  {title}
                                </TableCell>
                                <TableCell className="text-left">
                                  {createdAt}
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </div>
                    <div className="flex flex-col gap-4">
                      <Button variant="outline" className="w-[120px]">
                        공지 작성
                      </Button>
                      <Button variant="outline" className="w-[120px]">
                        종료
                      </Button>
                    </div>
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
