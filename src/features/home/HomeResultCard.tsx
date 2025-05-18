import type {GetUserMiniResultResponseDto} from '@/entities/user/api/dto';

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
      <div className="mt-4 mb-3 flex h-[120px]">
        <div className="mr-4 h-[120px] w-[130px] bg-blue-300"></div>
        <div className="flex-1">
          <h4 className="mb-3 text-lg leading-6 font-bold text-[#111]">
            {data.name}
          </h4>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <span className="w-12 text-xs">{eiType}</span>
              <div className="relative h-2 w-32 flex-1 rounded-[10px] bg-[#D9D9D9]">
                <div
                  className="absolute top-0 left-0 h-full rounded-[10px] bg-[#5F4AFF]"
                  style={{width: `${(data.numEI / 75) * 100}%`}}
                ></div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-12 text-xs">{pdType}</span>
              <div className="relative h-2 w-32 flex-1 rounded-[10px] bg-[#D9D9D9]">
                <div
                  className="absolute top-0 left-0 h-full rounded-[10px] bg-[#5F4AFF]"
                  style={{width: `${(data.numPD / 75) * 100}%`}}
                ></div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-12 text-xs">{clType}</span>
              <div className="relative h-2 w-32 flex-1 rounded-[10px] bg-[#D9D9D9]">
                <div
                  className="absolute top-0 left-0 h-full rounded-[10px] bg-[#5F4AFF]"
                  style={{width: `${(data.numCL / 75) * 100}%`}}
                ></div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-12 text-xs">{vaType}</span>
              <div className="relative h-2 w-32 flex-1 rounded-[10px] bg-[#D9D9D9]">
                <div
                  className="absolute top-0 left-0 h-full rounded-[10px] bg-[#5F4AFF]"
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
          className="text-right text-[13px] leading-4 font-medium text-[#767676] not-italic"
        >
          다시하기
        </Link>
      </div>
    </ContentsCard>
  );
};
