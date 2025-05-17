import {apiWithAuth} from '@/shared/api/client';
import {validateSchema} from '@/shared/api/validate';
import {z} from 'zod';

const getPositionsResponseDto = z.array(z.string());

export const getPositions = async (groupId: number): Promise<string[]> => {
  const ENDPOINT = `v1/member/${groupId}/positions`;
  try {
    const response = await apiWithAuth.get(ENDPOINT).json();
    return validateSchema({
      dto: response,
      schema: getPositionsResponseDto,
      schemaName: ENDPOINT,
    });
  } catch (error) {
    console.error('API 호출 오류:', error);

    throw error;
  }
};
