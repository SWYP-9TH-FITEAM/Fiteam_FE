import {apiWithAuth} from '@/shared/api/client';
import {validateSchema} from '@/shared/api/validate';
import {getLikeListResponseDto, getLikeMemoByLikeIdResponseDto} from './dto';

export const getLikeMemoByLikeId = async (likeId: number) => {
  const ENDPOINT = `v1/like/${likeId}/memo`;

  const response = await apiWithAuth.get(ENDPOINT).json();

  return validateSchema({
    dto: response,
    schema: getLikeMemoByLikeIdResponseDto,
    schemaName: ENDPOINT,
  });
};

export const getLikeList = async () => {
  const ENDPOINT = 'v1/like/list';

  const response = await apiWithAuth.get(ENDPOINT).json();

  return validateSchema({
    dto: response,
    schema: getLikeListResponseDto,
    schemaName: ENDPOINT,
  });
};
