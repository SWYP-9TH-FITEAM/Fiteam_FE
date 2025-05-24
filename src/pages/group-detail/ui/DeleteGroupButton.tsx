import * as React from 'react';
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
import {Button} from '@/components/ui/button';
import {deleteGroup} from '@/entities/group/api';
import {withHandleError} from '@/shared/util/handle-error';

interface DeleteGroupButtonProps {
  groupId: number;
}

export const DeleteGroupButton: React.FC<DeleteGroupButtonProps> = ({
  groupId,
}) => {
  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate();
  const [isPending, startTransition] = React.useTransition();

  const handleLogout = () => {
    if (!isPending) return;

    startTransition(
      withHandleError(async () => {
        await deleteGroup(groupId);
        setOpen(false);
        navigate('/manager/team-building');
      }),
    );
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="w-[120px]" disabled={isPending}>
          그룹 삭제
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-sm border-transparent shadow-[0px_0px_8px_0px_rgba(0,0,0,0.25)] sm:max-w-sm">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">
            정말 그룹을 삭제하시겠습니까?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter className="sm:justify-center">
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction onClick={handleLogout} disabled={isPending}>
            삭제
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
