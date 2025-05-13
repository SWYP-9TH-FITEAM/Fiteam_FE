import {z} from 'zod';

export const postLikeAddRequestDto = z.object({
  receiverId: z.number().int(),
  groupId: z.number().int(),
  number: z.number().int(),
  memo: z.string(),
});

export type PostLikeAddRequestDto = z.infer<typeof postLikeAddRequestDto>;

export const getLikeMemoByLikeIdResponseDto = z.string();

export type GetLikeMemoByLikeIdResponseDto = z.infer<
  typeof getLikeMemoByLikeIdResponseDto
>;

export const getLikeListResponseDto = z.array(
  z.object({
    likeId: z.number().int(),
    receiverId: z.number().int(),
    groupId: z.number().int(),
    number: z.number().int(),
    createdAt: z.string().datetime(),
  }),
);
