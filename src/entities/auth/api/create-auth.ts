import {api} from '@/shared/api/client';
import {
  postAuthLoginRequestDto,
  PostAuthLoginRequestDto,
  postAuthLoginResponseDto,
} from './dto';
import {validateSchema} from '@/shared/api/validate';

const POST_AUTH_LOGIN_ENDPOINT = 'v1/auth/login';
export const postAuthLogin = async (payload: PostAuthLoginRequestDto) => {
  const json = postAuthLoginRequestDto.parse(payload);

  const response = await api.post(POST_AUTH_LOGIN_ENDPOINT, {json});

  return validateSchema({
    dto: response,
    schema: postAuthLoginResponseDto,
    schemaName: POST_AUTH_LOGIN_ENDPOINT,
  });
};
