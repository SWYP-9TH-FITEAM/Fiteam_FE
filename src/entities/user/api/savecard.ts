import {
  postTestResultRequestDto,
  PostTestResultRequestDto,
} from '@/entities/question/api/dto';
import {apiWithAuth} from '@/shared/api/client';

// 실제 API 호출 함수 (응답값 없음)
// payload는 /v1/question/unauth/test-result 에서와 동일
export const postSaveCard = async (payload: PostTestResultRequestDto) => {
  const ENDPOINT = 'v1/user/savecard';

  const {scores} = postTestResultRequestDto.parse(payload);

  try {
    const response = await apiWithAuth.post(ENDPOINT, {json: scores});
    return response;
  } catch (error) {
    console.error('API 호출 오류:', error);

    throw error;
  }
};
