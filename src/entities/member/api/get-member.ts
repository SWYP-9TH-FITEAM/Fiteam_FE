import {apiWithAuth} from '@/shared/api/client';
import {validateSchema} from '@/shared/api/validate';
import {
  getMemberGroupIdMembersResponseDto,
  getMemberGroupIdPositionsResponseDto,
  getMemberMyprofileMiniResponseDto,
  getMemberProfileMemberIdResponseDto,
  getMemberProfileMyResponseDto,
} from './dto';
import {HTTPError} from 'ky';

export const getMemberPositionsByGroupId = async (groupId: number) => {
  const ENDPOINT = `v1/member/${groupId}/positions`;

  const response = await apiWithAuth.get(ENDPOINT).json();

  return validateSchema({
    dto: response,
    schema: getMemberGroupIdPositionsResponseDto,
    schemaName: ENDPOINT,
  });
};

export const getMembersByGroupId = async (groupId: number) => {
  const ENDPOINT = `v1/member/${groupId}/members`;

  const response = await apiWithAuth.get(ENDPOINT).json();

  return validateSchema({
    dto: response,
    schema: getMemberGroupIdMembersResponseDto,
    schemaName: ENDPOINT,
  });
};

export const getMemberProfileByMemberId = async (memberId: number) => {
  const ENDPOINT = `v1/member/profile/${memberId}`;

  const response = await apiWithAuth.get(ENDPOINT).json();

  return validateSchema({
    dto: response,
    schema: getMemberProfileMemberIdResponseDto,
    schemaName: ENDPOINT,
  });
};

export const getMemberMyProfile = async (groupId: number) => {
  const ENDPOINT = `v1/member/${groupId}/profile/my`;

  try {
    const response = await apiWithAuth.get(ENDPOINT).json();

    return validateSchema({
      dto: response,
      schema: getMemberProfileMyResponseDto,
      schemaName: ENDPOINT,
    });
  } catch (e) {
    if (e instanceof HTTPError && e.response.status === 400) {
      const message = await e.response.text();
      if (message === '해당 유저의 그룹 프로필이 없습니다.') return null;
    }

    throw e;
  }
};

export const getMemberMyProfileMini = async (groupId: number) => {
  const ENDPOINT = `v1/member/${groupId}/profile/mini`;

  const response = await apiWithAuth.get(ENDPOINT).json();

  return validateSchema({
    dto: response,
    schema: getMemberMyprofileMiniResponseDto,
    schemaName: ENDPOINT,
  });
};
