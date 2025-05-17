import {apiWithAuth} from '@/shared/api/client';
import {validateSchema} from '@/shared/api/validate';
import {
  getMemberGroupIdMembersResponseDto,
  getMemberGroupIdPositionsResponseDto,
  getMemberMyprofileMiniResponseDto,
  getMemberProfileMemberIdResponseDto,
  getMemberProfileMyResponseDto,
} from './dto';

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

  const response = await apiWithAuth.get(ENDPOINT).json();

  return validateSchema({
    dto: response,
    schema: getMemberProfileMyResponseDto,
    schemaName: ENDPOINT,
  });
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
