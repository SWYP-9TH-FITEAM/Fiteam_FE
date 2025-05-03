import xIcon from '@/assets/xIcon.svg';
import LoginDialog from '@/components/LoginDialog';
import ResultAllType from '@/features/result/ResultAllType';
import LayoutMo from '@/layouts/LayoutMo';
import {useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

const ResultPage = () => {
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
  const isResultAll = id === 'all';

  const handleViewAllResults = () => {
    navigate('/result/all');
  };

  const onProfileCardClick = () => {
    setProfileDialogOpen(true);
  };

  if (isResultAll) {
    return <ResultAllType />;
  }
  return (
    <>
      <LayoutMo bgColor="#F1F2F4" hasHeader={isResultAll}>
        <div className="flex flex-col items-center mb-[45px]">
          <div className="h-12 flex ml-auto">
            <button aria-label="홈으로 이동">
              <img src={xIcon} alt="홈으로" />
            </button>
          </div>
          <div className="w-full h-[487px] bg-gray-300">유형 {id}</div>
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
                />
              ))}
            </div>
            <a
              href="/"
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
              onClick={handleViewAllResults}
            >
              모든 결과 유형보기
            </button>
            <button
              className="flex h-[54px] justify-center items-center gap-2.5 self-stretch bg-primary px-7 py-[13px] rounded-[10px] text-white hover:bg-primary/90 transition-colors"
              aria-label="내 캐릭터 토대로 프로필카드 만들기"
              onClick={onProfileCardClick}
            >
              내 캐릭터 토대로 프로필카드 만들기
            </button>
          </div>
        </div>
      </LayoutMo>

      {/* 프로필카드 회원가입 모달 */}
      <LoginDialog
        open={profileDialogOpen}
        onOpenChange={setProfileDialogOpen}
      />
    </>
  );
};

export default ResultPage;
