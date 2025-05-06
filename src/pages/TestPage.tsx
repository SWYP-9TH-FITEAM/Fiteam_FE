import LayoutMo from '@/layouts/LayoutMo';
import {useState, useEffect, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import robot from '@/assets/images/robot.png';

const OPTIONS = ['매우 그렇다', '그렇다', '중간이다', '아니다', '매우 아니다'];

const QUESTIONS_COUNT = 3; // 추후 변경 50

const MOCK_QUESTIONS = Array.from(
  {length: QUESTIONS_COUNT},
  (_, i) => `Q${i + 1}. 장기 계획을 세우는 걸 좋아하시나요?`,
);

const TOTAL_QUESTIONS = QUESTIONS_COUNT;
const LOADING_DURATION = 2000; // 2초 동안 로딩 애니메이션 진행

interface TestResultLoadingProps {
  apiPromise: Promise<{result: string; answers: number[]}>;
  onDone: (result: {result: string; answers: number[]}) => void;
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]); // 추후 결과 페이지에서 사용 예정
  const [questions] = useState(MOCK_QUESTIONS);
  const [isLoading, setIsLoading] = useState(false);
  const [apiPromise, setApiPromise] = useState<Promise<{
    result: string;
    answers: number[];
  }> | null>(null);

  // 추후 api 함수 모킹
  const fetchResultApi = (answers: number[]) => {
    return new Promise<{result: string; answers: number[]}>(resolve => {
      setTimeout(() => {
        const randomResultId = Math.floor(Math.random() * 16) + 1;
        resolve({result: String(randomResultId), answers});
      }, LOADING_DURATION * 1.2); // API 응답은 애니메이션보다 약간 더 길게
    });
  };

  const handleSelectOption = async (optionIdx: number) => {
    setAnswers(prev => [...prev, optionIdx]);
    if (currentIndex < TOTAL_QUESTIONS - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsLoading(true);
      const promise = fetchResultApi([...answers, optionIdx]);
      setApiPromise(promise);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleLoadingDone = (result: {result: string; answers: number[]}) => {
    navigate(`/result/${result.result}`);
  };

  const progressPercent = (currentIndex / TOTAL_QUESTIONS) * 100;

  if (isLoading && apiPromise) {
    return (
      <LayoutMo hasHeader={false}>
        <TestResultLoading apiPromise={apiPromise} onDone={handleLoadingDone} />
      </LayoutMo>
    );
  }

  return (
    <LayoutMo hasHeader={true}>
      <div className="flex flex-col h-full">
        <div className="flex items-center ">
          <div className="flex-1">
            <div className="w-full h-2 bg-gray-3 rounded">
              <div
                className="h-2 bg-primary rounded"
                style={{width: `${progressPercent}%`}}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center my-7">
          <p className="w-[300px] text-[28px] font-semibold whitespace-pre-line break-keep">
            {questions[currentIndex]}
          </p>
        </div>
        <div className="flex justify-center mb-8">
          <div className="w-[158px] h-[158px] bg-gray-200 rounded-full flex items-center justify-center">
            {/* <img /> */}
          </div>
        </div>
        <div className="flex flex-col gap-4 mb-8">
          {OPTIONS.map((option, idx) => (
            <button
              key={option}
              className="w-full py-[15px] bg-gray-100 rounded-xl text-lg leading-6 font-medium focus:outline-none active:bg-gray-200 hover:bg-primary-light hover:border hover:border-primary hover:border-solid box-border"
              onClick={() => handleSelectOption(idx)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </LayoutMo>
  );
};

export default TestPage;
