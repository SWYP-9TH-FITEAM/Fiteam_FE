import {useEffect, useRef} from 'react';
import {Client, Frame, IMessage, Stomp} from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const WS_URL = import.meta.env.VITE_WS_URL;

interface UseChatSocketProps {
  chatRoomId: number;
  onMessage: (message: IMessage) => void;
  onError?: (error: string) => void;
  deps?: unknown[]; // 의존성 배열 (roomId 등)
}

export function useChatSocket({
  chatRoomId,
  onMessage,
  onError,
  deps = [],
}: UseChatSocketProps) {
  const stompClientRef = useRef<Client | null>(null);

  useEffect(() => {
    if (!chatRoomId) return;
    const socket = new SockJS(WS_URL);
    const stompClient = Stomp.over(socket);

    stompClient.connect(
      {},
      () => {
        stompClient.subscribe(
          `/topic/chatroom.${chatRoomId}`,
          (frame: IMessage) => {
            onMessage(frame);
          },
        );
        stompClient.subscribe('/user/queue/errors', (frame: Frame) => {
          if (onError) onError(frame.body);
        });
      },
      (error: unknown) => {
        if (onError) onError(String(error));
      },
    );

    stompClientRef.current = stompClient;

    return () => {
      if (stompClient && stompClient.connected) {
        stompClient.disconnect();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatRoomId, ...deps]);

  // 메시지 전송 함수
  const publishSendMessage = (body: string) => {
    const destination = '/app/chat.sendMessage';
    if (stompClientRef.current && stompClientRef.current.connected) {
      stompClientRef.current.publish({destination, body});
    }
  };

  return {
    stompClient: stompClientRef.current,
    publishSendMessage,
  };
}
