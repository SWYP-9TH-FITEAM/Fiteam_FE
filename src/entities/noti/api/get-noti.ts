import {apiWithAuth} from '@/shared/api/client';
import {validateSchema} from '@/shared/api/validate';
import {getNotiAllResponseDto, getNotiByIdResponseDto} from './dto';

export const getNotiById = async (id: number) => {
  const ENDPOINT = `v1/noti/${id}`;

  const response = await apiWithAuth.get(ENDPOINT).json();

  return validateSchema({
    dto: response,
    schema: getNotiByIdResponseDto,
    schemaName: ENDPOINT,
  });
};

export const getNotiAll = async () => {
  const ENDPOINT = 'v1/noti/all';

  const response = await apiWithAuth.get(ENDPOINT).json();

  return validateSchema({
    dto: response,
    schema: getNotiAllResponseDto,
    schemaName: ENDPOINT,
  });
};
