import {atom} from 'jotai';
import {TestResultResponse} from '@/entities/question/api/create-question';

// 테스트 결과를 저장하는 atom
export const testResultAtom = atom<TestResultResponse | null>(null);

// 테스트 결과가 있는지 확인하는 파생 atom
export const hasTestResultAtom = atom(get => get(testResultAtom) !== null);
