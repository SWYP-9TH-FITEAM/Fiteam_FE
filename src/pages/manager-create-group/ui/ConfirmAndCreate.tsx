import type {InitialGroupInfo} from '../model/form';

import * as React from 'react';
import {Checkbox} from '@heroui/react';
import {format} from 'date-fns';
import {useNavigate} from 'react-router-dom';
import {toast} from 'sonner';

import {Button} from '@/components/ui/button';
import {Separator} from '@/components/ui/separator';
import {postGroupCreate, postGroupSetTeamtype} from '@/entities/group/api';
import {withHandleError} from '@/shared/util/handle-error';

interface ConfirmAndCreateProps {
  onBack: () => void;
  groupInfo: InitialGroupInfo;
}

export const ConfirmAndCreate: React.FC<ConfirmAndCreateProps> = ({
  onBack,
  groupInfo,
}) => {
  const [isPending, startTransition] = React.useTransition();

  const [agree, setAgree] = React.useState(false);

  const navigate = useNavigate();

  const handleCreate = () => {
    if (!agree || isPending) return;

    startTransition(
      withHandleError(async () => {
        const groupId = await postGroupCreate({
          contactPolicy: 'Auto',
          name: groupInfo.groupName,
          description: groupInfo.groupDescription,
          maxUserCount: 99,
        });
        await postGroupSetTeamtype({
          groupId,
          configJson: groupInfo.memberCountPerPosition.reduce(
            (acc, {count, position}) => {
              acc[position] = count > 1 ? `1~${count}` : count.toString();
              return acc;
            },
            {} as Record<string, string>,
          ),
          startDatetime: groupInfo.startDatetime,
          endDatetime: groupInfo.endDatetime,
          positionBased: groupInfo.positionBased,
          minMembers: groupInfo.minMembers,
          maxMembers: groupInfo.maxMembers,
          name: groupInfo.positionBased ? '직접 빌딩' : '랜덤 빌딩',
          description: groupInfo.teamTypeDescription,
        });
        toast.success('그룹이 생성되었습니다.');
        navigate('/manager/team-building');
      }),
    );
  };

  return (
    <>
      <div className="flex flex-col gap-10 rounded-[20px] bg-white p-11 shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]">
        <div className="flex gap-10">
          <div className="flex flex-col gap-5 text-left">
            <span className="text-gray-5 text-[24px] leading-[32px] font-semibold tracking-[-0.6px]">
              그룹 이름
            </span>
            <div className="text-[28px] leading-[36px] font-semibold tracking-[-0.7px]">
              {groupInfo.groupName}
            </div>
          </div>

          <div className="flex flex-col gap-5 text-left">
            <span className="text-gray-5 text-[24px] leading-[32px] font-semibold tracking-[-0.6px]">
              그룹 설명
            </span>
            <div className="text-[28px] leading-[36px] font-semibold tracking-[-0.7px]">
              {groupInfo.groupDescription}
            </div>
          </div>

          <div className="flex flex-col gap-5 text-left">
            <span className="text-gray-5 text-[24px] leading-[32px] font-semibold tracking-[-0.6px]">
              구성 방식
            </span>
            <div className="text-[28px] leading-[36px] font-semibold tracking-[-0.7px]">
              {groupInfo.positionBased ? '직접 빌딩' : '랜덤 빌딩'}
            </div>
          </div>

          <div className="flex flex-col gap-5 text-left">
            <span className="text-gray-5 text-[24px] leading-[32px] font-semibold tracking-[-0.6px]">
              팀 빌딩 기간/시간
            </span>
            <div className="text-[28px] leading-[36px] font-semibold tracking-[-0.7px]">
              {format(groupInfo.startDatetime, 'M월 dd일 HH:mm')} -{' '}
              {format(groupInfo.endDatetime, 'M월 dd일 HH:mm')}
            </div>
          </div>
        </div>

        <Separator />

        <div className="flex gap-6">
          <div className="flex flex-col gap-5 text-left">
            <span className="text-gray-5 text-[24px] leading-[32px] font-semibold tracking-[-0.6px]">
              팀 최소 인원 수
            </span>
            <div className="text-[28px] leading-[36px] font-semibold tracking-[-0.7px]">
              {groupInfo.minMembers}
            </div>
          </div>

          <div className="flex flex-col gap-5 text-left">
            <span className="text-gray-5 text-[24px] leading-[32px] font-semibold tracking-[-0.6px]">
              팀 최대 인원 수
            </span>
            <div className="text-[28px] leading-[36px] font-semibold tracking-[-0.7px]">
              {groupInfo.maxMembers}
            </div>
          </div>

          <div className="flex flex-col gap-5 text-left">
            <span className="text-gray-5 text-[24px] leading-[32px] font-semibold tracking-[-0.6px]">
              직군 별 인원 수
            </span>
            <div className="text-[28px] leading-[36px] font-semibold tracking-[-0.7px]">
              {groupInfo.memberCountPerPosition
                .map(({count, position}) => `${position} ${count}명`)
                .join(', ')}
            </div>
          </div>

          <div className="flex flex-col gap-5 text-left">
            <span className="text-gray-5 text-[24px] leading-[32px] font-semibold tracking-[-0.6px]">
              방출 조건
            </span>
            <div className="text-[28px] leading-[36px] font-semibold tracking-[-0.7px]">
              {groupInfo.teamTypeDescription}
            </div>
          </div>
        </div>

        <Separator />

        <Checkbox checked={agree} onValueChange={setAgree}>
          입력 정보가 정확함을 확인했습니다.
        </Checkbox>
      </div>

      <div className="flex justify-center gap-3.5">
        <Button
          variant="secondary"
          className="bg-gray-2 hover:bg-gray-2/70 h-[51px] px-[70px] py-1.5 text-2xl leading-[32px] tracking-[-0.6px]"
          onClick={onBack}
          disabled={isPending}
        >
          이전
        </Button>

        <Button
          onClick={handleCreate}
          disabled={!agree}
          className="h-[51px] px-[70px] py-1.5 text-2xl leading-[32px] tracking-[-0.6px]"
        >
          {isPending && <div className="loading loading-spinner" />}
          생성
        </Button>
      </div>
    </>
  );
};
