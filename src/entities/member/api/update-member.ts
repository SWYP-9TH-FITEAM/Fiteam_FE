import {apiWithAuth} from '@/shared/api/client';
import {
  patchMemberProfileGroupMemberIdRequestDto,
  PatchMemberProfileGroupMemberIdRequestDto,
} from './dto';

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
