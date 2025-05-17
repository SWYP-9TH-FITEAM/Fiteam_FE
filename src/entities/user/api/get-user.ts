import {apiWithAuth} from '@/shared/api/client';
import {validateSchema} from '@/shared/api/validate';
import {
  getUserCardIdsResponseDto,
  getUserCardResponseDto,
  getUserGroupsAcceptedResponseDto,
  getUserGroupsPendingResponseDto,
  getUserMiniResultResponseDto,
  getUserNameImgJobResponseDto,
  getUserSettingsResponseDto,
} from './dto';

export const getUserCard = async () => {
  const ENDPOINT = 'v1/user/card';

  const response = await apiWithAuth.get(ENDPOINT).json();

  return validateSchema({
    dto: response,
    schema: getUserCardResponseDto,
    schemaName: ENDPOINT,
  });
};

export const getUserNameImgJob = async () => {
  const ENDPOINT = 'v1/user/name-img-job';

  const response = await apiWithAuth.get(ENDPOINT).json();

  return validateSchema({
    dto: response,
    schema: getUserNameImgJobResponseDto,
    schemaName: ENDPOINT,
  });
};

export const getUserSettings = async () => {
  const ENDPOINT = 'v1/user/settings';

  const response = await apiWithAuth.get(ENDPOINT).json();

  return validateSchema({
    dto: response,
    schema: getUserSettingsResponseDto,
    schemaName: ENDPOINT,
  });
};

export const getUserMiniResult = async () => {
  const ENDPOINT = 'v1/user/mini-result';

  const response = await apiWithAuth.get(ENDPOINT).json();

  return validateSchema({
    dto: response,
    schema: getUserMiniResultResponseDto,
    schemaName: ENDPOINT,
  });
};

export const getUserGroupsAccepted = async () => {
  const ENDPOINT = 'v1/user/groups/accepted';

  const response = await apiWithAuth.get(ENDPOINT).json();

  return validateSchema({
    dto: response,
    schema: getUserGroupsAcceptedResponseDto,
    schemaName: ENDPOINT,
  });
};

export const getUserGroupsPending = async () => {
  const ENDPOINT = 'v1/user/groups/pending';

  const response = await apiWithAuth.get(ENDPOINT).json();

  return validateSchema({
    dto: response,
    schema: getUserGroupsPendingResponseDto,
    schemaName: ENDPOINT,
  });
};

export const getUserCardIds = async () => {
  const ENDPOINT = 'v1/user/card-ids';

  const response = await apiWithAuth.get(ENDPOINT).json();

  return validateSchema({
    dto: response,
    schema: getUserCardIdsResponseDto,
    schemaName: ENDPOINT,
  });
};
