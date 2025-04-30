import xIcon from '@/assets/xIcon.svg';
import LoginDialog from '@/components/LoginDialog';
import LayoutMo from '@/layouts/LayoutMo';
import {useState} from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';

// 모든 결과 유형 보기 컴포넌트
const ResultAllContent = () => {
  return (
    <div className="flex flex-col items-center mt-1 mb-[67px]">
      <div className="flex flex-col gap-3 w-full">
        {Array.from({length: 16}).map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-4 h-[206px] shadow-sm flex flex-col items-center justify-center"
          >
            <div className="w-16 h-16 rounded-full bg-gray-200 mb-2"></div>
            <div className="text-lg font-medium">
              목표를 향해 돌진하는 로봇 {index + 1}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

interface ResultDefaultContentProps {
  onViewAllClick: () => void;
  onProfileCardClick: () => void;
}

// 기본 결과 컨텐츠 컴포넌트
const ResultDefaultContent = ({
  onViewAllClick,
  onProfileCardClick,
}: ResultDefaultContentProps) => {
  return (
    <div className="flex flex-col items-center mb-[45px]">
      <div className="h-12 flex ml-auto">
        <button aria-label="홈으로 이동">
          <img src={xIcon} alt="홈으로" />
        </button>
      </div>
      <div className="w-full h-[487px] bg-gray-300">img</div>
      <p className="ml-[26px] mr-3 text-[#111]">
        이미지를 꾹 누르면 저장이 돼요
      </p>
      <div className="w-[335px] h-[310px] shrink-0 bg-white mt-3.5 rounded-lg shadow-sm">
        성향카드
      </div>
      <div className="w-full flex gap-[15px] mt-3.5">
        <div className="flex-1 h-40 shrink-0 bg-white rounded-lg shadow-sm">
          잘
        </div>
        <div className="flex-1 h-40 shrink-0 bg-white rounded-lg shadow-sm">
          않
        </div>
      </div>
      <div className="mt-[35px] mb-[31px]">
        <p className="text-lg font-medium">친구에게 공유하기</p>
        <div className="flex gap-4 mt-4 mb-[30px]">
          {[1, 2, 3, 4].map(index => (
            <div
              key={index}
              className="w-[38px] h-[38px] shrink-0 rounded-[50%] bg-yellow-200"
              role="button"
              tabIndex={0}
              aria-label={`공유 옵션 ${index}`}
            />
          ))}
        </div>
        <a
          href="naver.com"
          className="text-primary hover:underline"
          aria-label="홈으로 이동"
        >
          홈으로
        </a>
      </div>
      <div className="w-full flex flex-col gap-2">
        <button
          className="flex h-[54px] justify-center items-center gap-2.5 bg-white self-stretch px-[93px] py-[13px] rounded-[10px] shadow-sm hover:bg-gray-50 transition-colors"
          aria-label="모든 결과 유형보기"
          onClick={onViewAllClick}
        >
          모든 결과 유형보기
        </button>
        <button
          className="flex h-[54px] justify-center items-center gap-2.5 self-stretch bg-[#5F4AFF] px-7 py-[13px] rounded-[10px] text-white hover:bg-[#4a3ad1] transition-colors"
          aria-label="내 캐릭터 토대로 프로필카드 만들기"
          onClick={onProfileCardClick}
        >
          내 캐릭터 토대로 프로필카드 만들기
        </button>
      </div>
    </div>
  );
};

const ResultPage = () => {
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const isDetailAll = searchParams.get('detail') === 'all';

  const handleViewAllResults = () => {
    navigate('/result?detail=all');
  };

  return (
    <>
      {isDetailAll ? (
        <LayoutMo
          bgColor="#F1F2F4"
          hasHeader={isDetailAll}
          text="모든 결과 유형"
        >
          <ResultAllContent />
        </LayoutMo>
      ) : (
        <LayoutMo bgColor="#F1F2F4" hasHeader={isDetailAll}>
          <ResultDefaultContent
            onViewAllClick={handleViewAllResults}
            onProfileCardClick={() => setProfileDialogOpen(true)}
          />
        </LayoutMo>
      )}

      {/* 프로필카드 회원가입 모달 */}
      <LoginDialog
        open={profileDialogOpen}
        onOpenChange={setProfileDialogOpen}
      />
    </>
  );
};

export default ResultPage;
