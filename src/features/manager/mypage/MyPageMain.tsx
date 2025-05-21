import {useManagerInfo} from '@/shared/model/manager';

const MyPageMain = () => {
  const managerInfo = useManagerInfo();

  return (
    <div>
      {/* 상단 프로필 박스 */}
      <div className="mb-6 flex items-center rounded-[12px] bg-white px-10 py-8 shadow-sm">
        <div className="flex h-[120px] w-[120px] flex-shrink-0 items-center justify-center">
          {/* 캐릭터 이미지 (src는 실제 경로로 교체) */}
          <img
            src="/images/character.png"
            alt={managerInfo?.managerName}
            width={120}
            height={120}
            className="object-contain"
          />
        </div>
        <div className="mb-1 ml-8 text-[28px] leading-8 font-semibold">
          {managerInfo?.managerName} 님
          <span className="ml-2 text-[18px] font-normal text-[#757575]">
            매니저
          </span>
        </div>
      </div>

      {/* 최근 활동 박스 */}
      <div className="bg-gray-2 mb-20 rounded-[12px] px-8 py-7 text-left">
        <div className="mb-4 text-lg font-semibold">최근 활동</div>
        <ul className="space-y-2 text-base text-[#222]">
          <li>공지 : '팀 일정 안내' 발송 완료</li>
          <li>공지 : '팀 일정 안내' 발송 완료</li>
          <li>팀: '팀 C' 생성 완료</li>
        </ul>
      </div>

      {/* 하단 버튼 3개 */}
      <div className="flex gap-6">
        <button className="bg-gray-2 h-[56px] flex-1 rounded-[12px] text-lg font-medium text-[#222] transition-colors hover:bg-[#e0e0e0]">
          새 그룹 만들기
        </button>
        <button className="bg-gray-2 h-[56px] flex-1 rounded-[12px] text-lg font-medium text-[#222] transition-colors hover:bg-[#e0e0e0]">
          진행 중인 그룹 현황 보기
        </button>
        <button className="bg-gray-2 h-[56px] flex-1 rounded-[12px] text-lg font-medium text-[#222] transition-colors hover:bg-[#e0e0e0]">
          1:1 채팅방 가기
        </button>
      </div>
    </div>
  );
};

export default MyPageMain;
