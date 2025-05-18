import {apiWithAuth} from '@/shared/api/client';
import {validateSchema} from '@/shared/api/validate';
import {getGroupGroupIdDataResponseDto} from './dto';

export const getGroupData = async (groupId: number) => {
  const ENDPOINT = `v1/group/${groupId}/data`;

  const resposne = apiWithAuth.get(ENDPOINT).json();

  return validateSchema({
    dto: resposne,
    schema: getGroupGroupIdDataResponseDto,
    schemaName: ENDPOINT,
  });
};
