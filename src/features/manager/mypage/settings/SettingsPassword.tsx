import {useState} from 'react';
import {ChevronLeft} from 'lucide-react';

import {Button} from '@/components/ui/button';
import {SettingsStatus} from './MyPageSettings';

interface SettingsPasswordProps {
  setSettingsStatus: (status: SettingsStatus) => void;
}

const STEP = {
  VERIFY: 1,
  CHANGE: 2,
} as const;

const SettingsPassword = ({setSettingsStatus}: SettingsPasswordProps) => {
  const [step, setStep] = useState<(typeof STEP)[keyof typeof STEP]>(
    STEP.VERIFY,
  );
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const changeStatusToSettingsMain = () => {
    setSettingsStatus('MAIN');
  };

  return (
    <section className="relative mb-15 w-full rounded-[20px] bg-white px-[74px] py-[72px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]">
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-9"
        onClick={changeStatusToSettingsMain}
      >
        <ChevronLeft className="h-9 w-9" />
      </Button>
      <div className="mx-auto flex w-[400px] flex-col items-center">
        {/* Stepper */}
        <div className="mb-10 flex items-center justify-center">
          <div className="flex items-center">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-lg font-semibold ${
                step === STEP.VERIFY
                  ? 'bg-primary text-white'
                  : 'text-primary border-2 border-[#E5E5EA] bg-white'
              }`}
            >
              1
            </div>
            <div className="h-[2px] w-12 bg-[#E5E5EA]" />
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-lg font-semibold ${
                step === STEP.CHANGE
                  ? 'bg-primary text-white'
                  : 'text-primary border-2 border-[#E5E5EA] bg-white'
              }`}
            >
              2
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="mb-6 text-center">
          <div className="mb-4 text-2xl font-bold">현재 비밀번호 입력</div>
          {step === STEP.VERIFY && (
            <div className="text-base leading-6 text-[#222]">
              사용자 검증을 위해
              <br />
              현재 비밀번호를 입력해주세요.
            </div>
          )}
        </div>

        {/* Step 1: 현재 비밀번호 입력 */}
        {step === STEP.VERIFY && (
          <form
            className="flex w-full flex-col items-center"
            onSubmit={e => {
              e.preventDefault();
              setStep(STEP.CHANGE);
            }}
          >
            <label
              htmlFor="current-password"
              className="mt-8 mb-2 block text-center text-lg font-medium"
            >
              현재 비밀번호
            </label>
            <input
              id="current-password"
              type="password"
              className="mb-12 h-12 w-full rounded-[6px] bg-[#F2F2F2] px-4 text-base outline-none"
              value={currentPassword}
              onChange={e => setCurrentPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="mt-8 h-12 w-full rounded-[8px] bg-[#564DF2] text-lg font-semibold text-white"
            >
              다음
            </button>
          </form>
        )}

        {/* Step 2: 비밀번호 변경 */}
        {step === STEP.CHANGE && (
          <form
            className="flex w-full flex-col items-center"
            onSubmit={e => {
              e.preventDefault();
              // 완료 처리
            }}
          >
            <label
              htmlFor="new-password"
              className="mt-2 mb-2 block text-center text-lg font-medium"
            >
              변경할 비밀번호
            </label>
            <input
              id="new-password"
              type="password"
              className="mb-6 h-12 w-full rounded-[6px] bg-[#F2F2F2] px-4 text-base outline-none"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              required
            />
            <label
              htmlFor="confirm-password"
              className="mb-2 block text-center text-lg font-medium"
            >
              비밀번호 확인
            </label>
            <input
              id="confirm-password"
              type="password"
              className="mb-10 h-12 w-full rounded-[6px] bg-[#F2F2F2] px-4 text-base outline-none"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="h-12 w-full rounded-[8px] bg-[#564DF2] text-lg font-semibold text-white"
            >
              완료
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default SettingsPassword;
