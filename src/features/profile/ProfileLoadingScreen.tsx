import {useEffect, useState} from 'react';

import robot from '@/assets/images/robot.png';
import LayoutMo from '@/layouts/LayoutMo';

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
      <div className="inset-0 flex h-[812px] flex-col items-center justify-center gap-12">
        <h1 className="text-center text-2xl leading-8 font-semibold">
          프로필을 생성하는 중이에요
        </h1>

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
            <span className="text-gray-5 text-center text-base leading-6 font-medium">
              %
            </span>
          </div>
        </div>
      </div>
    </LayoutMo>
  );
};

export default ProfileLoadingScreen;
