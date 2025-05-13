import {z} from 'zod';

export const getNotiByIdResponseDto = z.object({
  id: z.number().int(),
  senderType: z.string(),
  senderId: z.number().int(),
  type: z.string(),
  tableId: z.number().int(),
  content: z.string(),
  isRead: z.boolean(),
  createdAt: z.string().datetime(),
});

export type GetNotiByIdResponseDto = z.infer<typeof getNotiByIdResponseDto>;

export const getNotiAllResponseDto = z.array(getNotiByIdResponseDto);

export type GetNotiAllResponseDto = z.infer<typeof getNotiAllResponseDto>;
