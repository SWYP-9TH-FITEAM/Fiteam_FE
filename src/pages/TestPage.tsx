import LayoutMo from '@/layouts/LayoutMo';
import {useState, useEffect, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import robot from '@/assets/images/robot.png';
import {getAllQuestions} from '@/entities/question/api/create-question';
import {GetQuestionsResponseDto} from '@/entities/question/api/dto';
import TestPageHeader from '@/features/test/TestPageHeader';
import {LayoutMobile} from '@/layouts/LayoutMobile';

const OPTIONS = [
  {label: '매우 그렇다', score: 5},
  {label: '그렇다', score: 4},
  {label: '중간이다', score: 3},
  {label: '아니다', score: 2},
  {label: '매우 아니다', score: 1},
];

const LOADING_DURATION = 2000; // 2초 동안 로딩 애니메이션 진행

interface TestResultLoadingProps {
  apiPromise: Promise<{result: string; scores: QuestionScore[]}>;
  onDone: (result: {result: string; scores: QuestionScore[]}) => void;
}

// 문항별 점수를 저장할 인터페이스
interface QuestionScore {
  [key: string]: number; // 예: { "E": 5, "I": 0 }
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
    <div className="flex flex-col items-center justify-center h-full min-h-[812px] gap-7">
      <div className="text-center">
        <p className="text-gray-6 text-center text-xl font-medium leading-7">
          결과를 취합중입니다
        </p>
        <p className="text-dark text-center text-[28px] font-semibold leading-9">
          잠시만 기다려주세요 !
        </p>
      </div>

      <div className="relative w-[185px] h-[185px]">
        {/* 가장 바깥쪽 테두리 원 - #EEECFF 색상, 지름 185px */}
        <div className="absolute inset-0 rounded-full bg-[#EEECFF]"></div>

        {/* 하얀색 원 - 지름 179px */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[171px] h-[171px] rounded-full bg-white"></div>

        {/* 진행 상태 원형 UI */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[160px] h-[160px]">
          {/* 회색 원형 트랙 */}
          <svg
            className="absolute inset-0 w-full h-full -rotate-90"
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
            className="absolute inset-0 w-full h-full -rotate-90"
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
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
          <img src={robot} alt="로봇" className="w-16 h-16" />
        </div>

        {/* 퍼센트 숫자 - 하단 배치 */}
        <div className="absolute bottom-8 inset-x-0 flex justify-center">
          <span className="text-primary items-center text-center text-[40px] font-bold leading-[48px]">
            {progress}
          </span>
          <span className="text-gray-6 text-center text-base font-medium leading-6">
            %
          </span>
        </div>
      </div>
    </div>
  );
}

const TestPage = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testScore, setTestScore] = useState<QuestionScore[]>([]); // 각 문항별 MBTI 점수를 저장
  const [questions, setQuestions] = useState<GetQuestionsResponseDto>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiPromise, setApiPromise] = useState<Promise<{
    result: string;
    scores: QuestionScore[];
  }> | null>(null);
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

  // 추후 api 함수 모킹
  const fetchResultApi = (scores: QuestionScore[]) => {
    return new Promise<{result: string; scores: QuestionScore[]}>(resolve => {
      setTimeout(() => {
        // 실제로는 scores를 사용하여 결과를 분석하는 로직이 들어갈 수 있습니다
        console.log('문항별 MBTI 점수:', scores);

        const randomResultId = Math.floor(Math.random() * 16) + 1;
        resolve({result: String(randomResultId), scores});
      }, LOADING_DURATION * 1.2); // API 응답은 애니메이션보다 약간 더 길게
    });
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

  const handleLoadingDone = (result: {
    result: string;
    scores: QuestionScore[];
  }) => {
    navigate(`/result/${result.result}`);
  };

  const progressPercent =
    questions.length > 0 ? (currentIndex / questions.length) * 100 : 0;

  if (isQuestionsLoading) {
    return (
      <LayoutMo hasHeader={true}>
        <div className="flex flex-col h-full items-center justify-center">
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
        <div className="flex flex-col h-full items-center justify-center">
          <p>문제를 불러오지 못했습니다. 다시 시도해주세요.</p>
        </div>
      </LayoutMo>
    );
  }
  console.log(testScore);

  return (
    <LayoutMobile header={<TestPageHeader onClickBack={handleClickBack} />}>
      <div className="flex flex-col h-full ">
        <div className="flex items-center pt-2">
          <div className="flex-1">
            <div className="w-full h-2 bg-gray-3 rounded">
              <div
                className="h-2 bg-primary rounded"
                style={{width: `${progressPercent}%`}}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-5 justify-center mt-14 mb-24">
          <div className="w-[26px] h-[26px] rounded-[13px] bg-gray-1 text-base font-medium">
            {currentIndex + 1}
          </div>
          <p className="w-full h-[126px] text-[28px] font-semibold whitespace-pre-line break-keep">
            {questions[currentIndex]?.question}
          </p>
        </div>
        <div className="flex flex-col gap-4 mb-8">
          {OPTIONS.map((option, idx) => (
            <button
              key={option.label}
              className="w-full py-[15px] bg-gray-100 rounded-xl text-lg leading-6 font-medium focus:outline-none active:bg-gray-200 hover:bg-primary-light hover:border hover:border-primary hover:border-solid box-border"
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
