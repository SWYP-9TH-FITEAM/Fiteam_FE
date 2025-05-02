import {z} from 'zod';

export const loginFormSchema = z.object({
  email: z.string().email({message: '이메일 형식이 올바르지 않습니다.'}),
  password: z.string().min(8, {message: '비밀번호는 8자 이상이어야 합니다.'}),
});

export type LoginFormSchema = z.infer<typeof loginFormSchema>;

export const signUpFormSchema = z
  .object({
    name: z.string().min(1, {message: '이름을 입력해주세요.'}),
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

export type SignUpFormSchema = z.infer<typeof signUpFormSchema>;
