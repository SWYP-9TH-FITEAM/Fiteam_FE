import * as React from 'react';
import {useQuery} from '@tanstack/react-query';
import {Check} from 'lucide-react';
import {toast} from 'sonner';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {Button} from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {patchGroupBan} from '@/entities/group/api';
import {managerQueries} from '@/entities/manager/api';
import {cn} from '@/lib/utils';
import {withHandleError} from '@/shared/util/handle-error';

interface BanGroupMemberProps {
  groupId: number;
}

export const BanGroupMember: React.FC<BanGroupMemberProps> = ({groupId}) => {
  const {data: members, refetch} = useQuery({
    ...managerQueries.members(groupId),
  });

  const [isPending, startTransition] = React.useTransition();
  const [open, setOpen] = React.useState(false);
  const [selectedMemberId, setSelectedMemberId] = React.useState<number | null>(
    null,
  );

  if (!members) return null;

  const handleBanMember = () => {
    if (isPending || !selectedMemberId) return;

    startTransition(
      withHandleError(async () => {
        await patchGroupBan({groupId, groupMemberId: selectedMemberId});
        toast.success('그룹원이 방출되었습니다.');
        await refetch();
        setOpen(false);
      }),
    );
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="w-[120px]" disabled={isPending}>
          그룹원 방출
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-sm border-transparent shadow-[0px_0px_8px_0px_rgba(0,0,0,0.25)] sm:max-w-sm">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">
            그룹원 방출
          </AlertDialogTitle>
          <AlertDialogDescription>
            누구를 방출하시겠습니까?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Command>
          <CommandInput placeholder="검색" className="h-9" />
          <CommandList>
            <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
            <CommandGroup>
              {members.map(member => (
                <CommandItem
                  key={member.memberId}
                  value={`${member.memberId}`}
                  onSelect={value => {
                    setSelectedMemberId(Number(value));
                  }}
                >
                  {member.userName}
                  <Check
                    className={cn(
                      'ml-auto',
                      member.memberId === selectedMemberId
                        ? 'opacity-100'
                        : 'opacity-0',
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
        <AlertDialogFooter className="sm:justify-center">
          <Button variant="secondary" onClick={() => setOpen(false)}>
            취소
          </Button>
          <Button onClick={handleBanMember} disabled={isPending}>
            방출
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
