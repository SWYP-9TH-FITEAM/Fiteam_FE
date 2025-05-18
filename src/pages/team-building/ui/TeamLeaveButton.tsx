import * as React from 'react';
import {useMutation} from '@tanstack/react-query';
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
import {deleteTeamLeave} from '@/entities/team/api/delete-team';
import {withHandleError} from '@/shared/util/handle-error';

interface TeamLeaveButtonProps {
  teamId: number;
}

export const TeamLeaveButton: React.FC<TeamLeaveButtonProps> = ({teamId}) => {
  const [open, setOpen] = React.useState(false);

  const {mutateAsync: leaveTeam, isPending} = useMutation({
    mutationFn: deleteTeamLeave,
  });

  const navigate = useNavigate();

  const handleTeamLeave = withHandleError(async () => {
    if (isPending) return;

    await leaveTeam(teamId);

    navigate('/team-building');
    setOpen(false);
  });

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          className="ml-auto h-fit w-fit px-1 py-0.5 text-sm"
        >
          팀 나가기
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-sm border-transparent shadow-[0px_0px_8px_0px_rgba(0,0,0,0.25)] sm:max-w-sm">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">
            정말 팀을 나가시겠습니까?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter className="sm:justify-center">
          <AlertDialogCancel disabled={isPending}>취소</AlertDialogCancel>
          <AlertDialogAction onClick={handleTeamLeave} disabled={isPending}>
            {isPending && <div className="loading loading-spinner" />}
            나가기
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
