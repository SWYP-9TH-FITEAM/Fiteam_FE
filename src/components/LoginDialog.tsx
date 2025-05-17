import {Dialog, DialogContent} from '@/components/ui/dialog';
import {useNavigate} from 'react-router-dom';

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
      <DialogContent className="p-0 border-0 shadow-none bg-transparent flex items-center justify-center [&>button]:hidden">
        <div className="w-[347px] h-[350px] rounded-2xl bg-white pt-[17px] pb-[19px] px-[15px] flex flex-col items-center shadow-xl">
          <div className="text-center mb-4">
            <div className="text-gray-400 text-lg font-medium mb-1">
              잠시만요 !
            </div>
            <div className="text-black text-xl font-medium leading-tight mb-1">
              회원가입을 해야
              <br />
              프로필카드를 만들 수 있어요
            </div>
          </div>
          <div className="text-6xl mb-6">✋</div>
          <div className="flex w-full gap-1.5 mt-auto">
            <button
              onClick={navigateToLogin}
              className="flex-1 h-[54px] rounded-lg bg-[#EEECFF] text-[#5F4AFF] font-bold text-xl whitespace-nowrap"
            >
              10초만에 회원가입하기
            </button>
            <button
              className="w-[90px] h-[54px] rounded-lg bg-gray-100 text-gray-500 font-medium text-base"
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
