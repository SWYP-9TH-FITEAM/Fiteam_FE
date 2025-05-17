import {GetUserCardResponseDto} from '@/entities/user/api';
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
    <div className="w-full h-[447px] my-5 p-3 flex flex-col items-center bg-white rounded-[16px] shadow-[0px_0px_2px_0px_rgba(0,0,0,0.25)]">
      <div className="ml-auto flex">
        <p className="text-gray-5 text-[13px] font-medium leading-4">
          테스트 상세보기
        </p>
        <ChevronRightIcon className="w-4 h-4" />
      </div>
      <img
        src={userCardData?.imgUrl}
        alt={userCardData?.name}
        className="w-[164px] h-[164px] mt-[18px]"
      />
      <p className="mt-5 text-2xl not-italic font-semibold leading-8">
        {userCardData?.name}
      </p>
      <p className="h-[57px] mt-9 text-base font-medium leading-6">
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
          className="w-full h-[54px] bg-primary text-white rounded-lg text-lg font-medium"
          onClick={handleCreateProfile}
        >
          프로필 생성하기
        </button>
      )}
    </div>
  );
};

export default MyProfileEmpty;
