import {apiWithAuth} from '@/shared/api/client';

export const patchChatRoomRead = async (roomId: number) => {
  const ENDPOINT = `v1/user-chat/${roomId}/read`;
  return apiWithAuth.patch(ENDPOINT);
};
