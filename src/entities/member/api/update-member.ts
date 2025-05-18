import type {PatchMemberProfileGroupMemberIdRequestDto} from './dto';

import {apiWithAuth} from '@/shared/api/client';
import {patchMemberProfileGroupMemberIdRequestDto} from './dto';

export const patchMemberProfileByGroupMemberId = async (
  groupMemberId: number,
  data: PatchMemberProfileGroupMemberIdRequestDto,
) => {
  const json = patchMemberProfileGroupMemberIdRequestDto.parse(data);

  const ENDPOINT = `v1/member/profile/${groupMemberId}`;

  return apiWithAuth.patch(ENDPOINT, {
    json,
  });
};

// TODO: 위에거 바뀌어야 하는데 ?
export const patchMemberMyProfile = async (
  groupId: number,
  data: PatchMemberProfileGroupMemberIdRequestDto,
) => {
  const json = patchMemberProfileGroupMemberIdRequestDto.parse(data);

  const ENDPOINT = `v1/member/${groupId}/set-profile`;

  return apiWithAuth.patch(ENDPOINT, {json});
};
