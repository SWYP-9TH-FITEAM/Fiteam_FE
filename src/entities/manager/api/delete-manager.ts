import {apiWithAuth} from '@/shared/api/client';

export const deleteManagerNotice = async (noticeId: number) => {
  const ENDPOINT = `v1/manager/notices/${noticeId}`;

  return apiWithAuth.delete(ENDPOINT);
};
