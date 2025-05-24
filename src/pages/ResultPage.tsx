import type {GetCardResponseDto} from '@/entities/card';

import {useEffect, useRef, useState} from 'react';
import html2canvas from 'html2canvas-pro';
import {useAtomValue} from 'jotai';
import {useNavigate} from 'react-router-dom';

import LoginDialog from '@/components/LoginDialog';
import {getCardById} from '@/entities/card';
import {CharacterCard} from '@/features/profile/CharacterCard';
import ResultAllType from '@/features/result/ResultAllType';
import TypeDialog from '@/features/result/TypeDialog';
import LayoutMo from '@/layouts/LayoutMo';
import {useToken} from '@/shared/model/auth';
import {testResultAtom} from '@/shared/model/test-result';
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
  const cardRef = useRef<HTMLDivElement>(null);

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

  const handleSaveImage = async () => {
    if (!cardRef.current) return;
    const canvas = await html2canvas(cardRef.current);
    const dataUrl = canvas.toDataURL('image/png');
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      // 임시 HTML 페이지 생성
      const html = `
        <html>
          <head>
            <meta charset="UTF-8" />
          </head>
          <body style="margin:0;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;background:#fff;">
            <img src="${dataUrl}" style="max-width:100vw;max-height:80vh;"/>
            <p style="font-size:18px;color:#333;margin-top:16px;">이미지를 꾹 눌러 저장하세요!</p>
          </body>
        </html>
      `;
      const blob = new Blob([html], {type: 'text/html'});
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
    } else {
      // PC에서는 자동 다운로드
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'character-card.png';
      link.click();
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
        <div className="flex h-full flex-col items-center justify-center">
          <p>결과를 불러오는 중입니다...</p>
        </div>
      </LayoutMo>
    );
  }

  if (error) {
    return (
      <LayoutMo hasHeader={true}>
        <div className="flex h-full flex-col items-center justify-center">
          <p>{error}</p>
          <button
            className="bg-primary mt-4 rounded-md px-4 py-2 text-white"
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
        <div className="flex h-full flex-col items-center justify-center">
          <p>결과를 찾을 수 없습니다.</p>
          <button
            className="bg-primary mt-4 rounded-md px-4 py-2 text-white"
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
        <div className="mb-[45px] flex flex-col items-center">
          {/* 0517 제거 고도화시 개선 */}
          {/* <div className="h-12 flex ml-auto">
            <button aria-label="홈으로 이동" onClick={handleClickClose}>
              <img src={xIcon} alt="홈으로" />
            </button>
          </div> */}
          <CharacterCard
            ref={cardRef}
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
            onClick={handleSaveImage}
          />
          <p className="text-gray-4 mt-[11px]" onClick={handleSaveImage}>
            ▲ 이미지를 꾹 누르면 저장이 돼요 ▲
          </p>

          <div className="mt-3.5 h-[310px] w-full rounded-2xl bg-white px-4 py-[22px] text-left shadow-sm">
            <b className="mb-[14px] block text-xl leading-7 font-medium not-italic">
              당신은 이런 성향입니다
            </b>
            <p className="break-all">
              {cardData.summary} asdfsffffasdfsffffasdfsffffasdfsffff
              asdfsffffasdfsffffasdfsffffasdfsffffasdfsffffasdfsffffasdfsffffasdfsffff
              asdfsffffasdfsffffasdfsffffasdfsffffasdfsfffff
            </p>
          </div>
          <div className="mt-3.5 flex w-full gap-[15px]">
            <div
              className="flex h-40 flex-1 shrink-0 flex-col items-center justify-center rounded-lg bg-white shadow-sm"
              onClick={() => {
                setIsTypeDialogOpen(true);
                setSelectedCard(cardData);
              }}
            >
              <p className="text-[13px] leading-4 font-medium">
                이런 캐릭터와 맞아요
              </p>
              <img
                src="/src/assets/images/robot.png"
                alt="로봇 캐릭터"
                className="mt-1 mb-2 h-[70px] w-[70px]"
              />
              <b>{cardData.bestMatchCode1}</b>
            </div>
            <div
              className="flex h-40 flex-1 shrink-0 flex-col items-center justify-center rounded-lg bg-white shadow-sm"
              onClick={() => {
                setIsTypeDialogOpen(true);
                setSelectedCard(cardData);
              }}
            >
              <p className="text-[13px] leading-4 font-medium">
                이런 캐릭터와 맞지 않아요
              </p>
              <img
                src="/src/assets/images/robot.png"
                alt="로봇 캐릭터"
                className="mt-1 mb-2 h-[70px] w-[70px]"
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
                className="text-[13px] leading-4 font-medium"
                aria-label="재검사하기"
              >
                재검사하기
              </a>
              {token && (
                <button
                  onClick={() => setTestSubPage('HISTORY')}
                  className="before:text-gray-3 text-[13px] leading-4 font-medium before:mx-1 before:text-[13px] before:content-['•']"
                  aria-label="히스토리"
                >
                  히스토리
                </button>
              )}
            </div>
          </div>

          <div className="flex w-full flex-col gap-2">
            <button
              className="flex h-[54px] items-center justify-center gap-2.5 self-stretch rounded-[10px] bg-white px-[93px] py-[13px] shadow-sm transition-colors hover:bg-gray-50"
              aria-label="모든 결과 유형보기"
              onClick={handleViewAllResults}
            >
              모든 결과 유형보기
            </button>
            <button
              className="bg-primary hover:bg-primary/90 flex h-[54px] items-center justify-center gap-2.5 self-stretch rounded-[10px] px-7 py-[13px] text-white transition-colors"
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
