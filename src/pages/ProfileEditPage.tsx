import {useEffect, useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import {useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';

import {memberQueries} from '@/entities/member/api/member.query';
import {patchMemberMyProfile} from '@/entities/member/api/update-member';
import ProfileLoadingScreen from '@/features/profile/ProfileLoadingScreen';
import ProfileSkipDialog from '@/features/profile/ProfileSkipDialog';
import LayoutMo from '@/layouts/LayoutMo';
import {useCurrentGroupId} from '@/shared/model/group-id';

const ProfileEditPage = () => {
  const navigate = useNavigate();
  const currentGroupId = useCurrentGroupId();

  const {data: positions} = useQuery({
    ...memberQueries.positionsByGroupId(currentGroupId ?? -1),
    enabled: currentGroupId !== null,
  });
  const [isSkipDialogOpen, setIsSkipDialogOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: {errors},
  } = useForm<{
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
  const {data: myProfile, isLoading: isProfileLoading} = useQuery({
    ...memberQueries.myProfile(currentGroupId ?? -1),
    enabled: currentGroupId !== null,
  });

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
    if (currentGroupId === null) return;
    setIsLoading(true);
    try {
      await patchMemberMyProfile(currentGroupId, {
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
        className="flex w-full flex-col items-center pb-12"
      >
        <p className="mt-4 mb-6 text-center text-2xl leading-8 font-semibold tracking-[-0.6px] text-[#111] not-italic">
          안녕하세요, 토온님!
          <br />
          프로필 생성을 도와드릴게요
        </p>
        <div className="mb-[47px] flex h-32 w-32 items-center justify-center">
          <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gray-200">
            {/* 로봇 이미지 - 임시로 텍스트로 대체 */}
            <span className="text-4xl">🤖</span>
          </div>
        </div>
        {/* 직무 선택 */}
        <div className="mb-6 w-full">
          <p className="mb-2 text-left text-base">어떤 직무신가요?</p>
          <div className="flex w-full flex-wrap gap-2">
            {positions?.map(eachPosition => (
              <button
                key={eachPosition}
                type="button"
                className={`h-[38px] flex-1 rounded-lg ${
                  position === eachPosition
                    ? 'border-primary text-primary border border-solid bg-[#EEECFF]'
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
        <div className="mb-10 w-full">
          <p className="mb-2 text-left text-base">경력이 있으신가요?</p>
          <div className="relative w-full overflow-visible">
            {/* 슬라이더 트랙 */}
            <div className="h-3 w-full overflow-hidden rounded-full bg-[#F1F2F4]">
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
              className="absolute top-0 left-0 h-3 w-full cursor-pointer opacity-0"
            />

            {/* 현재 값 표시 - 툴팁 형태 */}
            <div
              className="pointer-events-none absolute"
              style={{
                left: getTooltipPosition(),
                top: '14px',
                transform: 'translateX(-50%)',
              }}
            >
              {/* 세모 꼭지 (위쪽 삼각형) */}
              <div
                className="mx-auto h-0 w-0"
                style={{
                  borderLeft: '8px solid transparent',
                  borderRight: '8px solid transparent',
                  borderBottom: '8px solid white',
                }}
              ></div>

              {/* 툴팁 본문 */}
              <div className="flex h-[35px] w-fit items-center justify-center rounded-md bg-white px-2 shadow-md">
                <span className="text-center font-medium whitespace-nowrap">
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
        <div className="mb-4 w-full">
          <p className="mb-2 text-left text-base">목표를 입력해주세요.</p>
          <textarea
            className="h-20 w-full resize-none rounded-lg bg-gray-100 p-3"
            placeholder="ex) 최고의 PM이 되는 것"
            {...register('projectGoal', {
              maxLength: {
                value: 200,
                message: '최대 200자 이내로 입력해주세요.',
              },
            })}
          />
          <p className="text-sm text-red-500">{errors.projectGoal?.message}</p>
        </div>
        {/* 목적 */}
        <div className="mb-4 w-full">
          <p className="mb-2 text-left text-base">목적을 입력해주세요.</p>
          <textarea
            className="h-20 w-full resize-none rounded-lg bg-gray-100 p-3"
            placeholder="ex) 수익화"
            {...register('projectPurpose', {
              maxLength: {
                value: 50,
                message: '최대 50자 이내로 입력해주세요.',
              },
            })}
          />
          <p className="text-sm text-red-500">
            {errors.projectPurpose?.message}
          </p>
        </div>
        {/* 포트폴리오 */}
        <div className="mb-4 w-full">
          <p className="mb-2 text-left text-base">포트폴리오를 올려주세요</p>
          <textarea
            className="h-20 w-full resize-none rounded-lg bg-gray-100 p-3"
            placeholder="URL"
            {...register('url', {
              maxLength: {
                value: 200,
                message: '최대 200자 이내로 입력해주세요.',
              },
            })}
          />
          <p className="text-sm text-red-500">{errors.url?.message}</p>
        </div>
        {/* 하고 싶은 소개 */}
        <div className="mb-8 w-full">
          <p className="mb-2 text-left text-base">
            하고 싶은 소개를 남겨주세요!
          </p>
          <textarea
            className="h-32 w-full resize-none rounded-lg bg-gray-100 p-3"
            placeholder="ex) 활동 내역 등"
            {...register('introduction', {
              maxLength: {
                value: 65535,
                message: '최대 65535자 이내로 입력해주세요.',
              },
            })}
          />
          <p className="text-sm text-red-500">{errors.introduction?.message}</p>
        </div>
        {/* 완료 버튼 */}
        <button
          className="bg-primary h-[54px] w-full rounded-lg text-lg font-medium text-white disabled:bg-gray-300"
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
