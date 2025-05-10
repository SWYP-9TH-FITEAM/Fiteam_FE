import {api} from '@/shared/api/client';
import {
  getQuestionsResponseDto,
  PostTestResultRequestDto,
  postTestResultRequestDto,
} from './dto';
import {validateSchema} from '@/shared/api/validate';

export const getAllQuestions = async () => {
  const ENDPOINT = 'v1/question/all';

  const response = await api.get(ENDPOINT).json();

  return validateSchema({
    dto: response,
    schema: getQuestionsResponseDto,
    schemaName: ENDPOINT,
  });
};

// 서버 응답에 대한 실제 인터페이스 정의 (서버 응답 로그 기반)
export interface TestResultResponse {
  cardId: number;
  numEI: number;
  numPD: number;
  numVA: number;
  numCL: number;
  [key: string]: unknown;
}

// 테스트 결과를 제출하는 API
export const postTestResult = async (payload: PostTestResultRequestDto) => {
  const ENDPOINT = 'v1/question/unauth/test-result';

  // payload에서 scores 배열을 직접 추출
  const {scores} = postTestResultRequestDto.parse(payload);

  try {
    // scores 배열을 직접 JSON 본문으로 전달해야함
    const response = (await api
      .post(ENDPOINT, {json: scores})
      .json()) as TestResultResponse;
    console.log('서버 응답 원본:', response);

    // 서버 응답을 그대로, 타입 보장과 함께 반환
    return response;
  } catch (error) {
    console.error('API 호출 오류:', error);

    // TODO: 응답 에러인 경우 처리 수정필요
    // 오류를 잡아서 처리하지 않고 상위로 전파하여 컴포넌트에서 처리하도록 함
    throw error;
  }
};
