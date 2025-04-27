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
const DOT_COUNT = 5;
const DOT_INTERVAL = 400;
const DOT_SIZE = 14;
const DOT_GAP = 20;
const ROBOT_WIDTH = 48;

interface TestResultLoadingProps {
  apiPromise: Promise<{result: string; answers: number[]}>;
  onDone: (result: {result: string; answers: number[]}) => void;
}

function TestResultLoading({apiPromise, onDone}: TestResultLoadingProps) {
  const [filledCount, setFilledCount] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const robotX =
    (filledCount <= 0 ? 0 : filledCount - 1) * (DOT_SIZE + DOT_GAP) +
    DOT_SIZE / 2 -
    ROBOT_WIDTH / 2;

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setFilledCount(prev => (prev < DOT_COUNT ? prev + 1 : DOT_COUNT));
    }, DOT_INTERVAL);

    apiPromise.then(result => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setFilledCount(DOT_COUNT);
      setTimeout(() => {
        onDone(result);
      }, DOT_INTERVAL);
    });

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [apiPromise, onDone]);

  return (
    <div className="flex flex-col items-center justify-center h-full gap-7">
      <div className="text-center">
        <p className="text-lg font-medium">결과를 취합중입니다</p>
        <p className="text-2xl font-bold mt-1">잠시만 기다려주세요 !</p>
      </div>
      <div className="w-[200px] h-[60px] items-center relative">
        <img
          src={robot}
          alt="임시 로봇 이미지"
          className="w-12 h-12 mb-[7px] absolute top-0 transition-transform duration-300"
          style={{
            left: '25%',
            transform: `translateX(${robotX}px) translateX(-50%)`,
          }}
        />
        <div className="flex gap-5 mt-[7px] justify-center absolute left-1/2 top-[40px] -translate-x-1/2">
          {[...Array(DOT_COUNT)].map((_, i) => (
            <div
              key={i}
              className={`w-3.5 h-3.5 rounded-full transition-colors duration-200 ${i < filledCount ? 'bg-gray-400' : 'bg-gray-200'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const TestPage = () => {
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
        resolve({result: 'mock-result', answers});
      }, DOT_INTERVAL * 5);
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

  const handleLoadingDone = (result: {result: string; answers: number[]}) => {
    navigate('/result', {state: {result}});
  };

  const progressPercent = ((currentIndex + 1) / TOTAL_QUESTIONS) * 100;

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
            <div className="w-full h-2 bg-gray-200 rounded">
              <div
                className="h-2 bg-gray-400 rounded"
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
              className="w-full py-[15px] bg-gray-100 rounded-xl text-lg leading-6 font-medium focus:outline-none active:bg-gray-200"
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
