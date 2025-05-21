import './init';

import {useEffect, useRef, useState} from 'react';
import {IMessage} from '@stomp/stompjs';
import {useQuery} from '@tanstack/react-query';

import {patchChatRoomRead} from '@/entities/chat/api/user-chat/chat-read';
import {
  ChatMessageDto,
  GetChatRoomDataResponseDto,
} from '@/entities/chat/api/user-chat/dto';
import {
  getChatRoomData,
  getChatRoomMessages,
} from '@/entities/chat/api/user-chat/get-chat';
import {postTeamRequestAccept} from '@/entities/team/api/create-team';
import {ChatInput} from '@/features/chat/ChatInput';
import {ChatMessage} from '@/features/chat/ChatMessage';
import {ChatRoomHeader} from '@/features/chat/ChatRoomHeader';
import {useChatSocket} from './hooks/useChatSocket';

type ChatRoomProps = {
  onBack: () => void;
  chatRoomId: number;
};

const ChatRoom = ({onBack, chatRoomId}: ChatRoomProps) => {
  const {data: chatRoomData} = useQuery<GetChatRoomDataResponseDto>({
    queryKey: ['chatRoomData', chatRoomId],
    queryFn: () => getChatRoomData(chatRoomId),
  });

  const [messages, setMessages] = useState<ChatMessageDto[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const {data: messagesData} = useQuery<{content: ChatMessageDto[]}>({
    queryKey: ['chatMessages', chatRoomId],
    // TODO: 페이징 처리수정
    queryFn: () => getChatRoomMessages(chatRoomId, {page: 0, size: 1000000}),
  });

  useEffect(() => {
    if (messagesData?.content) {
      setMessages([...messagesData.content].reverse());
    }
  }, [messagesData]);

  const {publishSendMessage} = useChatSocket({
    chatRoomId,
    onMessage: (frame: IMessage) => {
      const message: ChatMessageDto = JSON.parse(frame.body);
      setMessages(prev => [...prev, message]);
    },
    onError: err => {
      alert(err);
    },
  });

  // 채팅이 추가될 때 스크롤 맨 아래로 이동
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // 마운트 시 딱 한 번 실행: 채팅방 읽음 처리
  useEffect(() => {
    patchChatRoomRead(chatRoomId);
  }, [chatRoomId]);

  if (!chatRoomData) return null;
  //1본인
  const {
    groupId,
    user1Id,
    user1Name,
    // user1ProfileImgUrl,
    // user1Job,
    user2Id,
    user2Name,
    // user2ProfileImgUrl,
    // user2Job,
    // createdAt,
  } = chatRoomData;

  const handleSendMessage = (content: string) => {
    const newMessage: ChatMessageDto = {
      id: Date.now(),
      chatRoomId: chatRoomId,
      senderId: user1Id,
      senderType: 'USER',
      messageType: 'TEXT',
      content,
      isRead: false,
      sentAt: new Date().toISOString(),
    };
    publishSendMessage(JSON.stringify(newMessage));
  };

  const handleSendRequest = () => {
    // TODO: 그룹 팀 빌딩 아직 대기중이면 요청 xx
    const newMessage: ChatMessageDto = {
      id: Date.now(),
      chatRoomId: chatRoomId,
      senderId: user1Id,
      senderType: 'USER',
      messageType: 'TEAM_REQUEST',
      content: `${user1Name}님이 \n 제안을 하셨습니다!`,
      isRead: false,
      sentAt: new Date().toISOString(),
    };
    publishSendMessage(JSON.stringify(newMessage));
  };

  const hanleAcceptRequest = () => {
    if (!groupId || !user2Id) return;
    postTeamRequestAccept(groupId, user2Id);
  };

  // 메시지 그룹화 함수 - 같은 발신자가 동일 분에 보낸 메시지는 프로필 한번만 표시하고, 시간은 그룹의 마지막 메시지에만 표시
  const getGroupedMessages = () => {
    return messages?.map((message, index) => {
      // 이전 메시지 확인 (같은 사람이 연속으로 보냈는지)
      const prevMessage = index > 0 ? messages[index - 1] : null;

      // 다음 메시지 확인 (같은 사람이 계속 보내는지)
      const nextMessage =
        index < messages.length - 1 ? messages[index + 1] : null;

      // 동일한 시간(분)에 같은 발신자가 보낸 메시지인지 확인
      const isSameSenderAsPrev =
        prevMessage && message.senderId === prevMessage.senderId;
      const isSameMinuteAsPrev =
        prevMessage &&
        message.sentAt?.substring(0, 16) ===
          prevMessage.sentAt?.substring(0, 16);

      const isSameSenderAsNext =
        nextMessage && message.senderId === nextMessage.senderId;
      const isSameMinuteAsNext =
        nextMessage &&
        message.sentAt?.substring(0, 16) ===
          nextMessage.sentAt?.substring(0, 16);

      // 프로필 표시 여부 결정
      const showProfile = !(isSameSenderAsPrev && isSameMinuteAsPrev);

      // 시간 표시 여부 결정 (그룹의 마지막 메시지에만 시간 표시)
      // 다음 메시지가 없거나, 다음 메시지가 다른 발신자이거나, 다음 메시지가 다른 분에 보내진 경우
      const showTime =
        !nextMessage || !isSameSenderAsNext || !isSameMinuteAsNext;

      // 발신자가 변경되었는지 확인 (간격 조정용)
      const isNewSender =
        !nextMessage || nextMessage.senderId !== message.senderId;

      return (
        <ChatMessage
          key={message.id}
          message={message}
          isMine={message.senderId === Number(localStorage.getItem('userId'))}
          showProfile={showProfile}
          otherName={user2Name}
          showTime={showTime}
          isNewSender={isNewSender}
          hanleAcceptRequest={hanleAcceptRequest}
        />
      );
    });
  };

  return (
    <div className="flex h-screen flex-col items-center bg-[#EEECFF]">
      <div className="relative flex h-full w-full max-w-[500px] flex-col">
        <ChatRoomHeader
          chatRoomData={chatRoomData}
          handleBack={onBack}
          handleSendRequest={handleSendRequest}
        />

        {/* 스크롤 가능한 영역 */}
        <div className="flex-1 overflow-y-auto" ref={chatContainerRef}>
          <div className="mx-3 flex h-full flex-col">
            <div className="flex-1 text-left">{getGroupedMessages()}</div>
          </div>
        </div>
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default ChatRoom;
