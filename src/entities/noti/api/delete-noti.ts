import {apiWithAuth} from '@/shared/api/client';

export const deleteNotiById = (id: number) => {
  const ENDPOINT = `/v1/noti/${id}`;

  return apiWithAuth.delete(ENDPOINT);
};
