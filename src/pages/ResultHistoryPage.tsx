import {useQuery} from '@tanstack/react-query';

import {userQueries} from '@/entities/user/api';
import LayoutMo from '@/layouts/LayoutMo';

interface ResultHistoryPageProps {
  onClose: () => void;
}

const ResultHistoryPage = ({onClose}: ResultHistoryPageProps) => {
  const {data: cardIdsData} = useQuery(userQueries.cardIds());

  console.log(cardIdsData);

  return (
    <LayoutMo
      hasHeader={true}
      text="테스트 히스토리"
      onClickBack={onClose}
      bgColor="white"
    >
      <div className="flex flex-col gap-2 px-2">
        {cardIdsData?.map((item, index) => (
          <div
            key={`${item.code}-${index}`}
            className="flex items-center border-b border-[#E5E5E5] py-4 last:border-b-0"
          >
            <img
              src={item.imgUrl}
              alt={item.name}
              className="mr-4 h-[80px] w-[80px] rounded-[18px] bg-[#F7F7FA] object-contain"
            />
            <div className="flex flex-1 flex-col">
              <div className="flex-1 text-left">
                {/* 테스트일 임시 제거 */}
                {/* <div className="text-xs text-[#BDBDBD] mb-1">{item.name}</div> */}
                <div className="mb-2 truncate text-lg font-medium text-[#111]">
                  {item.name}
                </div>
              </div>
              <button className="border-gray-2 text-gray-5 ml-auto h-[28px] w-[70px] rounded-[4px] border bg-white px-[9px] py-1 text-[13px] font-medium">
                결과 보기
              </button>
            </div>
          </div>
        ))}
      </div>
    </LayoutMo>
  );
};

export default ResultHistoryPage;
