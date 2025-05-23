import type {TestResultResponse} from '@/entities/question/api/create-question';
import type {
  GetQuestionsResponseDto,
  QuestionScore,
} from '@/entities/question/api/dto';

import {useEffect, useRef, useState} from 'react';
import {useSetAtom} from 'jotai';
import {useNavigate} from 'react-router-dom';

import robot from '@/assets/images/robot.png';
import {
  getAllQuestions,
  postTestResult,
} from '@/entities/question/api/create-question';
import {postSaveCard} from '@/entities/user/api/savecard';
import TestPageHeader from '@/features/test/TestPageHeader';
import LayoutMo from '@/layouts/LayoutMo';
import {LayoutMobile} from '@/layouts/LayoutMobile';
import {testResultAtom} from '@/shared/model/test-result';

const OPTIONS = [
  {label: '매우 그렇다', score: 5},
  {label: '그렇다', score: 4},
  {label: '중간이다', score: 3},
  {label: '아니다', score: 2},
  {label: '매우 아니다', score: 1},
];

const LOADING_DURATION = 2000; // 2초 동안 로딩 애니메이션 진행

interface TestResultLoadingProps {
  apiPromise: Promise<TestResultResponse | null>;
  onDone: (result: TestResultResponse | null) => void;
}

function TestResultLoading({apiPromise, onDone}: TestResultLoadingProps) {
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    const startTime = Date.now();

    // 부드러운 애니메이션을 위한 interval
    intervalRef.current = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const newProgress = Math.min(
        Math.floor((elapsedTime / LOADING_DURATION) * 100),
        99,
      );
      setProgress(newProgress);
    }, 50);

    // API 응답을 기다림
    apiPromise.then(result => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setProgress(100);
      setTimeout(() => {
        onDone(result);
      }, 500); // 100%에 도달한 후 약간의 지연
    });

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [apiPromise, onDone]);

  // 원형 프로그레스 계산
  const circumference = 2 * Math.PI * 50; // 반지름이 50인 원의 둘레
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex h-full min-h-[812px] flex-col items-center justify-center gap-7">
      <div className="text-center">
        <p className="text-gray-6 text-center text-xl leading-7 font-medium">
          결과를 취합중입니다
        </p>
        <p className="text-dark text-center text-[28px] leading-9 font-semibold">
          잠시만 기다려주세요 !
        </p>
      </div>

      <div className="relative h-[185px] w-[185px]">
        {/* 가장 바깥쪽 테두리 원 - #EEECFF 색상, 지름 185px */}
        <div className="absolute inset-0 rounded-full bg-[#EEECFF]"></div>

        {/* 하얀색 원 - 지름 179px */}
        <div className="absolute top-1/2 left-1/2 h-[171px] w-[171px] -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-white"></div>

        {/* 진행 상태 원형 UI */}
        <div className="absolute top-1/2 left-1/2 h-[160px] w-[160px] -translate-x-1/2 -translate-y-1/2 transform">
          {/* 회색 원형 트랙 */}
          <svg
            className="absolute inset-0 h-full w-full -rotate-90"
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="47"
              fill="none"
              stroke="#D9D9D9"
              strokeWidth="6"
            />
          </svg>

          {/* 진행 원 */}
          <svg
            className="absolute inset-0 h-full w-full -rotate-90"
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="47"
              fill="none"
              stroke="#5F4AFF"
              strokeWidth="6"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-300 ease-out"
            />
          </svg>
        </div>

        {/* 로봇 이미지 - 중앙 배치 */}
        <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 transform items-center justify-center">
          <img src={robot} alt="로봇" className="h-16 w-16" />
        </div>

        {/* 퍼센트 숫자 - 하단 배치 */}
        <div className="absolute inset-x-0 bottom-8 flex justify-center">
          <span className="text-primary items-center text-center text-[40px] leading-[48px] font-bold">
            {progress}
          </span>
          <span className="text-gray-6 text-center text-base leading-6 font-medium">
            %
          </span>
        </div>
      </div>
    </div>
  );
}

const TestPage = () => {
  const navigate = useNavigate();
  const setTestResult = useSetAtom(testResultAtom);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testScore, setTestScore] = useState<QuestionScore[]>([]); // 각 문항별 MBTI 점수를 저장
  const [questions, setQuestions] = useState<GetQuestionsResponseDto>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiPromise, setApiPromise] =
    useState<Promise<TestResultResponse | null> | null>(null);
  const [isQuestionsLoading, setIsQuestionsLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await getAllQuestions();
        setQuestions(data);
      } catch (error) {
        console.error('문제 목록을 불러오는데 실패했습니다.', error);
      } finally {
        setIsQuestionsLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  // 실제 API를 호출하는 함수
  const fetchResultApi = async (scores: QuestionScore[]) => {
    try {
      console.log('API 호출 전 scores:', scores);
      localStorage.setItem('test-scores', JSON.stringify(scores));
      // 서버 응답 시간을 고려하여 최소 로딩 시간 보장
      const startTime = Date.now();
      const result = await postTestResult({scores});
      const userInfo = localStorage.getItem('user-info');
      if (userInfo) {
        const parsedUserInfo = JSON.parse(userInfo);
        if (parsedUserInfo) {
          await postSaveCard({scores});
        }
      }

      // 최소 로딩 시간이 LOADING_DURATION보다 짧으면 추가 대기
      const elapsedTime = Date.now() - startTime;
      if (elapsedTime < LOADING_DURATION) {
        await new Promise(resolve =>
          setTimeout(resolve, LOADING_DURATION - elapsedTime),
        );
      }

      console.log('API 응답 결과:', result);
      return result;
    } catch (error) {
      console.error('테스트 결과 제출에 실패했습니다:', error);

      // 에러 세부 정보 로깅
      if (error instanceof Error) {
        console.error('에러 메시지:', error.message);
        console.error('에러 스택:', error.stack);
      } else {
        console.error('알 수 없는 에러 형식:', error);
      }

      // 에러 응답 분석 시도
      try {
        const errorObj = error as {response?: Response};
        if (errorObj.response) {
          console.error('에러 응답:', await errorObj.response.json());
        }
      } catch (parseError) {
        console.error('에러 응답 파싱 실패:', parseError);
      }

      // 실패해도 로딩은 완료되도록 대기
      await new Promise(resolve => setTimeout(resolve, LOADING_DURATION));

      // TODO: 응답 에러인 경우 처리 수정필요
      // 에러 상황에서는 폴백 응답 대신 null을 반환하여 에러 처리 로직이 실행되도록 함
      return null;
    }
  };

  const handleSelectOption = async (optionIdx: number) => {
    // 선택한 옵션에 해당하는 점수
    const selectedScore = OPTIONS[optionIdx].score;

    // 현재 질문의 typeA와 typeB 가져오기
    const currentQuestion = questions[currentIndex];
    const {typeA, typeB} = currentQuestion;

    // typeA와 typeB에 대한 점수 계산
    // typeA는 선택한 점수만큼, typeB는 (5 - typeA의 점수)만큼 부여 (합쳐서 0이 되도록 (5→0, 4→1, 3→2, 2→3, 1→4))
    const typeAScore = selectedScore;
    const typeBScore = 5 - typeAScore;

    // 새로운 점수 객체 생성
    const newScore: QuestionScore = {
      [typeA]: typeAScore,
      [typeB]: typeBScore,
    };

    // testScore 업데이트
    setTestScore(prev => [...prev, newScore]);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsLoading(true);
      // 모든 문항이 완료된 경우, 최종 점수와 함께 API 호출
      const updatedScores = [...testScore, newScore];
      const promise = fetchResultApi(updatedScores);
      setApiPromise(promise);
    }
  };

  const handleClickBack = () => {
    if (currentIndex > 0) {
      // 마지막 점수 항목 제거
      setTestScore(prev => prev.slice(0, -1));
      // 이전 질문으로 이동
      setCurrentIndex(prev => prev - 1);
    } else {
      // 첫 번째 질문에서는 일반적인 뒤로가기 동작 수행
      navigate(-1);
    }
  };

  const handleLoadingDone = (result: TestResultResponse | null) => {
    // 서버에서 받은 cardId를 사용하여 결과 페이지로 이동
    console.log('최종 테스트 결과:', result);

    // TODO: 응답 에러인 경우 처리 수정필요
    if (result === null) {
      // API 응답 실패 시 /test로 리다이렉트
      alert('테스트 결과 처리 중 오류가 발생했습니다. 다시 시도해주세요.');
      navigate('/test');
      return;
    }

    // 테스트 결과를 atom에 저장
    setTestResult(result);

    // 결과 페이지로 이동
    navigate('/result');
  };

  const progressPercent =
    questions.length > 0 ? (currentIndex / questions.length) * 100 : 0;

  if (isQuestionsLoading) {
    return (
      <LayoutMo hasHeader={true}>
        <div className="flex h-full flex-col items-center justify-center">
          <p>문제를 불러오는 중입니다...</p>
        </div>
      </LayoutMo>
    );
  }

  if (isLoading && apiPromise) {
    return (
      <LayoutMo hasHeader={false}>
        <TestResultLoading apiPromise={apiPromise} onDone={handleLoadingDone} />
      </LayoutMo>
    );
  }

  if (questions.length === 0) {
    return (
      <LayoutMo hasHeader={true}>
        <div className="flex h-full flex-col items-center justify-center">
          <p>문제를 불러오지 못했습니다. 다시 시도해주세요.</p>
        </div>
      </LayoutMo>
    );
  }

  return (
    <LayoutMobile header={<TestPageHeader onClickBack={handleClickBack} />}>
      <div className="flex h-full flex-col">
        <div className="flex items-center pt-2">
          <div className="flex-1">
            <div className="bg-gray-3 h-2 w-full rounded">
              <div
                className="bg-primary h-2 rounded"
                style={{width: `${progressPercent}%`}}
              />
            </div>
          </div>
        </div>
        <div className="mt-14 mb-24 flex flex-col items-center justify-center gap-5">
          <div className="bg-gray-1 h-[26px] w-[26px] rounded-[13px] text-base font-medium">
            {currentIndex + 1}
          </div>
          <p className="h-[126px] w-full text-[28px] font-semibold break-keep whitespace-pre-line">
            {questions[currentIndex]?.question}
          </p>
        </div>
        <div className="mb-8 flex flex-col gap-4">
          {OPTIONS.map((option, idx) => (
            <button
              key={option.label}
              className="hover:bg-primary-light hover:border-primary box-border w-full rounded-xl bg-gray-100 py-[15px] text-lg leading-6 font-medium hover:border hover:border-solid focus:outline-none active:bg-gray-200"
              onClick={() => handleSelectOption(idx)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </LayoutMobile>
  );
};

export default TestPage;
