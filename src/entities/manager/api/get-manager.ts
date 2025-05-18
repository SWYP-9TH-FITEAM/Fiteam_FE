import {apiWithAuth} from '@/shared/api/client';
import {validateSchema} from '@/shared/api/validate';
import {
  getManagerGroupIdMembersResponseDto,
  getManagerGroupProcessResponseDto,
  getManagerGroupsAllResponseDto,
  getManagerGroupsIdNameResponseDto,
  getManagerNameResponseDto,
} from './dto';

export const getManagerName = async () => {
  const ENDPOINT = 'v1/manager/name';

  const response = await apiWithAuth.get(ENDPOINT).json();

  return validateSchema({
    dto: response,
    schema: getManagerNameResponseDto,
    schemaName: ENDPOINT,
  });
};

export const getManagerGroupIdMembers = async (groupId: number) => {
  const ENDPOINT = `v1/manager/${groupId}/members`;

  const response = await apiWithAuth.get(ENDPOINT).json();

  return validateSchema({
    dto: response,
    schema: getManagerGroupIdMembersResponseDto,
    schemaName: ENDPOINT,
  });
};

export const getManagerGroupProcess = async () => {
  const ENDPOINT = `v1/manager/groups/process`;

  const response = await apiWithAuth.get(ENDPOINT).json();

  return validateSchema({
    dto: response,
    schema: getManagerGroupProcessResponseDto,
    schemaName: ENDPOINT,
  });
};

export const getManagerGroupsIdName = async () => {
  const ENDPOINT = `v1/manager/groups/id-name`;

  const response = await apiWithAuth.get(ENDPOINT).json();

  return validateSchema({
    dto: response,
    schema: getManagerGroupsIdNameResponseDto,
    schemaName: ENDPOINT,
  });
};

export const getManagerGroupsAll = async () => {
  const ENDPOINT = `v1/manager/groups/all`;

  const response = await apiWithAuth.get(ENDPOINT).json();

  return validateSchema({
    dto: response,
    schema: getManagerGroupsAllResponseDto,
    schemaName: ENDPOINT,
  });
};
