import LayoutMo from '@/layouts/LayoutMo';
import {useEffect, useState} from 'react';

interface ProfileLoadingScreenProps {
  onComplete: () => void;
}

const ProfileLoadingScreen = ({onComplete}: ProfileLoadingScreenProps) => {
  const [progress, setProgress] = useState(0);

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
      <div className="h-[812px] inset-0  flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-12">프로필을 생성하는중이에요</h1>

        <div className="relative w-[240px] h-[240px] mb-8">
          {/* 진행률 원형 트랙 (회색 배경) */}
          <div className="absolute inset-0 rounded-full border-[16px] border-[#F1F2F4]"></div>

          {/* 진행률 표시 원형 (파란색 그라데이션) */}
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle
              cx="120"
              cy="120"
              r="112"
              fill="none"
              strokeWidth="16"
              stroke="url(#blue-gradient)"
              strokeDasharray={`${(2 * Math.PI * 112 * progress) / 100} ${2 * Math.PI * 112}`}
              strokeLinecap="round"
            />
            <defs>
              <linearGradient
                id="blue-gradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#7C68FF" />
                <stop offset="100%" stopColor="#3546F5" />
              </linearGradient>
            </defs>
          </svg>

          {/* 로봇 이미지 (중앙) */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-28 h-28 bg-gray-200 rounded-full flex items-center justify-center">
              {/* 로봇 이미지 - 임시로 텍스트로 대체 */}
              <span className="text-4xl">🤖</span>
            </div>
          </div>

          {/* 진행률 텍스트 */}
          <div className="absolute inset-0 flex items-center justify-center mt-32">
            <span className="text-[#5F4AFF] text-5xl font-bold">
              {progress}
              <span className="text-2xl">%</span>
            </span>
          </div>
        </div>
      </div>
    </LayoutMo>
  );
};

export default ProfileLoadingScreen;
