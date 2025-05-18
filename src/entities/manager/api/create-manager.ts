import type {PostManagerNewNoticeRequestDto} from './dto';

import {apiWithAuth} from '@/shared/api/client';
import {validateSchema} from '@/shared/api/validate';
import {
  postManagerNewNoticeRequestDto,
  postManagerNewNoticeResponseDto,
} from './dto';

export const postManagerNewNotice = async (
  payload: PostManagerNewNoticeRequestDto,
) => {
  const ENDPOINT = `v1/manager/new-notice`;

  const json = postManagerNewNoticeRequestDto.parse(payload);

  const response = await apiWithAuth.post(ENDPOINT, {json}).json();

  return validateSchema({
    dto: response,
    schema: postManagerNewNoticeResponseDto,
    schemaName: ENDPOINT,
  });
};
