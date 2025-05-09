import React from 'react';

interface CharacterCardProps {
  characterName: string;
  characterType: string;
  traits: string[];
}

const CharacterCard: React.FC<CharacterCardProps> = ({
  characterName,
  characterType,
  traits = [],
}) => {
  return (
    <div className="relative w-full rounded-[20px] border-2 border-primary bg-[#F1F2FB] overflow-hidden shadow-sm">
      {/* 별 아이콘 (우측 상단) */}
      <div className="absolute top-3 right-3">
        <div className="w-5 h-5 text-[#FFAD40]">
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>
      </div>

      {/* 캐릭터 이름 */}
      <div className="px-4 pt-5 pb-3 text-center">
        <h1 className="text-[30px] font-bold text-[#111] tracking-tight leading-[1.2em]">
          {characterName}
        </h1>
      </div>

      {/* 캐릭터 이미지 영역 */}
      <div className="relative w-full aspect-square bg-white flex justify-center items-center">
        <div className="absolute top-3 left-3 py-1 px-3 bg-[#EEECFF] rounded-lg">
          <span className="text-sm text-primary font-medium">
            {characterType}
          </span>
        </div>
        {/* 여기에 캐릭터 이미지가 들어갈 수 있음 */}
      </div>

      {/* 캐릭터 유형 표시 영역 */}
      <div className="bg-[#EEECFF] px-4 py-3">
        <div className="text-center mb-3">
          <span className="text-primary font-medium">나의 성향</span>
        </div>

        {/* 성향 그래프 영역 */}
        <div className="mb-5">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-[#767676]">내향형</span>
            {/* 성향 바 */}
            <div className="w-44 h-2.5 bg-[#D9D9D9] rounded-[10px] mx-3 relative overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#9182FF] via-[#5F4AFF] to-[#4432CE] rounded-[10px]"
                style={{width: '60%'}}
              ></div>
            </div>
            <span className="text-xs text-[#111]">외향형</span>
          </div>

          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-[#111]">계획형</span>
            {/* 성향 바 */}
            <div className="w-44 h-2.5 bg-[#D9D9D9] rounded-[10px] mx-3 relative overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#9182FF] via-[#5F4AFF] to-[#4432CE] rounded-[10px]"
                style={{width: '45%'}}
              ></div>
            </div>
            <span className="text-xs text-[#767676]">창의형</span>
          </div>

          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-[#111]">조율형</span>
            {/* 성향 바 */}
            <div className="w-44 h-2.5 bg-[#D9D9D9] rounded-[10px] mx-3 relative overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#9182FF] via-[#5F4AFF] to-[#4432CE] rounded-[10px]"
                style={{width: '75%'}}
              ></div>
            </div>
            <span className="text-xs text-[#767676]">분석형</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-xs text-[#767676]">실행형</span>
            {/* 성향 바 */}
            <div className="w-44 h-2.5 bg-[#D9D9D9] rounded-[10px] mx-3 relative overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#9182FF] via-[#5F4AFF] to-[#4432CE] rounded-[10px]"
                style={{width: '30%'}}
              ></div>
            </div>
            <span className="text-xs text-[#111]">주도형</span>
          </div>
        </div>

        {/* 성향 태그 */}
        <div className="flex flex-wrap gap-2 justify-center mb-4">
          {traits.map((trait, index) => (
            <div
              key={index}
              className="px-[18px] py-[3px] bg-white text-[#111] text-base font-medium rounded-lg shadow-[0px_0px_2px_0px_rgba(154,154,154,1)]"
            >
              {trait}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;
