import {Button} from '@/components/ui/button';
import {
  postAuthResetPassword,
  postAuthSendVerificationCode,
} from '@/entities/auth/api';
import {LayoutBottomBar} from '@/layouts/LayoutBottomBar';
import {cn} from '@/lib/utils';
import {useUserInfo} from '@/shared/model/user';
import {withHandleError} from '@/shared/util/handle-error';
import {Input} from '@heroui/react';
import {zodResolver} from '@hookform/resolvers/zod';
import {ChevronLeft, Eye, EyeOff} from 'lucide-react';
import * as React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import {toast} from 'sonner';
import {z} from 'zod';

const findPasswordFormSchema = z
  .object({
    email: z.string().email({message: '이메일 형식이 올바르지 않습니다.'}),
    verificationCode: z.string().min(1, {message: '인증번호를 입력해주세요.'}),
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

type FindPasswordFormSchema = z.infer<typeof findPasswordFormSchema>;

export const FindPasswordPage: React.FC = () => {
  const userInfo = useUserInfo();

  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

  const [isPending, startTransition] = React.useTransition();

  const navigate = useNavigate();

  const [isVerifyButtonDisabled, setIsVerifyButtonDisabled] =
    React.useState(false);

  const verifyButtonDisableTimerRef = React.useRef<ReturnType<
    typeof setTimeout
  > | null>(null);

  React.useEffect(() => {
    return () => {
      if (verifyButtonDisableTimerRef.current) {
        clearTimeout(verifyButtonDisableTimerRef.current);
      }
    };
  }, []);

  const form = useForm<FindPasswordFormSchema>({
    resolver: zodResolver(findPasswordFormSchema),
    mode: 'onChange',
    defaultValues: {
      email: userInfo?.email ?? '',
      password: '',
      passwordConfirm: '',
      verificationCode: '',
    },
  });

  const values = form.watch();

  React.useEffect(() => {
    console.log(values);
  }, [values]);

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

  const handleVerifyEmail = () => {
    const email = form.getValues('email');

    if (isPending || !email || isVerifyButtonDisabled) return;

    setIsVerifyButtonDisabled(true);

    startTransition(
      withHandleError(
        async () => {
          await postAuthSendVerificationCode({email});

          verifyButtonDisableTimerRef.current = setTimeout(() => {
            setIsVerifyButtonDisabled(false);
          }, 60 * 1000);

          toast.success('인증번호가 발송되었습니다.');
        },
        {
          errorHandler: () => {
            toast.error('인증번호 발송에 실패했습니다.');
            setIsVerifyButtonDisabled(false);
            if (verifyButtonDisableTimerRef.current) {
              clearTimeout(verifyButtonDisableTimerRef.current);
            }
          },
        },
      ),
    );
  };

  const handleSubmit = (data: FindPasswordFormSchema) => {
    if (isPending) return;

    startTransition(
      withHandleError(async () => {
        await postAuthResetPassword({
          email: data.email,
          code: data.verificationCode,
          newPassword: data.password,
        });

        form.reset();
        toast.success('비밀번호가 성공적으로 변경되었습니다.');
        navigate('/login');
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
          name="email"
          control={form.control}
          render={({field, fieldState: {invalid, error}}) => (
            <Input
              type="email"
              label="이메일"
              isInvalid={invalid}
              errorMessage={error?.message}
              className="mt-5"
              endContent={
                <Button
                  type="button"
                  variant="secondary"
                  className="bg-[#D9D9D9] rounded-lg px-2 py-1 min-h-fit text-sm font-medium h-[1.625rem] my-auto"
                  onClick={handleVerifyEmail}
                  disabled={isVerifyButtonDisabled || isPending}
                >
                  인증하기
                </Button>
              }
              classNames={{
                errorMessage: 'text-left',
              }}
              {...field}
            />
          )}
        />

        <Controller
          name="verificationCode"
          control={form.control}
          render={({field, fieldState: {invalid, error}}) => (
            <Input
              type="text"
              label="인증번호"
              isInvalid={invalid}
              errorMessage={error?.message}
              {...field}
              classNames={{
                errorMessage: 'text-left',
              }}
            />
          )}
        />

        <Controller
          name="password"
          control={form.control}
          render={({field, fieldState: {invalid, error}}) => (
            <Input
              type={isPasswordVisible ? 'text' : 'password'}
              label="새 비밀번호"
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
                errorMessage: 'text-left',
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
              label="새 비밀번호 확인"
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
                errorMessage: 'text-left',
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
