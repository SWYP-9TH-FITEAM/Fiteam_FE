import {z} from 'zod';

export const postAuthLoginRequestDto = z.object({
  email: z.string(),
  password: z.string(),
});

export type PostAuthLoginRequestDto = z.infer<typeof postAuthLoginRequestDto>;

export const postAuthLoginResponseDto = z.object({
  type: z.enum(['user', 'manager']),
  token: z.string(),
});

export type PostAuthLoginResponseDto = z.infer<typeof postAuthLoginResponseDto>;

export const postAuthSignUpRequestDto = z.object({
  username: z.string(),
  email: z.string(),
  password: z.string(),
});

export type PostAuthSignUpRequestDto = z.infer<typeof postAuthSignUpRequestDto>;

export const postAuthSendVerificationCodeRequestDto = z.object({
  email: z.string(),
});

export type PostAuthSendVerificationCodeRequestDto = z.infer<
  typeof postAuthSendVerificationCodeRequestDto
>;

export const postAuthVerifyCodeRequestDto = z.object({
  email: z.string(),
  code: z.string(),
});

export type PostAuthVerifyCodeRequestDto = z.infer<
  typeof postAuthVerifyCodeRequestDto
>;

export const postAuthResetPasswordRequestDto = z.object({
  email: z.string(),
  newPassword: z.string(),
  code: z.string(),
});

export type PostAuthResetPasswordRequestDto = z.infer<
  typeof postAuthResetPasswordRequestDto
>;
