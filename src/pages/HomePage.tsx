import {
  getUserCard,
  GetUserMiniResultResponseDto,
  getUserNameImgJob,
  GetUserNameImgJobResponseDto,
} from '@/entities/user/api';
import ContentsCard from '@/features/home/components/ContentsCard';
import {HomeHeader} from '@/features/home/HomeHeader';
import HomeProfile from '@/features/home/HomeProfile';
import HomeProjectList from '@/features/home/HomeProjectList';
import {HomeResultCard} from '@/features/home/HomeResultCard';
import {LayoutBottomBar} from '@/layouts/LayoutBottomBar';
import {useEffect, useState} from 'react';

const HomePage = () => {
  const isLogin = true; //TODO: 로그인 . props를 넘길지, 전역관리할지

  const [miniResultData, setMiniResultData] =
    useState<GetUserMiniResultResponseDto | null>(null);
  const [userNameImgJob, setUserNameImgJob] =
    useState<GetUserNameImgJobResponseDto | null>(null);

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
    getUserNameImgJob().then(data => {
      setUserNameImgJob(data);
    });
  }, []);

  if (!miniResultData) {
    return (
      <LayoutBottomBar classNames={{wrapper: 'bg-[#f1f2f4]'}}>
        <HomeHeader />
        <ContentsCard>
          <div className="flex flex-col gap-5 mt-[92px] mb-[128px] text-center">
            <div className="text-[#111] text-lg font-bold leading-6">
              아직 테스트를 하지 않으셨네요
            </div>
            <button className="flex h-12 justify-center items-center bg-[#5F4AFF] rounded-[10px] text-white font-medium leading-6">
              테스트하고 내 성향 파악하기
            </button>
          </div>
        </ContentsCard>
      </LayoutBottomBar>
    );
  }

  return (
    <LayoutBottomBar classNames={{wrapper: 'bg-[#f1f2f4]'}}>
      <HomeHeader />
      <div className="flex flex-col gap-4 pb-4">
        <HomeResultCard data={miniResultData} />
        <HomeProfile isLogin={isLogin} profileData={userNameImgJob} />
        <HomeProjectList isLogin={isLogin} />
      </div>
    </LayoutBottomBar>
  );
};

export default HomePage;
