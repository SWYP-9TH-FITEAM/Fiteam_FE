import type {PatchGroupGroupIdUpdateRequestDto} from './dto';

import {apiWithAuth} from '@/shared/api/client';
import {patchGroupGroupIdUpdateRequestDto} from './dto';

export const patchGroupUpdate = (
  payload: PatchGroupGroupIdUpdateRequestDto & {groupId: number},
) => {
  const {groupId, ...rest} = payload;

  const ENDPOINT = `v1/group/${groupId}/update`;

  const json = patchGroupGroupIdUpdateRequestDto.parse(rest);

  return apiWithAuth.patch(ENDPOINT, {json});
};

export const patchGroupBan = ({
  groupId,
  groupMemberId,
}: {
  groupId: number;
  groupMemberId: number;
}) => {
  const ENDPOINT = `v1/group/${groupId}/ban/${groupMemberId}`;

  return apiWithAuth.patch(ENDPOINT);
};
