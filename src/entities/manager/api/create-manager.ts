import type {PostManagerNewNoticeRequestDto} from './dto';

import {apiWithAuth} from '@/shared/api/client';
import {postManagerNewNoticeRequestDto} from './dto';

export const postManagerNewNotice = async (
  payload: PostManagerNewNoticeRequestDto,
) => {
  const ENDPOINT = `v1/manager/new-notice`;

  const json = postManagerNewNoticeRequestDto.parse(payload);

  return apiWithAuth.post(ENDPOINT, {json});
};
