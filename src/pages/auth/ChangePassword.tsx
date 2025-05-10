import {Button} from '@/components/ui/button';
import {LayoutBottomBar} from '@/layouts/LayoutBottomBar';
import {cn} from '@/lib/utils';
import {withHandleError} from '@/shared/util/handle-error';
import {Input} from '@heroui/react';
import {zodResolver} from '@hookform/resolvers/zod';
import {ChevronLeft, Eye, EyeOff} from 'lucide-react';
import * as React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import {z} from 'zod';

const changePasswordFormSchema = z
  .object({
    password: z
      .string()
      .min(8, {message: '비밀번호는 8자 이상이어야 합니다.'})
      .regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/, {
        message: '비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다.',
      }),
    passwordConfirm: z
      .string()
      .min(1, {message: '비밀번호를 한 번 더 입력해주세요.'}),
  })
  .refine(data => data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirm'],
  });

type ChangePasswordFormSchema = z.infer<typeof changePasswordFormSchema>;

export const ChangePassword: React.FC = () => {
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

  const [isPending, startTransition] = React.useTransition();

  const navigate = useNavigate();

  const form = useForm<ChangePasswordFormSchema>({
    resolver: zodResolver(changePasswordFormSchema),
    defaultValues: {
      password: '',
      passwordConfirm: '',
    },
  });

  const passwordVisibilityToggleButton = (
    <button
      type="button"
      className="my-auto"
      onClick={() => setIsPasswordVisible(prev => !prev)}
    >
      {isPasswordVisible ? (
        <EyeOff className="w-5 h-5 stroke-[1.5]" />
      ) : (
        <Eye className="w-5 h-5 stroke-[1.5]" />
      )}
    </button>
  );

  const handleSubmit = (data: ChangePasswordFormSchema) => {
    if (isPending) return;

    // TODO: Integrate API
    startTransition(
      withHandleError(async () => {
        console.log(data);
      }),
    );
  };

  return (
    <LayoutBottomBar
      classNames={{wrapper: 'bg-white'}}
      hideBottomBar
      header={
        <header className="px-3 py-2.5 flex gap-2.5">
          <button onClick={() => navigate(-1)}>
            <ChevronLeft className="w-6 h-6 stroke-[1.5]" />
          </button>
          <span className="text-xl tracking-[-0.5px] font-semibold">
            비밀번호 변경
          </span>
        </header>
      }
    >
      <form
        className="flex flex-col gap-5"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <Controller
          name="password"
          control={form.control}
          render={({field, fieldState: {invalid, error}}) => (
            <Input
              type={isPasswordVisible ? 'text' : 'password'}
              label="비밀번호"
              isInvalid={invalid}
              errorMessage={error?.message}
              className="mt-5"
              endContent={passwordVisibilityToggleButton}
              description={
                !!field.value && !invalid
                  ? '* 사용 가능한 비밀번호입니다.'
                  : '* 비밀번호는 8자 이상, 영문, 숫자, 특수문자를 포함해야 합니다.'
              }
              classNames={{
                description: cn(
                  'text-left',
                  !!field.value && !invalid && 'text-[#4971FF]',
                ),
              }}
              {...field}
            />
          )}
        />

        <Controller
          name="passwordConfirm"
          control={form.control}
          render={({field, fieldState: {invalid, error}}) => (
            <Input
              type={isPasswordVisible ? 'text' : 'password'}
              label="비밀번호 확인"
              isInvalid={invalid}
              errorMessage={error?.message}
              endContent={passwordVisibilityToggleButton}
              description={
                !!field.value && !invalid
                  ? '* 비밀번호가 일치합니다.'
                  : undefined
              }
              classNames={{
                description: cn(
                  'text-left',
                  !!field.value && !invalid && 'text-[#4971FF]',
                ),
              }}
              {...field}
            />
          )}
        />

        <div className="flex flex-col gap-3 mt-16">
          <Button
            type="submit"
            className="w-full h-[3.375rem]"
            disabled={isPending}
          >
            변경하기
          </Button>
        </div>
      </form>
    </LayoutBottomBar>
  );
};
