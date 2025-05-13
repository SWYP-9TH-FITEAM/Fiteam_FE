import {apiWithAuth} from '@/shared/api/client';

export const patchTeamLeader = (teamId: number, newMasterId: number) => {
  return apiWithAuth.patch(`v1/team/${teamId}/leader/${newMasterId}`);
};

export const patchTeamConfirm = (teamId: number) => {
  return apiWithAuth.patch(`v1/team/${teamId}/confirm`);
};
