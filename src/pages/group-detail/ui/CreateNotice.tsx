import * as React from 'react';
import {Input, Textarea} from '@heroui/react';
import {zodResolver} from '@hookform/resolvers/zod';
import {Controller, useForm} from 'react-hook-form';
import {z} from 'zod';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {Button} from '@/components/ui/button';
import {postManagerNewNotice} from '@/entities/manager/api';
import {withHandleError} from '@/shared/util/handle-error';

interface CreateNoticeProps {
  groupId: number;
}

export const CreateNotice: React.FC<CreateNoticeProps> = ({groupId}) => {
  const [open, setOpen] = React.useState(false);
  const [isPending, startTransition] = React.useTransition();

  const form = useForm<CreateNoticeForm>({
    resolver: zodResolver(createNoticeSchema),
    defaultValues: {
      content: '',
    },
  });

  const formRef = React.useRef<HTMLFormElement>(null);

  const handleSubmit = (data: CreateNoticeForm) => {
    startTransition(
      withHandleError(async () => {
        await postManagerNewNotice({
          title: data.title,
          context: data.content,
          groupId,
        });
      }),
    );
  };

  const handleCreateNotice = () => {
    if (isPending) return;

    formRef.current?.requestSubmit();
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="w-[120px]" disabled={isPending}>
          공지 작성
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-sm border-transparent shadow-[0px_0px_8px_0px_rgba(0,0,0,0.25)] sm:max-w-sm">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">
            공지사항 작성
          </AlertDialogTitle>
        </AlertDialogHeader>

        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          ref={formRef}
          className="flex flex-col gap-4"
        >
          <Controller
            control={form.control}
            name="title"
            render={({field}) => <Input label="제목" {...field} />}
          />
          <Controller
            control={form.control}
            name="content"
            render={({field}) => <Textarea {...field} label="내용" />}
          />
        </form>

        <AlertDialogFooter className="sm:justify-center">
          <Button variant="secondary" onClick={() => setOpen(false)}>
            취소
          </Button>
          <Button onClick={handleCreateNotice} disabled={isPending}>
            전송
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const createNoticeSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
});

type CreateNoticeForm = z.infer<typeof createNoticeSchema>;
