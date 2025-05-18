import {HTTPError} from 'ky';

import {apiWithAuth} from '@/shared/api/client';

export const deleteTeamLeave = async (teamId: number) => {
  try {
    await apiWithAuth.delete(`v1/team/${teamId}/leave`);
  } catch (e) {
    if (e instanceof HTTPError) {
      throw new Error(await e.response.text());
    }
    throw e;
  }
};

export const deleteTeamRequestReject = (groupId: number, senderId: number) => {
  return apiWithAuth.delete(`v1/team/request/reject/${groupId}/${senderId}`);
};
