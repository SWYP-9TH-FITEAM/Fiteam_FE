import {CharacterCard, SectionProps} from '@/features/profile/CharacterCard';
import {LayoutBottomBar} from '@/layouts/LayoutBottomBar';
import {ReactNode, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

// MBTI 데이터 인터페이스
interface MbtiData {
  code: string;
  name: string;
  summary: string;
  teamStrength: string;
  caution: string;
  bestMatchCode: string;
  bestMatchReason: string;
  worstMatchCode: string;
  worstMatchReason: string;
  details: string;
  ei: number;
  pd: number;
  cl: number;
  va: number;
}

const SectionInfo = ({children}: {children: ReactNode}) => {
  return (
    <div className="bg-white rounded-[20px] px-[18px] py-3">{children}</div>
  );
};

const Section2 = ({title, children}: Partial<SectionProps>) => {
  return (
    <div className="bg-white rounded-[20px] p-[13px]">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-medium text-black">{title}</h3>
      </div>
      {children}
    </div>
  );
};

// 정보 행 컴포넌트
const InfoRow = ({label, content}: {label: string; content: string}) => {
  return (
    <div className="flex mb-2 last:mb-0">
      <div className="w-20 text-left font-medium">{label}</div>
      <div className="flex-1 text-left">{content}</div>
    </div>
  );
};

// 헤더 컴포넌트
const ProfileHeader = () => {
  return (
    <header className="sticky top-0 z-10 h-12 px-4 py-3 text-center font-semibold text-lg">
      나의 프로필
    </header>
  );
};

// 성향카드 컴포넌트

const ProfilePage = () => {
  const navigate = useNavigate();
  const [mbtiData, setMbtiData] = useState<MbtiData | null>(null);

  // 실제 API 연동 시 여기에서 데이터를 가져옵니다
  useEffect(() => {
    // 임시 데이터 (API 연동 시 제거)
    const mockData: MbtiData = {
      code: 'INTJ',
      name: '아이디어 조율러',
      summary: '전략적이고 계획적인 성향을 가졌습니다.',
      teamStrength: '팀 분위기 조성',
      caution: '과도한 완벽주의',
      bestMatchCode: 'ENFP',
      bestMatchReason: '서로의 부족한 부분을 보완할 수 있음',
      worstMatchCode: 'ISFP',
      worstMatchReason: '소통 스타일 차이',
      details: 'ISTP 유형이면서 빠른 문제해결 능력을 지님',
      ei: 7,
      pd: 3,
      cl: 8,
      va: 5,
    };

    setMbtiData(mockData);
  }, []);

  if (!mbtiData) return <div>로딩 중...</div>;

  const handleRetakeTest = () => {
    navigate('/test');
  };

  return (
    <LayoutBottomBar
      classNames={{wrapper: 'bg-[#f6f6f6]'}}
      header={<ProfileHeader />}
    >
      <div className="pt-1.5 pb-3.5 flex flex-col gap-[13px]">
        {/* 성향 카드 */}
        <CharacterCard
          name={mbtiData.name}
          ei={mbtiData.ei}
          pd={mbtiData.pd}
          cl={mbtiData.cl}
          va={mbtiData.va}
          tags={{
            topLeft: '검소한',
            topRight: '배려만땅',
            bottomLeft: '친절한',
          }}
          onRetakeTest={handleRetakeTest}
        />

        <SectionInfo>
          <InfoRow label="직무" content="PM" />
          <InfoRow label="경력" content="10년" />
          <InfoRow label="목표" content="최고의 PM이 되는 것" />
          <div className="flex mb-2 last:mb-0">
            <div className="w-20 text-left font-medium">목적</div>
            <div className="flex-1 bg-gray-100 p-4 rounded-lg"></div>
          </div>
        </SectionInfo>

        <Section2 title="포트폴리오"></Section2>
        <Section2 title="자기소개서"></Section2>

        {/* 수정하기 버튼 */}
        <div className="mt-6 mb-8">
          <button
            className="w-full py-3 bg-gray-400 text-white rounded-lg font-medium"
            onClick={() => navigate('/profile/edit')}
          >
            수정하기
          </button>
        </div>
      </div>
    </LayoutBottomBar>
  );
};

export default ProfilePage;
