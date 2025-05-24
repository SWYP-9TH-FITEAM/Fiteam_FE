import type {GetManagerGroupsAllResponseDto} from '@/entities/manager/api';

import * as React from 'react';
import {Input} from '@heroui/react';
import {zodResolver} from '@hookform/resolvers/zod';
import {useQuery} from '@tanstack/react-query';
import {X} from 'lucide-react';
import {Controller, useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import {toast} from 'sonner';
import {z} from 'zod';

import {Button} from '@/components/ui/button';
import {postGroupInvite} from '@/entities/group/api';
import {managerQueries} from '@/entities/manager/api';
import ManagerHeader from '@/features/manager/layouts/ManagerHeader';
import LeftMenu from '@/pages/manager-team-building/ui/LeftMenu';
import {Footer} from '@/shared/ui/desktop/Footer';
import {Main} from '@/shared/ui/desktop/Main';
import {withHandleError} from '@/shared/util/handle-error';
import {GroupDropdown} from './GroupDropdown';

export const GroupInvite: React.FC = () => {
  const {data: groups} = useQuery(managerQueries.groupsAll());

  const [selectedGroup, setSelectedGroup] = React.useState<
    GetManagerGroupsAllResponseDto[number] | null
  >(null);

  const navigate = useNavigate();

  const [emails, setEmails] = React.useState<string[]>([]);

  const [isPending, startTransition] = React.useTransition();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {email: ''},
  });

  const handleSubmit = (data: FormSchema) => {
    if (emails.includes(data.email)) {
      toast.error('이미 추가된 이메일입니다.');
      form.reset();
      return;
    }

    setEmails(prev => [...prev, data.email]);
    form.reset();
  };

  const handleComplete = () => {
    if (emails.length === 0 || !selectedGroup) {
      if (!selectedGroup) {
        toast.error('그룹을 선택해주세요.');
      } else if (emails.length === 0) {
        toast.error('초대할 이메일을 추가해주세요.');
      }
      return;
    }

    startTransition(
      withHandleError(async () => {
        await postGroupInvite({emails, groupId: selectedGroup.groupId});
        toast.success('그룹원 초대가 완료되었습니다.');
        navigate('/manager/team-building');
      }),
    );
  };

  return (
    <>
      <ManagerHeader />
      <Main classNames={{main: 'bg-[#F9F9F9]'}}>
        <div className="flex flex-1">
          <LeftMenu />

          <main className="flex flex-1 flex-col gap-10 px-8 py-12">
            <div className="text-left text-2xl font-semibold">그룹원 초대</div>
            <div className="mx-auto flex w-full max-w-[700px] flex-col gap-10">
              <GroupDropdown
                groups={groups ?? []}
                onSelect={setSelectedGroup}
                selected={selectedGroup}
              />
              {selectedGroup && (
                <div className="flex flex-col gap-6">
                  <form
                    className="flex items-center gap-4"
                    onSubmit={form.handleSubmit(handleSubmit)}
                  >
                    <Controller
                      name="email"
                      control={form.control}
                      render={({field, fieldState: {invalid, error}}) => (
                        <Input
                          placeholder="이메일을 입력해주세요."
                          {...field}
                          isInvalid={invalid}
                          errorMessage={error?.message}
                        />
                      )}
                    />
                    <Button variant="secondary" className="bg-white">
                      추가
                    </Button>
                  </form>

                  <div className="divide-gray-2 flex min-h-12 flex-col divide-y rounded-xl bg-white p-4 shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]">
                    {emails.map(email => (
                      <div
                        key={email}
                        className="flex w-full items-center justify-between py-3"
                      >
                        <span className="text-lg font-medium">{email}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            setEmails(prev =>
                              prev.filter(target => target !== email),
                            )
                          }
                        >
                          <X />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-center gap-3.5">
              <Button
                variant="secondary"
                className="bg-gray-2 hover:bg-gray-2/70 h-[51px] px-[70px] py-1.5 text-2xl leading-[32px] tracking-[-0.6px]"
                onClick={() => navigate('/manager/team-building')}
                disabled={isPending}
              >
                취소
              </Button>

              <Button
                onClick={handleComplete}
                className="h-[51px] px-[70px] py-1.5 text-2xl leading-[32px] tracking-[-0.6px]"
                disabled={isPending}
              >
                {isPending ? (
                  <div className="loading loading-spinner" />
                ) : (
                  '완료'
                )}
              </Button>
            </div>
          </main>
        </div>
      </Main>
      <Footer />
    </>
  );
};

const formSchema = z.object({
  email: z.string().email({message: '이메일 형식이 올바르지 않습니다.'}),
});

type FormSchema = z.infer<typeof formSchema>;
