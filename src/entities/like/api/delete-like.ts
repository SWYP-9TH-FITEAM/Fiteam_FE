import {apiWithAuth} from '@/shared/api/client';

export const deleteLikeUnlike = (likeId: number) => {
  const ENDPOINT = `v1/like/unlike/${likeId}`;

  return apiWithAuth.delete(ENDPOINT);
};
