import LayoutMo from '@/layouts/LayoutMo';
import {userQueries} from '@/entities/user/api';
import {useQuery} from '@tanstack/react-query';

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
            className="flex items-center py-4 border-b border-[#E5E5E5] last:border-b-0"
          >
            <img
              src={item.imgUrl}
              alt={item.name}
              className="w-[80px] h-[80px] rounded-[18px] bg-[#F7F7FA] object-contain mr-4"
            />
            <div className="flex flex-col flex-1">
              <div className="flex-1 text-left">
                {/* 테스트일 임시 제거 */}
                {/* <div className="text-xs text-[#BDBDBD] mb-1">{item.name}</div> */}
                <div className="text-lg font-medium text-[#111] truncate mb-2">
                  {item.name}
                </div>
              </div>
              <button className="ml-auto px-[9px] py-1 w-[70px] h-[28px] border border-gray-2 rounded-[4px] text-gray-5 text-[13px] font-medium bg-white">
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
