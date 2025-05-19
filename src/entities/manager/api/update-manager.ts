import type {PatchManagerNoticeRequestDto} from './dto';

import {apiWithAuth} from '@/shared/api/client';
import {validateSchema} from '@/shared/api/validate';
import {
  patchManagerNoticeRequestDto,
  patchManagerNoticeResponseDto,
} from './dto';

export const patchManagerNotice = async (
  payload: PatchManagerNoticeRequestDto & {noticeId: number},
) => {
  const {noticeId, ...rest} = payload;
  const ENDPOINT = `v1/manager/notices/${noticeId}`;

  const json = patchManagerNoticeRequestDto.parse(rest);

  const response = await apiWithAuth.patch(ENDPOINT, {json}).json();

  return validateSchema({
    dto: response,
    schema: patchManagerNoticeResponseDto,
    schemaName: ENDPOINT,
  });
};
