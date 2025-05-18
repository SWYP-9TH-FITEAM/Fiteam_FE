import {HTTPError} from 'ky';

import {apiWithAuth} from '@/shared/api/client';
import {validateSchema} from '@/shared/api/validate';
import {
  getTeamBuildingStatusResponseDto,
  getTeamContactsResponseDto,
  getTeamMyTeamResponseDto,
  getTeamRequestFromUserIdResponseDto,
  getTeamRequestReceivedResponseDto,
  getTeamSenderIdGroupIdResponseDto,
} from './dto';

export const getTeamContacts = async (teamId: number) => {
  const ENDPOINT = `v1/team/${teamId}/contacts`;

  const response = await apiWithAuth.get(ENDPOINT).json();

  return validateSchema({
    dto: response,
    schema: getTeamContactsResponseDto,
    schemaName: ENDPOINT,
  });
};

export const getTeamBySenderIdGroupId = async (
  senderId: number,
  groupId: number,
) => {
  const ENDPOINT = `v1/team/${senderId}/${groupId}`;

  const response = await apiWithAuth.get(ENDPOINT).json();

  return validateSchema({
    dto: response,
    schema: getTeamSenderIdGroupIdResponseDto,
    schemaName: ENDPOINT,
  });
};

export const getTeamBuildingStatus = async (groupId: number) => {
  const ENDPOINT = `v1/team/teambuildingstatus/${groupId}`;

  const response = await apiWithAuth.get(ENDPOINT).json();

  return validateSchema({
    dto: response,
    schema: getTeamBuildingStatusResponseDto,
    schemaName: ENDPOINT,
  });
};

export const getTeamRequestReceived = async () => {
  const ENDPOINT = `v1/team/request/received`;

  const response = await apiWithAuth.get(ENDPOINT).json();

  return validateSchema({
    dto: response,
    schema: getTeamRequestReceivedResponseDto,
    schemaName: ENDPOINT,
  });
};

export const getTeamRequestFromUserId = async (userId: number) => {
  const ENDPOINT = `v1/team/request/from/${userId}`;

  const response = await apiWithAuth.get(ENDPOINT).json();

  return validateSchema({
    dto: response,
    schema: getTeamRequestFromUserIdResponseDto,
    schemaName: ENDPOINT,
  });
};

export const getTeamMyTeam = async (groupId: number) => {
  const ENDPOINT = `v1/team/myteam/${groupId}`;

  try {
    const response = await apiWithAuth.get(ENDPOINT).json();

    return validateSchema({
      dto: response,
      schema: getTeamMyTeamResponseDto,
      schemaName: ENDPOINT,
    });
  } catch (e) {
    if (e instanceof HTTPError && e.response.status === 400) {
      const message = await e.response.text();
      if (message === '해당 그룹에 속한 팀이 없습니다.') return null;
    }

    throw e;
  }
};
