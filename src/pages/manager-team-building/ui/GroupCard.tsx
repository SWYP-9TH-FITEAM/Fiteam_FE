import type {GetManagerGroupsAllResponseDto} from '@/entities/manager/api';

import * as React from 'react';
import {Link} from 'react-router-dom';

import {Button} from '@/components/ui/button';
import {GROUP_STATUS} from '@/entities/manager/api';

interface GroupCardProps {
  group: GetManagerGroupsAllResponseDto[number];
}

const GroupCard: React.FC<GroupCardProps> = ({group}) => {
  const {groupId, groupName, memberCount, positionBased, status} = group;

  const renderActionButtons = () => {
    switch (status) {
      case GROUP_STATUS.ONGOING:
        return (
          <>
            <Button size="lg" className="text-lg">
              공지 작성
            </Button>
            <Button size="lg" className="text-lg" variant="outline">
              종료
            </Button>
          </>
        );
      case GROUP_STATUS.PENDING:
        return (
          <>
            <Button size="lg" className="text-lg">
              공지 작성
            </Button>
            <Button size="lg" className="text-lg" variant="outline">
              시작
            </Button>
          </>
        );
      case GROUP_STATUS.ENDED:
        return (
          <>
            <Button size="lg" className="text-lg">
              각 팀장에게 연락처 전송
            </Button>
            <Button size="lg" className="text-lg" variant="outline">
              공지 작성
            </Button>
            <Button size="lg" className="text-lg" variant="outline">
              결과
            </Button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-1 flex flex-col gap-[120px] rounded-[20px] px-[34px] py-[26px] shadow">
      <div className="flex items-start justify-between p-6 pb-4">
        <div className="text-left">
          <div className="mb-1 flex items-center text-2xl font-semibold text-gray-800">
            <span className="mr-2 font-bold">[{status}]</span>
            {groupName}
          </div>
          <div className="text-xl font-medium">
            구성 : {positionBased ? '직접' : '랜덤'} / {memberCount}명
          </div>
        </div>
        <Button
          variant="outline"
          size="lg"
          className="border-transparent px-3 py-1 text-lg"
          asChild
        >
          <Link to={`/manager/team-building/group/${groupId}`}>상세 보기</Link>
        </Button>
      </div>
      <div className="flex gap-2 px-6 py-4">{renderActionButtons()}</div>
    </div>
  );
};

export default GroupCard;
