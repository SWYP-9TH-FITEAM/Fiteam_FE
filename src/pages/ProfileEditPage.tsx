import {getPositions} from '@/entities/member/api/positions';
import ProfileLoadingScreen from '@/features/profile/ProfileLoadingScreen';
import ProfileSkipDialog from '@/features/profile/ProfileSkipDialog';
import LayoutMo from '@/layouts/LayoutMo';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

const ProfileEditPage = () => {
  const navigate = useNavigate();

  const [positions, setPositions] = useState<string[]>([]);
  const [selectedJob, setSelectedJob] = useState<string>('');

  const [career, setCareer] = useState<number>(10);
  const [isSkipDialogOpen, setIsSkipDialogOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleComplete = () => {
    setIsLoading(true);
    // 10초 후 로딩 완료 및 프로필 페이지로 이동
    setTimeout(() => {
      navigate('/profile');
    }, 10000);
  };

  const handleLoadingComplete = () => {
    // 로딩이 완료되면 다음 페이지로 이동
    navigate('/profile');
  };

  // 슬라이더 툴팁 위치 계산 함수 (가장자리에서 잘리지 않도록)
  const getTooltipPosition = () => {
    const percentage = (career / 20) * 100;

    if (percentage > 92) {
      return '92%';
    }

    if (percentage < 8) {
      return '8%';
    }

    return `${percentage}%`;
  };

  useEffect(() => {
    getPositions(2).then(data => {
      console.log(data);
      setPositions(data);
    });
  }, []);

  if (isLoading) {
    return <ProfileLoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <LayoutMo
      hasHeader={true}
      rightChildren={
        <button
          className="text-gray-600"
          onClick={() => setIsSkipDialogOpen(true)}
        >
          건너뛰기
        </button>
      }
    >
      <div className="flex flex-col items-center pb-12">
        <p className="text-[#111] text-center text-2xl not-italic font-semibold leading-8 tracking-[-0.6px] mt-4 mb-6">
          안녕하세요, 토온님!
          <br />
          프로필 생성을 도와드릴게요
        </p>
        <div className="w-32 h-32 flex items-center justify-center mb-[47px]">
          <div className="w-28 h-28 bg-gray-200 rounded-full flex items-center justify-center">
            {/* 로봇 이미지 - 임시로 텍스트로 대체 */}
            <span className="text-4xl">🤖</span>
          </div>
        </div>
        {/* 직무 선택 */}
        <div className="w-full mb-6">
          <p className="text-base mb-2 text-left">어떤 직무신가요?</p>
          <div className="flex gap-2 w-full flex-wrap">
            {positions.map(position => (
              <button
                key={position}
                className={`flex-1 h-[38px] rounded-lg ${
                  selectedJob === position
                    ? 'border border-solid border-primary bg-[#EEECFF] text-primary'
                    : 'bg-[#F1F2F4]'
                }`}
                onClick={() => setSelectedJob(position as typeof selectedJob)}
              >
                {position}
              </button>
            ))}
          </div>
        </div>
        {/* 경력 선택 */}
        <div className="w-full mb-10">
          <p className="text-base mb-2 text-left">경력이 있으신가요?</p>
          <div className="w-full relative overflow-visible">
            {/* 슬라이더 트랙 */}
            <div className="w-full h-3 rounded-full bg-[#F1F2F4] overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${(career / 20) * 100}%`,
                  background:
                    'linear-gradient(90deg, #9182FF 0%, #5F4AFF 58.51%, #4432CE 169.03%)',
                }}
              ></div>
            </div>

            {/* 슬라이더 인풋 (투명하게 설정하고 위에 겹침) */}
            <input
              type="range"
              min="0"
              max="20"
              step="1"
              value={career}
              onChange={e => setCareer(parseInt(e.target.value))}
              className="absolute top-0 left-0 w-full h-3 opacity-0 cursor-pointer"
            />

            {/* 현재 값 표시 - 툴팁 형태 */}
            <div
              className="absolute pointer-events-none"
              style={{
                left: getTooltipPosition(),
                top: '14px',
                transform: 'translateX(-50%)',
              }}
            >
              {/* 세모 꼭지 (위쪽 삼각형) */}
              <div
                className="w-0 h-0 mx-auto"
                style={{
                  borderLeft: '8px solid transparent',
                  borderRight: '8px solid transparent',
                  borderBottom: '8px solid white',
                }}
              ></div>

              {/* 툴팁 본문 */}
              <div className="bg-white shadow-md rounded-md w-[70px] h-[35px] flex items-center justify-center">
                <span className="font-medium text-center">{career}년</span>
              </div>
            </div>
          </div>
        </div>
        {/* 활동내역 */}
        <div className="w-full mb-4">
          <p className="text-base mb-2 text-left">활동내역을 적어주세요</p>
          <textarea
            className="w-full h-20 bg-gray-100 rounded-lg p-3 resize-none"
            placeholder="활동내역을 입력하세요"
          />
        </div>
        {/* 목표 */}
        <div className="w-full mb-4">
          <p className="text-base mb-2 text-left">목표를 입력해주세요.</p>
          <textarea
            className="w-full h-20 bg-gray-100 rounded-lg p-3 resize-none"
            placeholder="목표를 입력하세요"
          />
        </div>
        {/* 목적 */}
        <div className="w-full mb-4">
          <p className="text-base mb-2 text-left">목적을 입력해주세요.</p>
          <textarea
            className="w-full h-20 bg-gray-100 rounded-lg p-3 resize-none"
            placeholder="목적을 입력하세요"
          />
        </div>
        {/* 포트폴리오 */}
        <div className="w-full mb-4">
          <p className="text-base mb-2 text-left">포트폴리오를 올려주세요</p>
          <textarea
            className="w-full h-20 bg-gray-100 rounded-lg p-3 resize-none"
            placeholder="포트폴리오 URL을 입력하세요"
          />
        </div>
        {/* 하고 싶은 소개 */}
        <div className="w-full mb-8">
          <p className="text-base mb-2 text-left">
            하고 싶은 소개를 남겨주세요!
          </p>
          <textarea
            className="w-full h-32 bg-gray-100 rounded-lg p-3 resize-none"
            placeholder="자기소개를 입력하세요"
          />
        </div>
        {/* 완료 버튼 */}
        {/* // TODO:: validation */}
        <button
          className="w-full h-[54px] bg-primary text-white rounded-lg text-lg font-medium"
          onClick={handleComplete}
        >
          완료하기
        </button>
      </div>

      <ProfileSkipDialog
        open={isSkipDialogOpen}
        onOpenChange={setIsSkipDialogOpen}
      />
    </LayoutMo>
  );
};

export default ProfileEditPage;
