import {useQuery} from '@tanstack/react-query';
import {ChevronRight} from 'lucide-react';

import {managerQueries} from '@/entities/manager/api';
import Block from '@/pages/manager/components/Block';

const InProgressBanner = ({isManager}: {isManager: boolean}) => {
  const {data: groupProcess} = useQuery({
    ...managerQueries.groupProcess(),
    enabled: isManager,
  });

  if (isManager) {
    return (
      <Block>
        <div className="text-left">
          <header className="flex items-start justify-between">
            <h2 className="mb-4 text-[28px] leading-9 font-semibold not-italic">
              진행중인 그룹
            </h2>
            <button className="text-gray-5 flex w-[80px] items-center justify-around text-xl leading-7 font-medium">
              더보기
              <ChevronRight className="h-6 w-6" />
            </button>
          </header>
          <div className="flex flex-col gap-[10px]">
            {groupProcess?.slice(0, 3).map(process => (
              <div
                key={process.id}
                className="bg-gray-1 flex h-[56px] items-center rounded-md px-4"
              >
                <h3 className="text-gray-6 text-lg leading-6 font-medium">
                  {process.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </Block>
    );
  }
  return (
    <Block>
      <div className="text-left">
        <h2 className="mb-4 text-[28px] leading-9 font-semibold not-italic">
          진행중인 프로젝트
        </h2>
        <p className="text-center">진행중인 프로젝트가 없어요</p>
      </div>
    </Block>
  );
};
export default InProgressBanner;
