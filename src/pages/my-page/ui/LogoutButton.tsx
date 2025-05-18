import * as React from 'react';
import {ChevronRight} from 'lucide-react';
import {useNavigate} from 'react-router-dom';

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
import {useSetUserInfo} from '@/shared/model/user';

export const LogoutButton: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const setToken = useSetToken();
  const setUserInfo = useSetUserInfo();
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(null);
    setUserInfo(null);
    navigate('/');
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <button className="flex h-16 w-full items-center justify-between py-3 text-lg font-medium tracking-[-0.45px]">
          <span>로그아웃</span>
          <ChevronRight className="stroke-[1.5]" />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-sm border-transparent shadow-[0px_0px_8px_0px_rgba(0,0,0,0.25)] sm:max-w-sm">
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
