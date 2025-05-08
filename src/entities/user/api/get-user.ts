import {apiWithAuth} from '@/shared/api/client';
import {validateSchema} from '@/shared/api/validate';
import {
  getUserCardResponseDto,
  getUserGroupsAcceptedResponseDto,
  getUserNameImgJobResponseDto,
  getUserSettingsResponseDto,
} from './dto';

export const getUserAcceptedGroups = async () => {
  const ENDPOINT = 'v1/user/groups/accepted';

  const response = await apiWithAuth.get(ENDPOINT).json();

  return validateSchema({
    dto: response,
    schema: getUserGroupsAcceptedResponseDto,
    schemaName: ENDPOINT,
  });
};

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
