import {apiWithAuth} from '@/shared/api/client';

export const deleteGroup = (groupId: number) => {
  const ENDPOINT = `v1/group/${groupId}`;

  return apiWithAuth.delete(ENDPOINT);
};

export const deleteGroupInviteCancel = (groupId: number) => {
  const ENDPOINT = `v1/group/${groupId}/cancel`;

  return apiWithAuth.delete(ENDPOINT);
};
