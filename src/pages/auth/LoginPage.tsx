import * as React from 'react';

import {Button} from '@/components/ui/button';
import {useNavigate} from 'react-router-dom';
import logo from '@/assets/images/logo.png';
import {Input} from '@heroui/react';
import {Controller, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {loginFormSchema, LoginFormSchema} from '@/entities/auth/model/form';
import {postAuthLogin} from '@/entities/auth/api';
import {withHandleError} from '@/shared/util/handle-error';

export const LoginPage: React.FC = () => {
  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [isPending, startTransition] = React.useTransition();

  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate('/sign-up');
  };

  const handleFindEmailClick = () => {
    navigate('/find-email');
  };

  const handleFindPasswordClick = () => {
    navigate('/find-password');
  };

  const handleSubmit = (data: LoginFormSchema) => {
    if (isPending) return;

    startTransition(
      withHandleError(async () => {
        await postAuthLogin({
          email: data.email,
          password: data.password,
        });

        navigate('/');
      }),
    );
  };

  return (
    <div className="flex flex-col items-center justify-center p-5">
      <img src={logo} alt="Fiteam logo" className="h-[35px] my-14" />

      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-6 self-stretch"
      >
        <div className="flex flex-col gap-4 text-left">
          <Controller
            name="email"
            control={form.control}
            render={({field, fieldState: {invalid, error}}) => (
              <Input
                type="email"
                label="이메일"
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
                type="password"
                label="비밀번호"
                isInvalid={invalid}
                errorMessage={error?.message}
                {...field}
              />
            )}
          />
        </div>

        <div className="flex justify-center space-x-2 text-[13px] text-[#767676]">
          <button
            type="button"
            className="hover:underline"
            onClick={handleFindEmailClick}
            disabled={isPending}
          >
            이메일 찾기
          </button>
          <div className="h-1 w-1 bg-[#E9E9E9] rounded-full self-center"></div>
          <button
            type="button"
            className="hover:underline"
            onClick={handleFindPasswordClick}
            disabled={isPending}
          >
            비밀번호 찾기
          </button>
        </div>

        <div className="flex flex-col gap-3 mt-16">
          <Button
            type="submit"
            className="w-full h-[3.375rem]"
            disabled={isPending}
          >
            로그인
          </Button>

          <Button
            type="button"
            className="w-full h-[3.375rem] bg-[#f4f4f5]"
            variant="secondary"
            onClick={handleSignUpClick}
            disabled={isPending}
          >
            회원가입
          </Button>
        </div>
      </form>
    </div>
  );
};
