import type {LoginFormSchema} from '@/entities/auth/model/form';

import * as React from 'react';
import {Input} from '@heroui/react';
import {zodResolver} from '@hookform/resolvers/zod';
import {Controller, useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';

import logo from '@/assets/images/logo.png';
import {Button} from '@/components/ui/button';
import {postAuthLogin} from '@/entities/auth/api';
import {loginFormSchema} from '@/entities/auth/model/form';
import {postSaveCard} from '@/entities/user/api/savecard';
import {useSetToken} from '@/shared/model/auth';
import {useSetUserInfo} from '@/shared/model/user';
import {withHandleError} from '@/shared/util/handle-error';

export const LoginPage: React.FC = () => {
  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const setToken = useSetToken();
  const setUserInfo = useSetUserInfo();

  const [isPending, startTransition] = React.useTransition();

  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate('/sign-up');
  };

  const handleFindPasswordClick = () => {
    navigate('/change-password');
  };

  const handleSubmit = (data: LoginFormSchema) => {
    if (isPending) return;

    startTransition(
      withHandleError(async () => {
        const {token, type} = await postAuthLogin({
          email: data.email,
          password: data.password,
        });

        setToken(token);
        setUserInfo({email: data.email, type});
        const testResult = localStorage.getItem('test-scores');

        if (type === 'manager') {
          navigate('/manager');
          return;
        }

        if (testResult) {
          await postSaveCard({scores: JSON.parse(testResult)});
          navigate('/result');
        } else {
          navigate('/home');
        }
      }),
    );
  };

  return (
    <div className="flex flex-col items-center justify-center p-5">
      <img src={logo} alt="Fiteam logo" className="my-14 h-[35px]" />

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
            onClick={handleFindPasswordClick}
            disabled={isPending}
          >
            비밀번호 변경
          </button>
        </div>

        <div className="mt-16 flex flex-col gap-3">
          <Button
            type="submit"
            className="h-[3.375rem] w-full"
            disabled={isPending}
          >
            로그인
          </Button>

          <Button
            type="button"
            className="h-[3.375rem] w-full bg-[#f4f4f5]"
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
