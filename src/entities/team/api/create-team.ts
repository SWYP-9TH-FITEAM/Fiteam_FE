import {apiWithAuth} from '@/shared/api/client';

export const postTeamRequest = (groupId: number, receiverId: number) => {
  return apiWithAuth.post(`v1/team/request/${groupId}/${receiverId}`);
};

export const postTeamRequestAccept = (groupId: number, senderId: number) => {
  return apiWithAuth.post(`v1/team/request/accept/${groupId}/${senderId}`);
};
