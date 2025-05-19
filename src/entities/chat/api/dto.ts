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
