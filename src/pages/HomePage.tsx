import {userQueries} from '@/entities/user/api';
import ContentsCard from '@/features/home/components/ContentsCard';
import {HomeHeader} from '@/features/home/HomeHeader';
import HomeProjectInProgress from '@/features/home/HomeProjectInProgress';
import HomeProjectPending from '@/features/home/HomeProjectPending';
import {HomeResultCard} from '@/features/home/HomeResultCard';
import {LayoutBottomBar} from '@/layouts/LayoutBottomBar';
import {useQuery} from '@tanstack/react-query';

const HomePage = () => {
  const {data: userMiniResultData} = useQuery(userQueries.miniResult());

  if (!userMiniResultData) {
    return (
      <LayoutBottomBar classNames={{wrapper: 'bg-gray-1'}}>
        <HomeHeader />
        <ContentsCard>
          <div className="flex flex-col gap-5 mt-[92px] mb-[128px] text-center">
            <div className="text-[#111] text-lg font-bold leading-6">
              아직 테스트를 하지 않으셨네요
            </div>
            <button className="flex h-12 justify-center items-center bg-primary rounded-[10px] text-white font-medium leading-6">
              테스트하고 내 성향 파악하기
            </button>
          </div>
        </ContentsCard>
      </LayoutBottomBar>
    );
  }

  // TOODO:: 각 바 누르면 해당 팀빌딩 화면
  return (
    <LayoutBottomBar classNames={{wrapper: 'bg-gray-1'}}>
      <HomeHeader />
      <div className="flex flex-col gap-4 pb-4">
        <HomeResultCard data={userMiniResultData} />
        <HomeProjectInProgress />
        <HomeProjectPending />
      </div>
    </LayoutBottomBar>
  );
};

export default HomePage;
