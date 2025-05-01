import * as React from 'react';
import {Button} from '@/components/ui/button';
import {useNavigate} from 'react-router-dom';
import {ChevronLeft, Eye, EyeOff} from 'lucide-react';
import {zodResolver} from '@hookform/resolvers/zod';
import {Controller, useForm} from 'react-hook-form';
import {signUpFormSchema, SignUpFormSchema} from '@/entities/auth/model/form';
import {Input} from '@heroui/react';
import {cn} from '@/lib/utils';
import {
  postAuthSendVerificationCode,
  postAuthSignUp,
  postAuthVerifyCode,
} from '@/entities/auth/api';
import {withHandleError} from '@/shared/util/handle-error';
import {toast} from 'sonner';

export const SignUpPage: React.FC = () => {
  const form = useForm<SignUpFormSchema>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
      verificationCode: '',
    },
    mode: 'onChange',
  });

  const [isPending, startTransition] = React.useTransition();

  const navigate = useNavigate();

  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const [isVerifyButtonDisabled, setIsVerifyButtonDisabled] =
    React.useState(false);

  const verifyButtonDisableTimerRef = React.useRef<ReturnType<
    typeof setTimeout
  > | null>(null);

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = (data: SignUpFormSchema) => {
    if (isPending) return;

    startTransition(
      withHandleError(async () => {
        await postAuthVerifyCode({
          email: data.email,
          code: data.verificationCode,
        });

        await postAuthSignUp({
          email: data.email,
          password: data.password,
          username: data.name,
        });
      }),
    );
  };

  const handleVerifyEmail = () => {
    const email = form.getValues('email');

    if (isPending || !email || isVerifyButtonDisabled) return;

    setIsVerifyButtonDisabled(true);

    startTransition(
      withHandleError(async () => {
        await postAuthSendVerificationCode({email});

        verifyButtonDisableTimerRef.current = setTimeout(() => {
          setIsVerifyButtonDisabled(false);
        }, 60 * 1000);

        toast.success('인증번호가 발송되었습니다.');
      }),
    );
  };

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

  return (
    <div className="flex flex-col">
      <div className="flex items-center px-3 py-2.5 gap-2.5">
        <button onClick={handleBack}>
          <ChevronLeft className="w-6 h-6 stroke-[1.5]" />
        </button>
        <div className="text-xl font-medium">회원가입</div>
      </div>

      <div className="flex flex-col items-center justify-center p-5">
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-6 self-stretch"
        >
          <div className="flex flex-col gap-4 text-left">
            <Controller
              name="name"
              control={form.control}
              render={({field, fieldState: {invalid, error}}) => (
                <Input
                  type="text"
                  label="이름"
                  isInvalid={invalid}
                  errorMessage={error?.message}
                  {...field}
                />
              )}
            />

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
                />
              )}
            />

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
                      !!field.value && !invalid && 'text-[#4971FF]',
                    ),
                  }}
                  {...field}
                />
              )}
            />
          </div>

          <div className="flex flex-col gap-3 mt-16">
            <Button
              type="submit"
              className="w-full h-[3.375rem]"
              disabled={isPending}
            >
              가입하기
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
