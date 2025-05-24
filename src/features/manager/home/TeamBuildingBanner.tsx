import {ChevronRight} from 'lucide-react';

import Block from '@/pages/manager/components/Block';

const TeamBuildingBanner = () => {
  return (
    <Block>
      <div className="flex h-full flex-1 flex-col text-left">
        <header className="flex items-start justify-between">
          <h2 className="mb-4 text-[28px] leading-9 font-semibold not-italic">
            팀 빌딩
          </h2>
          <button className="text-gray-5 flex w-[134px] items-center justify-around text-xl leading-7 font-medium">
            새로 시작하기
            <ChevronRight className="h-6 w-6" />
          </button>
        </header>
        <div>
          <p className="text-gray-6 text-2xl leading-8 font-semibold not-italic">
            실시간 진행중인 팀 빌딩 확인
          </p>
        </div>
        <button className="bg-primary mt-auto inline-flex h-[52px] w-[296px] items-center justify-center rounded-md px-10 py-0 text-white">
          자세히 보기
        </button>
      </div>
    </Block>
  );
};

export default TeamBuildingBanner;
