import LoginDialog from '@/components/LoginDialog';
import {getCardById, GetCardResponseDto} from '@/entities/card';
import {CharacterCard} from '@/features/profile/CharacterCard';
import ResultAllType from '@/features/result/ResultAllType';
import TypeDialog from '@/features/result/TypeDialog';
import LayoutMo from '@/layouts/LayoutMo';
import {useToken} from '@/shared/model/auth';
import {testResultAtom} from '@/shared/model/test-result';
import {useAtomValue} from 'jotai';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import ResultHistoryPage from './ResultHistoryPage';

const ResultPage = () => {
  const token = useToken();
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const [cardData, setCardData] = useState<GetCardResponseDto | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isTypeDialogOpen, setIsTypeDialogOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<GetCardResponseDto | null>(
    null,
  );
  const [testSubPage, setTestSubPage] = useState<'ALL_TYPE' | 'HISTORY' | ''>(
    '',
  );

  const navigate = useNavigate();

  // 저장된 테스트 결과 가져오기
  const testResult = useAtomValue(testResultAtom);
  console.log('testResult', testResult);
  // URL의 id와 저장된 결과의 cardId가 일치하는지 확인
  useEffect(() => {
    if (testResult?.cardId) {
      setIsLoading(true);
      setError(null);

      // URL에서 가져온 ID 또는 테스트 결과의 cardId 사용
      const cardId = testResult.cardId;

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
  }, [testResult]);

  const handleViewAllResults = () => {
    setTestSubPage('ALL_TYPE');
  };

  const onProfileCardClick = () => {
    const userInfo = localStorage.getItem('user-info');
    if (userInfo) {
      navigate('/profile');
    } else {
      setProfileDialogOpen(true);
    }
  };

  if (testSubPage === 'ALL_TYPE') {
    return <ResultAllType onClose={() => setTestSubPage('')} />;
  }

  if (testSubPage === 'HISTORY') {
    return <ResultHistoryPage onClose={() => setTestSubPage('')} />;
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
      <LayoutMo bgColor="#F1F2F4">
        <div className="flex flex-col items-center mb-[45px]">
          {/* 0517 제거 고도화시 개선 */}
          {/* <div className="h-12 flex ml-auto">
            <button aria-label="홈으로 이동" onClick={handleClickClose}>
              <img src={xIcon} alt="홈으로" />
            </button>
          </div> */}
          <CharacterCard
            name={cardData.name}
            score={
              testResult
                ? {
                    ei: testResult.numEI,
                    pd: testResult.numPD,
                    cl: testResult.numCL,
                    va: testResult.numVA,
                  }
                : undefined
            }
            tags={{
              topLeft: '검소한',
              topRight: '배려만땅',
              bottomLeft: '친절한',
            }}
          />
          {testResult && (
            <p className="mt-[11px] text-gray-4">
              ▲ 이미지를 꾹 누르면 저장이 돼요 ▲
            </p>
          )}
          <div className="w-full h-[310px] bg-white mt-3.5 px-4 py-[22px] rounded-2xl shadow-sm text-left">
            <b className="block text-xl not-italic font-medium leading-7 mb-[14px]">
              당신은 이런 성향입니다
            </b>
            <p className="break-all">
              {cardData.summary} asdfsffffasdfsffffasdfsffffasdfsffff
              asdfsffffasdfsffffasdfsffffasdfsffffasdfsffffasdfsffffasdfsffffasdfsffff
              asdfsffffasdfsffffasdfsffffasdfsffffasdfsfffff
            </p>
          </div>
          <div className="w-full flex gap-[15px] mt-3.5">
            <div
              className="flex flex-col items-center justify-center flex-1 h-40 shrink-0 bg-white rounded-lg shadow-sm"
              onClick={() => {
                setIsTypeDialogOpen(true);
                setSelectedCard(cardData);
              }}
            >
              <p className="text-[13px] font-medium leading-4">
                이런 캐릭터와 맞아요
              </p>
              <img
                src="/src/assets/images/robot.png"
                alt="로봇 캐릭터"
                className="w-[70px] h-[70px] mt-1 mb-2"
              />
              <b>{cardData.bestMatchCode1}</b>
            </div>
            <div
              className="flex flex-col items-center justify-center flex-1 h-40 shrink-0 bg-white rounded-lg shadow-sm"
              onClick={() => {
                setIsTypeDialogOpen(true);
                setSelectedCard(cardData);
              }}
            >
              <p className="text-[13px] font-medium leading-4">
                이런 캐릭터와 맞지 않아요
              </p>
              <img
                src="/src/assets/images/robot.png"
                alt="로봇 캐릭터"
                className="w-[70px] h-[70px] mt-1 mb-2"
              />
              <b>{cardData.worstMatchCode1}</b>
            </div>
          </div>

          <div className="mt-[35px] mb-[31px]">
            {/* TODO: 보류 */}
            {/* <p className="text-[13px] font-medium leading-4">
              친구에게 공유하기
            </p>
            <div className="flex gap-4 mt-4 mb-[30px]">
              {[1, 2, 3, 4].map(index => (
                <div
                  key={index}
                  className="w-[38px] h-[38px] shrink-0 rounded-[50%] bg-yellow-200"
                  role="button"
                  tabIndex={0}
                />
              ))}
            </div> */}
            <div>
              <a
                href="/test"
                className="text-[13px] font-medium leading-4"
                aria-label="재검사하기"
              >
                재검사하기
              </a>
              {token && (
                <button
                  onClick={() => setTestSubPage('HISTORY')}
                  className="text-[13px] font-medium leading-4 before:content-['•'] before:text-gray-3 before:mx-1 before:text-[13px]"
                  aria-label="히스토리"
                >
                  히스토리
                </button>
              )}
            </div>
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

      <TypeDialog
        open={isTypeDialogOpen}
        onOpenChange={setIsTypeDialogOpen}
        card={selectedCard ?? undefined}
      />

      {/* 프로필카드 회원가입 모달 */}
      <LoginDialog
        open={profileDialogOpen}
        onOpenChange={setProfileDialogOpen}
      />
    </>
  );
};

export default ResultPage;
