import LayoutMo from '@/layouts/LayoutMo';
import {userQueries} from '@/entities/user/api';
import {useQuery} from '@tanstack/react-query';

interface ResultHistoryPageProps {
  onClose: () => void;
}

const dummyHistory = [
  {
    id: 1,
    date: '2025.05.08',
    title: '반짝이는 아이디어 조율요정',
    image: '/src/assets/images/robot.png',
  },
  {
    id: 2,
    date: '2025.05.02',
    title: '자유를 찾아 떠나는 방랑자',
    image: '/src/assets/images/robot.png',
  },
];

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
        {dummyHistory.map(item => (
          <div
            key={item.id}
            className="flex items-center py-4 border-b border-[#E5E5E5] last:border-b-0"
          >
            <img
              src={item.image}
              alt="캐릭터"
              className="w-[80px] h-[80px] rounded-[18px] bg-[#F7F7FA] object-contain mr-4"
            />
            <div className="flex flex-col flex-1">
              <div className="flex-1 text-left">
                <div className="text-xs text-[#BDBDBD] mb-1">{item.date}</div>
                <div className="text-lg font-medium text-[#111] truncate mb-2">
                  {item.title}
                </div>
              </div>
              <button
                className="ml-auto px-[9px] py-1 w-[70px] h-[28px] border border-gray-2 rounded-[4px] text-gray-5 text-[13px] font-medium bg-white"
                disabled
              >
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
