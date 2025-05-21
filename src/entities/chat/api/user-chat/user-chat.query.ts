import {queryOptions} from '@tanstack/react-query';

import {getChatList, getChatRoomData, getChatRoomMessages} from './get-chat';

export const userChatQueries = {
  all: () => ['user-chat'],

  chatMessagesKey: () => [...userChatQueries.all(), 'chat-messages'],
  chatMessages: (roomId: number) =>
    queryOptions({
      queryKey: [...userChatQueries.chatMessagesKey(), roomId],
      queryFn: () => getChatRoomMessages(roomId),
    }),

  chatRoomDataKey: () => [...userChatQueries.all(), 'chat-room-data'],
  chatRoomData: (roomId: number) =>
    queryOptions({
      queryKey: [...userChatQueries.chatRoomDataKey(), roomId],
      queryFn: () => getChatRoomData(roomId),
    }),

  chatListKey: () => [...userChatQueries.all(), 'chat-list'],
  chatList: () =>
    queryOptions({
      queryKey: [...userChatQueries.chatListKey()],
      queryFn: () => getChatList(),
    }),
};
