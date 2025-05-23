import {z} from 'zod';

export const postCreateChatRoomRequestDto = z.object({
  receiverId: z.number().int(),
  groupId: z.number().int(),
});

export type PostCreateChatRoomRequestDto = z.infer<
  typeof postCreateChatRoomRequestDto
>;

export const postCreateChatRoomResponseDto = z.object({
  chatRoomId: z.number().int().optional(),
  groupId: z.number().int().optional(),
  user1Id: z.number().int().optional(),
  user1Name: z.string().optional().nullable(),
  user1ProfileImgUrl: z.string().url().optional().nullable(),
  user1Job: z.string().optional().nullable(),
  user2Id: z.number().int().optional(),
  user2Name: z.string().optional().nullable(),
  user2ProfileImgUrl: z.string().url().optional().nullable(),
  user2Job: z.string().optional().nullable(),
  createdAt: z.string().datetime().optional().nullable(),
});

export type PostCreateChatRoomResponseDto = z.infer<
  typeof postCreateChatRoomResponseDto
>;

export const chatMessageDto = z.object({
  id: z.number(),
  chatRoomId: z.number(),
  senderType: z.string(),
  senderId: z.number(),
  messageType: z.string(),
  content: z.string(),
  isRead: z.boolean(),
  sentAt: z.string(),
});

export type ChatMessageDto = z.infer<typeof chatMessageDto>;

export const getChatRoomMessagesResponseDto = z.object({
  totalElements: z.number(),
  totalPages: z.number(),
  pageable: z.object({
    pageNumber: z.number(),
    paged: z.boolean(),
    pageSize: z.number(),
    unpaged: z.boolean(),
    offset: z.number(),
    sort: z.object({
      sorted: z.boolean(),
      unsorted: z.boolean(),
      empty: z.boolean(),
    }),
  }),
  numberOfElements: z.number(),
  size: z.number(),
  content: z.array(chatMessageDto),
  number: z.number(),
  sort: z.object({
    sorted: z.boolean(),
    unsorted: z.boolean(),
    empty: z.boolean(),
  }),
  first: z.boolean(),
  last: z.boolean(),
  empty: z.boolean(),
});

export type GetChatRoomMessagesResponseDto = z.infer<
  typeof getChatRoomMessagesResponseDto
>;

export const getChatRoomDataResponseDto = z.object({
  chatRoomId: z.number().int(),
  groupId: z.number().int(),
  user1Id: z.number().int(),
  user1Name: z.string(),
  user1ProfileImgUrl: z.string().url(),
  user1Job: z.string(),
  user2Id: z.number().int(),
  user2Name: z.string(),
  user2ProfileImgUrl: z.string().url(),
  user2Job: z.string(),
  createdAt: z.string().nullable(),
});

export type GetChatRoomDataResponseDto = z.infer<
  typeof getChatRoomDataResponseDto
>;

export const getChatListResponseDto = z.array(
  z.object({
    chatRoomId: z.number().int(),
    userId: z.number().int(),
    otherUserId: z.number().int(),
    groupId: z.number().int(),
    otherUserName: z.string(),
    otherUserProfileImgUrl: z.string().url(),
    lastMessageContent: z.string(),
    unreadMessageCount: z.number().int(),
    lastMessageTime: z.string().nullable(),
  }),
);

export type GetChatListResponseDto = z.infer<typeof getChatListResponseDto>;
