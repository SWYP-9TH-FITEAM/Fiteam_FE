export const STEP = Object.freeze({
  SET_INFO: 'SET_INFO',
  SET_CONDITION: 'SET_CONDITION',
  CONFIRM_AND_CREATE: 'CONFIRM_AND_CREATE',
} as const);

export type Step = (typeof STEP)[keyof typeof STEP];
