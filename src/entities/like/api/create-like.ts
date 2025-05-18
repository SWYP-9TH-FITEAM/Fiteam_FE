import type {PostLikeAddRequestDto} from './dto';

import {apiWithAuth} from '@/shared/api/client';
import {postLikeAddRequestDto} from './dto';

export const postLikeAdd = (payload: PostLikeAddRequestDto) => {
  const ENDPOINT = 'v1/like/add';

  const json = postLikeAddRequestDto.parse(payload);

  return apiWithAuth.post(ENDPOINT, {json});
};
