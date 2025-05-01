import {z} from 'zod';

export const postAuthLoginRequestDto = z.object({
  email: z.string(),
  password: z.string(),
});

export type PostAuthLoginRequestDto = z.infer<typeof postAuthLoginRequestDto>;

export const postAuthLoginResponseDto = z.object({
  type: z.string(),
  token: z.string(),
});

export type PostAuthLoginResponseDto = z.infer<typeof postAuthLoginResponseDto>;
