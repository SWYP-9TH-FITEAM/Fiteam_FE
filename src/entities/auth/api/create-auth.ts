import {api} from '@/shared/api/client';
import {
  postAuthLoginRequestDto,
  PostAuthLoginRequestDto,
  postAuthLoginResponseDto,
  PostAuthResetPasswordRequestDto,
  postAuthResetPasswordRequestDto,
  PostAuthSendVerificationCodeRequestDto,
  postAuthSendVerificationCodeRequestDto,
  postAuthSignUpRequestDto,
  PostAuthSignUpRequestDto,
  PostAuthVerifyCodeRequestDto,
  postAuthVerifyCodeRequestDto,
} from './dto';
import {validateSchema} from '@/shared/api/validate';
import {z} from 'zod';

export const postAuthLogin = async (payload: PostAuthLoginRequestDto) => {
  const ENDPOINT = 'v1/auth/login';

  const json = postAuthLoginRequestDto.parse(payload);

  const response = await api.post(ENDPOINT, {json}).json();

  return validateSchema({
    dto: response,
    schema: postAuthLoginResponseDto,
    schemaName: ENDPOINT,
  });
};

export const postAuthSignUp = async (payload: PostAuthSignUpRequestDto) => {
  const ENDPOINT = 'v1/auth/register';

  const json = postAuthSignUpRequestDto.parse(payload);

  const response = await api.post(ENDPOINT, {json}).text();

  return validateSchema({
    dto: response,
    schema: z.string(),
    schemaName: ENDPOINT,
  });
};

export const postAuthSendVerificationCode = async (
  payload: PostAuthSendVerificationCodeRequestDto,
) => {
  const ENDPOINT = 'v1/auth/send-verification-code';

  const json = postAuthSendVerificationCodeRequestDto.parse(payload);

  const response = await api.post(ENDPOINT, {json}).text();

  return validateSchema({
    dto: response,
    schema: z.string(),
    schemaName: ENDPOINT,
  });
};

export const postAuthVerifyCode = async (
  payload: PostAuthVerifyCodeRequestDto,
) => {
  const ENDPOINT = 'v1/auth/verify-code';

  const json = postAuthVerifyCodeRequestDto.parse(payload);

  const response = await api.post(ENDPOINT, {json}).text();

  return validateSchema({
    dto: response,
    schema: z.string(),
    schemaName: ENDPOINT,
  });
};

export const postAuthResetPassword = async (
  payload: PostAuthResetPasswordRequestDto,
) => {
  const ENDPOINT = 'v1/auth/reset-password';

  const json = postAuthResetPasswordRequestDto.parse(payload);

  const response = await api.post(ENDPOINT, {json}).text();

  return validateSchema({
    dto: response,
    schema: z.string(),
    schemaName: ENDPOINT,
  });
};
