import type {LoginFormSchema} from '@/entities/auth/model/form';

import * as React from 'react';
import {Input} from '@heroui/react';
import {zodResolver} from '@hookform/resolvers/zod';
import {Controller, useForm} from 'react-hook-form';
import {Link, useNavigate} from 'react-router-dom';

import login1 from '@/assets/images/login-1.png';
import login2 from '@/assets/images/login-2.png';
import login3 from '@/assets/images/login-3.png';
import login4 from '@/assets/images/login-4.png';
import loginCharacter1 from '@/assets/images/login-character-1.png';
import loginCharacter2 from '@/assets/images/login-character-2.png';
import {Button} from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {Separator} from '@/components/ui/separator';
import {postAuthLogin} from '@/entities/auth/api';
import {loginFormSchema} from '@/entities/auth/model/form';
import {useSetToken} from '@/shared/model/auth';
import {useSetUserInfo} from '@/shared/model/user';
import {Footer} from '@/shared/ui/desktop/Footer';
import {Header} from '@/shared/ui/desktop/Header';
import {Main} from '@/shared/ui/desktop/Main';
import {withHandleError} from '@/shared/util/handle-error';

export const DesktopLoginPage: React.FC = () => {
  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [isPending, startTransition] = React.useTransition();

  const setToken = useSetToken();
  const setUserInfo = useSetUserInfo();
  const navigate = useNavigate();

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

        if (type === 'user') {
          navigate('/home');
          return;
        }

        navigate('/manager');
      }),
    );
  };

  return (
    <>
      <Header>
        <Link
          to="/manager"
          className="border-gray-3 flex h-12 rounded-[30px] border px-4 py-3 text-base font-medium tracking-[-0.4px]"
        >
          Fiteam 홈 바로가기
        </Link>
      </Header>
      <Main classNames={{main: 'bg-gray-1', content: 'px-4'}}>
        <div className="mt-16 flex rounded-[40px] bg-white drop-shadow-[0px_0px_4px_rgba(0,0,0,0.25))]">
          <div className="relative max-w-[576px] px-20 pt-14 pb-20">
            <Carousel className="z-[1] w-full">
              <CarouselContent className="ml-0">
                <CarouselItem>
                  <img
                    src={login1}
                    alt="login1"
                    className="mx-auto h-[650px]"
                  />
                </CarouselItem>
                <CarouselItem>
                  <img
                    src={login2}
                    alt="login2"
                    className="mx-auto h-[650px]"
                  />
                </CarouselItem>
                <CarouselItem>
                  <img
                    src={login3}
                    alt="login3"
                    className="mx-auto h-[650px]"
                  />
                </CarouselItem>
                <CarouselItem>
                  <img
                    src={login4}
                    alt="login4"
                    className="mx-auto h-[650px]"
                  />
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>

            <img
              src={loginCharacter1}
              alt="loginCharacter1"
              className="absolute bottom-14 left-14 z-[2] h-[284px]"
            />
            <img
              src={loginCharacter2}
              alt="loginCharacter2"
              className="absolute top-0 -right-12 z-0 h-[273px]"
            />
          </div>

          <Separator
            orientation="vertical"
            className="bg-gray-3 my-auto data-[orientation=vertical]:h-[700px]"
          />

          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="mx-auto my-auto flex w-[330px] flex-col gap-6 self-stretch"
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
                    variant="bordered"
                    classNames={{inputWrapper: 'border-1 rounded-sm'}}
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
                    variant="bordered"
                    classNames={{inputWrapper: 'border-1 rounded-sm'}}
                    {...field}
                  />
                )}
              />
            </div>

            <Button
              type="submit"
              disabled={isPending}
              className="h-[54px] text-xl font-medium tracking-[-0.5px]"
            >
              {isPending && (
                <div className="loading loading-spinner loading-sm" />
              )}
              로그인
            </Button>

            <div className="flex justify-center space-x-2 text-[13px] text-[#767676]">
              <Link
                to="/manager/change-password"
                type="button"
                className="hover:!underline"
              >
                비밀번호 변경
              </Link>
            </div>
          </form>
        </div>
      </Main>
      <Footer />
    </>
  );
};
