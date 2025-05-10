import xIcon from '@/assets/xIcon.svg';
import LoginDialog from '@/components/LoginDialog';
import ResultAllType from '@/features/result/ResultAllType';
import LayoutMo from '@/layouts/LayoutMo';
import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useAtomValue} from 'jotai';
import {testResultAtom} from '@/shared/model/test-result';
import {getCardById, GetCardResponseDto} from '@/entities/card';

const ResultPage = () => {
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const [cardData, setCardData] = useState<GetCardResponseDto | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const {id} = useParams();
  const isResultAll = id === 'all';

  // 저장된 테스트 결과 가져오기
  const testResult = useAtomValue(testResultAtom);

  // URL의 id와 저장된 결과의 cardId가 일치하는지 확인
  useEffect(() => {
    if (!isResultAll && id) {
      setIsLoading(true);
      setError(null);

      // URL에서 가져온 ID 또는 테스트 결과의 cardId 사용
      const cardId = parseInt(id, 10);

      if (isNaN(cardId)) {
        setError('유효하지 않은 카드 ID입니다.');
        setIsLoading(false);
        return;
      }

      // 카드 데이터 가져오기
      getCardById(cardId)
        .then(data => {
          setCardData(data);
          setIsLoading(false);
        })
        .catch(err => {
          console.error('카드 정보를 가져오는 중 오류가 발생했습니다:', err);
          setError('카드 정보를 가져오는 중 오류가 발생했습니다.');
          setIsLoading(false);
        });
    }
  }, [testResult, id, isResultAll]);

  const handleViewAllResults = () => {
    navigate('/result/all');
  };

  const onProfileCardClick = () => {
    setProfileDialogOpen(true);
  };

  if (isResultAll) {
    return <ResultAllType />;
  }

  if (isLoading) {
    return (
      <LayoutMo hasHeader={true}>
        <div className="flex flex-col h-full items-center justify-center">
          <p>결과를 불러오는 중입니다...</p>
        </div>
      </LayoutMo>
    );
  }

  if (error) {
    return (
      <LayoutMo hasHeader={true}>
        <div className="flex flex-col h-full items-center justify-center">
          <p>{error}</p>
          <button
            className="mt-4 px-4 py-2 bg-primary text-white rounded-md"
            onClick={() => navigate('/test')}
          >
            테스트 다시하기
          </button>
        </div>
      </LayoutMo>
    );
  }

  if (!cardData) {
    return (
      <LayoutMo hasHeader={true}>
        <div className="flex flex-col h-full items-center justify-center">
          <p>결과를 찾을 수 없습니다.</p>
          <button
            className="mt-4 px-4 py-2 bg-primary text-white rounded-md"
            onClick={() => navigate('/test')}
          >
            테스트 다시하기
          </button>
        </div>
      </LayoutMo>
    );
  }

  // 나머지 렌더링 코드
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
              aria-label="재검사하기"
            >
              재검사하기
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
