import {apiWithAuth} from '@/shared/api/client';
import {validateSchema} from '@/shared/api/validate';
import {
  getChatListResponseDto,
  getChatRoomDataResponseDto,
  getChatRoomMessagesResponseDto,
} from './dto';

export const getChatRoomMessages = async (
  roomId: number,
  options?: {page?: number; size?: number},
) => {
  let ENDPOINT = `v1/user-chat/${roomId}/messages`;
  if (options) {
    const params = [];
    if (options.page !== undefined) params.push(`page=${options.page}`);
    if (options.size !== undefined)
      params.push(`size=${options.size || 1000000}`);
    if (params.length) ENDPOINT += `?${params.join('&')}`;
  }

  const response = await apiWithAuth.get(ENDPOINT).json();

  return validateSchema({
    dto: response,
    schema: getChatRoomMessagesResponseDto,
    schemaName: ENDPOINT,
  });
};

export const getChatRoomData = async (roomId: number) => {
  const ENDPOINT = `v1/user-chat/${roomId}/data`;

  const response = await apiWithAuth.get(ENDPOINT).json();

  return validateSchema({
    dto: response,
    schema: getChatRoomDataResponseDto,
    schemaName: ENDPOINT,
  });
};

export const getChatList = async () => {
  const ENDPOINT = 'v1/user-chat/list';

  const response = await apiWithAuth.get(ENDPOINT).json();

  return validateSchema({
    dto: response,
    schema: getChatListResponseDto,
    schemaName: ENDPOINT,
  });
};
