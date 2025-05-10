import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {useSetToken} from '@/shared/model/auth';
import {ChevronRight} from 'lucide-react';
import * as React from 'react';
import {useNavigate} from 'react-router-dom';

export const LogoutButton: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const setToken = useSetToken();
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(null);
    navigate('/');
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <button className="py-3 font-medium h-16 w-full text-lg tracking-[-0.45px] flex items-center justify-between">
          <span>로그아웃</span>
          <ChevronRight className="stroke-[1.5]" />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="border-transparent sm:max-w-sm max-w-sm shadow-[0px_0px_8px_0px_rgba(0,0,0,0.25)]">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">
            정말 로그아웃 하시겠습니까?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter className="sm:justify-center">
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction onClick={handleLogout}>로그아웃</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
