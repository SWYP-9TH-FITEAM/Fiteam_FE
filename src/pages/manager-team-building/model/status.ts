import {GROUP_STATUS} from '@/entities/manager/api';

export const GROUP_STATUS_LABELS = Object.freeze({
  [GROUP_STATUS.ONGOING]: '진행중',
  [GROUP_STATUS.PENDING]: '대기중',
  [GROUP_STATUS.ENDED]: '종료',
  all: '전체',
} as const);

export type GroupStatusLabels =
  (typeof GROUP_STATUS_LABELS)[keyof typeof GROUP_STATUS_LABELS];

export type GroupStatus = keyof typeof GROUP_STATUS_LABELS;
