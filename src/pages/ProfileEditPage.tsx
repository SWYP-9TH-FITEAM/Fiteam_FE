import {getPositions} from '@/entities/member/api/positions';
import ProfileLoadingScreen from '@/features/profile/ProfileLoadingScreen';
import ProfileSkipDialog from '@/features/profile/ProfileSkipDialog';
import LayoutMo from '@/layouts/LayoutMo';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {useQuery} from '@tanstack/react-query';
import {memberQueries} from '@/entities/member/api/member.query';
import {patchMemberMyProfile} from '@/entities/member/api/update-member';

const groupId = 1; // TODO: 실제 그룹 ID로 교체

const ProfileEditPage = () => {
  const navigate = useNavigate();

  const [positions, setPositions] = useState<string[]>([]);
  const [isSkipDialogOpen, setIsSkipDialogOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {register, handleSubmit, setValue, watch, reset} = useForm<{
    position: string;
    workHistory: number;
    projectGoal: string;
    projectPurpose: string;
    url: string;
    introduction: string;
  }>({
    defaultValues: {
      position: '',
      workHistory: 0,
      projectGoal: '',
      projectPurpose: '',
      url: '',
      introduction: '',
    },
  });

  // 기존 프로필 데이터 패치
  const {data: myProfile, isLoading: isProfileLoading} = useQuery(
    memberQueries.myProfile(groupId),
  );

  // myProfile이 있으면 폼에 값 세팅
  useEffect(() => {
    if (myProfile) {
      reset({
        position: myProfile.position ?? '',
        workHistory: myProfile.workHistory != null ? myProfile.workHistory : 0,
        projectGoal: myProfile.projectGoal ?? '',
        projectPurpose: myProfile.projectPurpose ?? '',
        url: myProfile.url ?? '',
        introduction: myProfile.introduction ?? '',
      });
    }
  }, [myProfile, reset]);

  const workHistory = watch('workHistory');
  const position = watch('position');
  const projectGoal = watch('projectGoal');
  const projectPurpose = watch('projectPurpose');
  const url = watch('url');
  const introduction = watch('introduction');

  // 모든 필드가 비어있지 않아야 제출 가능
  const isFormValid = [
    position,
    workHistory,
    projectGoal,
    projectPurpose,
    url,
    introduction,
  ].every(
    v => v !== '' && v != null && (typeof v === 'number' ? v >= 0 : true),
  );

  const handleComplete = handleSubmit(async data => {
    setIsLoading(true);
    try {
      await patchMemberMyProfile(groupId, {
        position: data.position,
        workHistory: Number(data.workHistory),
        projectGoal: data.projectGoal,
        projectPurpose: data.projectPurpose,
        url: data.url,
        introduction: data.introduction,
      });
      navigate('/profile');
    } catch (error) {
      setIsLoading(false);
      console.error('프로필 저장 에러:', error);
      alert('프로필 저장에 실패했습니다.');
    }
  });

  const handleLoadingComplete = () => {
    // 로딩이 완료되면 다음 페이지로 이동
    navigate('/profile');
  };

  // 슬라이더 툴팁 위치 계산 함수 (가장자리에서 잘리지 않도록)
  const getTooltipPosition = () => {
    const percentage = (Number(workHistory) / 37) * 100;

    if (percentage > 92) {
      return '92%';
    }

    if (percentage < 8) {
      return '8%';
    }

    return `${percentage}%`;
  };

  useEffect(() => {
    getPositions(1).then(data => {
      // TODO:
      setPositions(data);
    });
  }, []);

  if (isLoading || isProfileLoading) {
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
      <form
        onSubmit={handleComplete}
        className="flex flex-col items-center pb-12 w-full"
      >
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
            {positions.map(eachPosition => (
              <button
                key={eachPosition}
                type="button"
                className={`flex-1 h-[38px] rounded-lg ${
                  position === eachPosition
                    ? 'border border-solid border-primary bg-[#EEECFF] text-primary'
                    : 'bg-[#F1F2F4]'
                }`}
                onClick={() => setValue('position', eachPosition)}
              >
                {eachPosition}
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
                  width: `${(Number(workHistory) / 37) * 100}%`,
                  background:
                    'linear-gradient(90deg, #9182FF 0%, #5F4AFF 58.51%, #4432CE 169.03%)',
                }}
              ></div>
            </div>

            {/* 슬라이더 인풋 (투명하게 설정하고 위에 겹침) */}
            <input
              type="range"
              min="0"
              max="37"
              step="1"
              value={workHistory}
              {...register('workHistory')}
              onChange={e => setValue('workHistory', Number(e.target.value))}
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
              <div className="bg-white shadow-md rounded-md w-fit h-[35px] px-2 flex items-center justify-center">
                <span className="font-medium text-center whitespace-nowrap">
                  {Number(workHistory) === 37
                    ? '3년+'
                    : Number(workHistory) < 12
                      ? `${workHistory}개월`
                      : (() => {
                          const year = Math.floor(Number(workHistory) / 12);
                          const month = Number(workHistory) % 12;
                          if (month === 0) return `${year}년`;
                          return `${year}년 ${month}개월`;
                        })()}
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* 목표 */}
        <div className="w-full mb-4">
          <p className="text-base mb-2 text-left">목표를 입력해주세요.</p>
          <textarea
            className="w-full h-20 bg-gray-100 rounded-lg p-3 resize-none"
            placeholder="ex) 최고의 PM이 되는 것"
            {...register('projectGoal')}
          />
        </div>
        {/* 목적 */}
        <div className="w-full mb-4">
          <p className="text-base mb-2 text-left">목적을 입력해주세요.</p>
          <textarea
            className="w-full h-20 bg-gray-100 rounded-lg p-3 resize-none"
            placeholder="ex) 수익화"
            {...register('projectPurpose')}
          />
        </div>
        {/* 포트폴리오 */}
        <div className="w-full mb-4">
          <p className="text-base mb-2 text-left">포트폴리오를 올려주세요</p>
          <textarea
            className="w-full h-20 bg-gray-100 rounded-lg p-3 resize-none"
            placeholder="URL"
            {...register('url')}
          />
        </div>
        {/* 하고 싶은 소개 */}
        <div className="w-full mb-8">
          <p className="text-base mb-2 text-left">
            하고 싶은 소개를 남겨주세요!
          </p>
          <textarea
            className="w-full h-32 bg-gray-100 rounded-lg p-3 resize-none"
            placeholder="ex) 활동 내역 등"
            {...register('introduction')}
          />
        </div>
        {/* 완료 버튼 */}
        <button
          className="w-full h-[54px] bg-primary text-white rounded-lg text-lg font-medium disabled:bg-gray-300"
          type="submit"
          disabled={!isFormValid}
        >
          완료하기
        </button>
      </form>

      <ProfileSkipDialog
        open={isSkipDialogOpen}
        onOpenChange={setIsSkipDialogOpen}
      />
    </LayoutMo>
  );
};

export default ProfileEditPage;
