import {useAtomValue, useSetAtom} from 'jotai';
import {z} from 'zod';

import {atomWithLocalStorage} from '../util/atom';

const chatRoomIdSchema = z.number().nullable();

export const chatRoomIdAtom = atomWithLocalStorage(
  'chat-room-id',
  null,
  chatRoomIdSchema,
);

export const useChatRoomId = () => useAtomValue(chatRoomIdAtom);
export const useSetChatRoomId = () => useSetAtom(chatRoomIdAtom);

chatRoomIdAtom.debugLabel = 'chatRoomIdAtom';
