import type {GetUserCardResponseDto} from '@/entities/user/api';

import {ChevronRightIcon} from 'lucide-react';
import {useNavigate} from 'react-router-dom';

interface MyProfileEmptyProps {
  userCardData: GetUserCardResponseDto | undefined;
  isInGroup?: boolean;
}

const MyProfileEmpty = ({
  userCardData,
  isInGroup = false,
}: MyProfileEmptyProps) => {
  const navigate = useNavigate();
  const handleCreateProfile = () => {
    navigate('/profile/create');
  };
  return (
    <div className="my-5 flex h-[447px] w-full flex-col items-center rounded-[16px] bg-white p-3 shadow-[0px_0px_2px_0px_rgba(0,0,0,0.25)]">
      <div className="ml-auto flex">
        <p className="text-gray-5 text-[13px] leading-4 font-medium">
          테스트 상세보기
        </p>
        <ChevronRightIcon className="h-4 w-4" />
      </div>
      <img
        src={userCardData?.imgUrl}
        alt={userCardData?.name}
        className="mt-[18px] h-[164px] w-[164px]"
      />
      <p className="mt-5 text-2xl leading-8 font-semibold not-italic">
        {userCardData?.name}
      </p>
      <p className="mt-9 h-[57px] text-base leading-6 font-medium">
        {isInGroup ? (
          <>팀 빌딩을 위해 그룹 프로필을 만들어 주세요.</>
        ) : (
          <>
            아직 그룹이 존재하지 않습니다.
            <br />
            그룹이 있어야 프로필 생성이 가능합니다.
          </>
        )}
      </p>
      {isInGroup && (
        <button
          className="bg-primary h-[54px] w-full rounded-lg text-lg font-medium text-white"
          onClick={handleCreateProfile}
        >
          프로필 생성하기
        </button>
      )}
    </div>
  );
};

export default MyProfileEmpty;
