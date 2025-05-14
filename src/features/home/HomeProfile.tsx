import {GetUserNameImgJobResponseDto} from '@/entities/user/api/dto';
import ContentsCard from './components/ContentsCard';

interface HomeProfileProps {
  profileData: GetUserNameImgJobResponseDto | null;
}

const HomeProfile = ({profileData}: HomeProfileProps) => {
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
