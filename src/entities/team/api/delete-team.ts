import {apiWithAuth} from '@/shared/api/client';

export const deleteTeamLeave = (teamId: number) => {
  return apiWithAuth.delete(`v1/team/${teamId}/leave`);
};

export const deleteTeamRequestReject = (groupId: number, senderId: number) => {
  return apiWithAuth.delete(`v1/team/request/reject/${groupId}/${senderId}`);
};
