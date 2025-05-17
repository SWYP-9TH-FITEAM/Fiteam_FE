import {getUserCard, GetUserMiniResultResponseDto} from '@/entities/user/api';
import ContentsCard from '@/features/home/components/ContentsCard';
import {HomeHeader} from '@/features/home/HomeHeader';
import HomeProjectInProgress from '@/features/home/HomeProjectInProgress';
import HomeProjectPending from '@/features/home/HomeProjectPending';
import {HomeResultCard} from '@/features/home/HomeResultCard';
import {LayoutBottomBar} from '@/layouts/LayoutBottomBar';
import {useEffect, useState} from 'react';

const HomePage = () => {
  const [miniResultData, setMiniResultData] =
    useState<GetUserMiniResultResponseDto | null>(null);

  useEffect(() => {
    getUserCard().then(data => {
      const miniData = {
        code: data.code,
        name: data.name,
        numEI: data.ei,
        numPD: data.pd,
        numVA: data.va,
        numCL: data.cl,
      };
      setMiniResultData(miniData);
    });
  }, []);

  if (!miniResultData) {
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
        <HomeResultCard data={miniResultData} />
        <HomeProjectInProgress />
        <HomeProjectPending />
      </div>
    </LayoutBottomBar>
  );
};

export default HomePage;
