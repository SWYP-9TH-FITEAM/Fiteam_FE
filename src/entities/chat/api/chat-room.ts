import {getChatRoomDataResponseDto} from '@/entities/team/api/dto';
import {apiWithAuth} from '@/shared/api/client';
import {validateSchema} from '@/shared/api/validate';
import {getChatMessagesResponseDto} from './dto';

export const getChatMessages = async (
  roomId: number,
  options?: {page?: number; size?: number},
) => {
  let ENDPOINT = `v1/chat/${roomId}/messages`;
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
    schema: getChatMessagesResponseDto,
    schemaName: ENDPOINT,
  });
};

export const getChatRoomData = async (roomId: number) => {
  const ENDPOINT = `v1/chat/${roomId}/data`;

  const response = await apiWithAuth.get(ENDPOINT).json();

  return validateSchema({
    dto: response,
    schema: getChatRoomDataResponseDto,
    schemaName: ENDPOINT,
  });
};
