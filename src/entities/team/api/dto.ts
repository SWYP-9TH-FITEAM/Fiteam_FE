import {z} from 'zod';

export const postTeamRequestRequestDto = z.object({
  groupId: z.number().int(),
  receiverId: z.number().int(),
});

export type PostTeamRequestRequestDto = z.infer<
  typeof postTeamRequestRequestDto
>;

export const getTeamContactsResponseDto = z.array(
  z.object({
    userId: z.number().int(),
    userName: z.string(),
    phoneNumber: z.string(),
    kakaoId: z.string(),
  }),
);

export type GetTeamContactsResponseDto = z.infer<
  typeof getTeamContactsResponseDto
>;

export const getTeamSenderIdGroupIdResponseDto = z.array(
  z.object({
    userId: z.number().int(),
    isMaster: z.boolean(),
    userName: z.string(),
    profileImgUrl: z.string(),
    position: z.string(),
  }),
);

export type GetTeamSenderIdGroupIdResponseDto = z.infer<
  typeof getTeamSenderIdGroupIdResponseDto
>;

export const getTeamBuildingStatusResponseDto = z.array(
  z.object({
    teamId: z.number().int(),
    masterUserId: z.number().int(),
    teamStatus: z.string(),
    members: z.array(
      z.object({
        userId: z.number().int(),
        isMaster: z.boolean(),
        userName: z.string(),
        profileImgUrl: z.string().url().nullable(),
        position: z.string().nullable(),
      }),
    ),
  }),
);

export type GetTeamBuildingStatusResponseDto = z.infer<
  typeof getTeamBuildingStatusResponseDto
>;

export const getTeamRequestReceivedResponseDto = z.array(
  z.object({
    id: z.number().int(),
    senderId: z.number().int(),
    senderName: z.string(),
    groupId: z.number().int(),
    status: z.string(),
    requestedAt: z.string().datetime(),
  }),
);

export type GetTeamRequestReceivedResponseDto = z.infer<
  typeof getTeamRequestReceivedResponseDto
>;

export const getTeamRequestFromUserIdResponseDto = z.object({
  id: z.number().int(),
  senderId: z.number().int(),
  senderName: z.string(),
  groupId: z.number().int(),
  status: z.string(),
  requestedAt: z.string().datetime(),
});

export type GetTeamRequestFromUserIdResponseDto = z.infer<
  typeof getTeamRequestFromUserIdResponseDto
>;

export const getTeamMyTeamResponseDto = z.object({
  teamId: z.number().int(),
  masterUserId: z.number().int(),
  teamStatus: z.string(),
  members: z.array(
    z.object({
      userId: z.number().int(),
      isMaster: z.boolean(),
      userName: z.string(),
      profileImgUrl: z.string().url().nullable(),
      position: z.string().nullable(),
    }),
  ),
});

export type GetTeamMyTeamResponseDto = z.infer<typeof getTeamMyTeamResponseDto>;
