import {apiWithAuth} from '@/shared/api/client';
import {postLikeAddRequestDto, PostLikeAddRequestDto} from './dto';

export const postLikeAdd = (payload: PostLikeAddRequestDto) => {
  const ENDPOINT = 'v1/like/add';

  const json = postLikeAddRequestDto.parse(payload);

  return apiWithAuth.post(ENDPOINT, {json});
};
