import {api} from '@/shared/api/client';
import {getQuestionsResponseDto} from './dto';
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
