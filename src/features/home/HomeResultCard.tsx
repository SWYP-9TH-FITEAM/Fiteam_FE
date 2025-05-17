import {GetUserMiniResultResponseDto} from '@/entities/user/api/dto';
import {Link} from 'react-router-dom';
import ContentsCard from './components/ContentsCard';

interface HomeResultCardProps {
  data: GetUserMiniResultResponseDto;
}

export const HomeResultCard = ({data}: HomeResultCardProps) => {
  const THRESHOLD = 37.5;

  const eiType = data.numEI > THRESHOLD ? '외향형' : '내향형';
  const pdType = data.numPD > THRESHOLD ? '계획형' : '실행형';
  const clType = data.numCL > THRESHOLD ? '창의형' : '분석형';
  const vaType = data.numVA > THRESHOLD ? '조율형' : '주도형';

  return (
    <ContentsCard title="나의 테스트 결과 보러가기" arrowLink={`/result`}>
      <div className="flex mt-4 mb-3 h-[120px]">
        <div className="w-[130px] h-[120px] mr-4 bg-blue-300"></div>
        <div className="flex-1">
          <h4 className="text-[#111] text-lg font-bold leading-6 mb-3">
            {data.name}
          </h4>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <span className="text-xs w-12">{eiType}</span>
              <div className="relative w-32 h-2 flex-1 rounded-[10px] bg-[#D9D9D9]">
                <div
                  className="absolute left-0 top-0 h-full bg-[#5F4AFF] rounded-[10px]"
                  style={{width: `${(data.numEI / 75) * 100}%`}}
                ></div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs w-12">{pdType}</span>
              <div className="relative w-32 h-2 flex-1 rounded-[10px] bg-[#D9D9D9]">
                <div
                  className="absolute left-0 top-0 h-full bg-[#5F4AFF] rounded-[10px]"
                  style={{width: `${(data.numPD / 75) * 100}%`}}
                ></div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs w-12">{clType}</span>
              <div className="relative w-32 h-2 flex-1 rounded-[10px] bg-[#D9D9D9]">
                <div
                  className="absolute left-0 top-0 h-full bg-[#5F4AFF] rounded-[10px]"
                  style={{width: `${(data.numCL / 75) * 100}%`}}
                ></div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs w-12">{vaType}</span>
              <div className="relative w-32 h-2 flex-1 rounded-[10px] bg-[#D9D9D9]">
                <div
                  className="absolute left-0 top-0 h-full bg-[#5F4AFF] rounded-[10px]"
                  style={{width: `${(data.numVA / 75) * 100}%`}}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-right">
        <Link
          to="/test/start"
          className="text-[#767676] text-right text-[13px] not-italic font-medium leading-4"
        >
          다시하기
        </Link>
      </div>
    </ContentsCard>
  );
};
