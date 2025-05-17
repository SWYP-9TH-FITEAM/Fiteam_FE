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
import {useMutation} from '@tanstack/react-query';

import * as React from 'react';
import {useNavigate} from 'react-router-dom';

interface TeamLeaveButtonProps {
  teamId: number;
}

export const TeamLeaveButton: React.FC<TeamLeaveButtonProps> = ({teamId}) => {
  const [open, setOpen] = React.useState(false);

  const [isPending, startTransition] = React.useTransition();

  const {mutateAsync: leaveTeam} = useMutation({mutationFn: deleteTeamLeave});

  const navigate = useNavigate();

  const handleTeamLeave = () => {
    if (isPending) return;

    startTransition(
      withHandleError(async () => {
        await leaveTeam(teamId);

        navigate('/team-building');
        setOpen(false);
      }),
    );
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          className="text-sm h-fit w-fit py-0.5 px-1 ml-auto"
        >
          팀 나가기
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="border-transparent sm:max-w-sm max-w-sm shadow-[0px_0px_8px_0px_rgba(0,0,0,0.25)]">
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
