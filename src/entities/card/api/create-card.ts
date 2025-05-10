import {api} from '@/shared/api/client';
import {validateSchema} from '@/shared/api/validate';
import {GetCardResponseDto, getCardResponseDto} from './dto';

/**
 * 카드 아이디로 카드 정보를 조회하는 API
 * @param cardId 조회할 카드 ID . /v1/question/unauth/test-result 에서 응답값 중 cardId 사용
 * @returns 카드 상세 정보
 */
export const getCardById = async (
  cardId: number,
): Promise<GetCardResponseDto> => {
  const ENDPOINT = `v1/card/${cardId}`;

  try {
    const response = await api.get(ENDPOINT).json();

    return validateSchema({
      dto: response,
      schema: getCardResponseDto,
      schemaName: ENDPOINT,
    });
  } catch (error) {
    console.error('카드 정보 조회 오류:', error);
    throw error;
  }
};
