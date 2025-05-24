import type {
  PostGroupCreateRequestDto,
  PostGroupInviteRequestDto,
  PostGroupSetTeamtypeGroupIdRequestDto,
} from './dto';

import {apiWithAuth} from '@/shared/api/client';
import {validateSchema} from '@/shared/api/validate';
import {
  postGroupCreateRequestDto,
  postGroupCreateResponseDto,
  postGroupInviteRequestDto,
  postGroupSetTeamtypeGroupIdRequestDto,
} from './dto';

export const postGroupSetTeamtype = (
  payload: PostGroupSetTeamtypeGroupIdRequestDto & {groupId: number},
) => {
  const {groupId, ...rest} = payload;
  const ENDPOINT = `v1/group/set-teamtype/${groupId}`;

  const json = postGroupSetTeamtypeGroupIdRequestDto.parse(rest);

  return apiWithAuth.post(ENDPOINT, {json});
};

export const postGroupInvite = (payload: PostGroupInviteRequestDto) => {
  const ENDPOINT = `v1/group/invite`;

  const json = postGroupInviteRequestDto.parse(payload);

  return apiWithAuth.post(ENDPOINT, {json});
};

export const postGroupCreate = async (payload: PostGroupCreateRequestDto) => {
  const ENDPOINT = `v1/group/create`;

  const json = postGroupCreateRequestDto.parse(payload);

  const response = await apiWithAuth
    .post(ENDPOINT, {json, headers: {Accept: '*/*'}})
    .text();

  return validateSchema({
    dto: parseInt(response),
    schema: postGroupCreateResponseDto,
    schemaName: ENDPOINT,
  });
};
