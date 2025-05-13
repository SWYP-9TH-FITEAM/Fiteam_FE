import {GetUserNameImgJobResponseDto} from '@/entities/user/api/dto';
import ContentsCard from './components/ContentsCard';

interface HomeProfileProps {
  isLogin: boolean;
  profileData: GetUserNameImgJobResponseDto | null;
}

const HomeProfile = ({isLogin, profileData}: HomeProfileProps) => {
  if (!isLogin) {
    return (
      <ContentsCard title="내 프로필">
        <div className="flex flex-col mt-5 mb-[25px]">
          <div className="text-[#767676] text-justify text-base font-medium leading-6">
            내 프로필이 없으시네요
          </div>
          <div className="text-[#111] text-justify text-lg font-bold leading-6">
            내 프로필을 작성하고 팀빌딩을 해보세요
          </div>
        </div>
      </ContentsCard>
    );
  }

  return (
    <ContentsCard title="내 프로필" arrowLink="/profile">
      <div className="bg-white p-4 mt-2 rounded-md border-[1.5px] border-solid border-[#5F4AFF]">
        <h4 className="text-left text-[#111] text-2xl font-semibold leading-8">
          {profileData?.userName}
        </h4>
        {profileData?.job && (
          <div className="flex items-center gap-1.5 text-[#111] text-sm font-medium leading-5">
            <span>{profileData.job}</span>
            <div className="w-1 h-1 rounded-full bg-black"></div>
            <span>{profileData.job}</span>
          </div>
        )}
      </div>
    </ContentsCard>
  );
};

export default HomeProfile;
