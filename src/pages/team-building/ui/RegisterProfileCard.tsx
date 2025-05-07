import {Button} from '@/components/ui/button';
import {withHandleError} from '@/shared/util/handle-error';
import * as React from 'react';
import {useNavigate} from 'react-router-dom';

export const RegisterProfileCard = () => {
  const navigate = useNavigate();

  const [isPending, startTransition] = React.useTransition();

  const handleUploadProfileCard = () => {
    startTransition(
      withHandleError(async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }),
    );
  };

  const handleModifyProfileCard = () => {
    navigate('/profile/edit');
  };

  return (
    <div className="flex flex-col h-full">
      <div className="text-2xl font-semibold tracking-[-0.6px] mt-11">
        팀 빌딩을 시작할거에요!
        <br />
        프로필 카드를 업로드해주세요.
      </div>

      <div className="flex flex-col text-lg font-medium tracking-[-0.45px] mt-9">
        <div className="flex py-4 px-5 bg-[#EDEEEF] rounded-lg">
          프로필 카드 등록
        </div>
        <div className="flex justify-between items-center py-4 px-5 rounded-lg shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]">
          <div className="flex gap-2 items-center">
            <span>이름</span>
            <span>직무</span>
            <span>경력</span>
          </div>

          <Button
            variant="secondary"
            className=""
            onClick={handleModifyProfileCard}
          >
            수정하기
          </Button>
        </div>
      </div>

      <div className="text-xl font-medium tracking-[-0.5px] mt-24">
        자기소개 카드를 업로드하면
        <br /> 다른 분들의 프로필카드도 볼 수 있어요
      </div>

      <Button
        onClick={handleUploadProfileCard}
        className="h-11 mt-auto mb-8"
        disabled={isPending}
      >
        {isPending ? '등록중...' : '등록하기'}
      </Button>
    </div>
  );
};
