import robot from '@/assets/images/robot.png';
import LayoutMo from '@/layouts/LayoutMo';
import {useEffect, useState} from 'react';

interface ProfileLoadingScreenProps {
  onComplete: () => void;
}

const ProfileLoadingScreen = ({onComplete}: ProfileLoadingScreenProps) => {
  const [progress, setProgress] = useState(0);

  const circumference = 2 * Math.PI * 50; // 반지름이 50인 원의 둘레
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  useEffect(() => {
    // 10초 동안 진행률 증가
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          onComplete();
          return 100;
        }
        return prev + 1;
      });
    }, 100); // 10초 동안 100%가 되도록 0.1초마다 1%씩 증가

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <LayoutMo>
      <div className="h-[812px] inset-0  flex flex-col items-center justify-center gap-12">
        <h1 className="text-center text-2xl font-semibold leading-8">
          프로필을 생성하는 중이에요
        </h1>

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
    </LayoutMo>
  );
};

export default ProfileLoadingScreen;
