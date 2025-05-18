import {useNavigate} from 'react-router-dom';

import {Dialog, DialogContent} from '@/components/ui/dialog';

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const LoginDialog = ({open, onOpenChange}: LoginDialogProps) => {
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate('/login');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex items-center justify-center border-0 bg-transparent p-0 shadow-none [&>button]:hidden">
        <div className="flex h-[350px] w-[347px] flex-col items-center rounded-2xl bg-white px-[15px] pt-[17px] pb-[19px] shadow-xl">
          <div className="mb-4 text-center">
            <div className="mb-1 text-lg font-medium text-gray-400">
              잠시만요 !
            </div>
            <div className="mb-1 text-xl leading-tight font-medium text-black">
              회원가입을 해야
              <br />
              프로필카드를 만들 수 있어요
            </div>
          </div>
          <div className="mb-6 text-6xl">✋</div>
          <div className="mt-auto flex w-full gap-1.5">
            <button
              onClick={navigateToLogin}
              className="h-[54px] flex-1 rounded-lg bg-[#EEECFF] text-xl font-bold whitespace-nowrap text-[#5F4AFF]"
            >
              10초만에 회원가입하기
            </button>
            <button
              className="h-[54px] w-[90px] rounded-lg bg-gray-100 text-base font-medium text-gray-500"
              onClick={() => onOpenChange(false)}
              type="button"
            >
              취소
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default LoginDialog;
