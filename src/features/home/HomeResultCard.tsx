import {Link} from 'react-router-dom';
import ContentsCard from './components/ContentsCard';
import {GetUserMiniResultResponseDto} from '@/entities/user/api/dto';

interface HomeResultCardProps {
  data: GetUserMiniResultResponseDto | null;
}

export const HomeResultCard = ({data}: HomeResultCardProps) => {
  return (
    <ContentsCard title="나의 테스트 결과 보러가기" arrowLink="/test">
      <div className="flex mt-4 mb-3 h-[120px]">
        <div className="w-[130px] h-[120px] mr-4 bg-blue-300"></div>
        <div className="flex-1">
          <h4 className="text-[#111] text-lg font-bold leading-6 mb-3">
            아이디어 조율러
          </h4>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <span className="text-xs w-12">외향적</span>
              <div className="relative w-32 h-2 flex-1 rounded-[10px] bg-[#D9D9D9]">
                <div className="absolute left-0 top-0 h-full w-[70%] bg-[#5F4AFF] rounded-[10px]"></div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs w-12">계획적</span>
              <div className="relative w-32 h-2 flex-1 rounded-[10px] bg-[#D9D9D9]">
                <div className="absolute left-0 top-0 h-full w-[65%] bg-[#5F4AFF] rounded-[10px]"></div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs w-12">아이디어</span>
              <div className="relative w-32 h-2 flex-1 rounded-[10px] bg-[#D9D9D9]">
                <div className="absolute left-0 top-0 h-full w-[35%] bg-[#5F4AFF] rounded-[10px]"></div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs w-12">조율형</span>
              <div className="relative w-32 h-2 flex-1 rounded-[10px] bg-[#D9D9D9]">
                <div className="absolute left-0 top-0 h-full w-[25%] bg-[#5F4AFF] rounded-[10px]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-right">
        <Link
          to="/test"
          className="text-[#767676] text-right text-[13px] not-italic font-medium leading-4"
        >
          다시하기
        </Link>
      </div>
    </ContentsCard>
  );
};
