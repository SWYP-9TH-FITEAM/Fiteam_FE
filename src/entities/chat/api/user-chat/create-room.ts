import {apiWithAuth} from '@/shared/api/client';
import {validateSchema} from '@/shared/api/validate';
import {
  postCreateChatRoomRequestDto,
  PostCreateChatRoomRequestDto,
  postCreateChatRoomResponseDto,
} from './dto';

export const postCreateChatRoom = async (
  payload: PostCreateChatRoomRequestDto,
) => {
  const ENDPOINT = `v1/user-chat/room`;

  const json = postCreateChatRoomRequestDto.parse(payload);

  const response = await apiWithAuth.post(ENDPOINT, {json}).json();

  return validateSchema({
    dto: response,
    schema: postCreateChatRoomResponseDto,
    schemaName: ENDPOINT,
  });
};
