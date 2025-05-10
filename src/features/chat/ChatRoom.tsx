import {ChatInput} from '@/features/chat/ChatInput';
import {ChatMessage} from '@/features/chat/ChatMessage';
import {ChatRoomHeader} from '@/features/chat/ChatRoomHeader';
import {dummyChatMessages} from '@/features/chat/dummy';
import {useEffect, useRef, useState} from 'react';

type Message = {
  id: number;
  chatRoomId: number;
  senderId: number;
  senderName: string;
  content: string;
  isRead: boolean;
  sentAt: string;
};

type ChatRoomProps = {
  roomInfo: {
    roomId: number;
    otherUserName: string;
  };
  onBack: () => void;
};

const ChatRoom = ({roomInfo, onBack}: ChatRoomProps) => {
  const {roomId, otherUserName} = roomInfo;
  // const {roomId} = useParams();
  const userId = 1; // 본인 아이디
  const [messages, setMessages] = useState<Message[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  console.log(messages);

  useEffect(() => {
    // 채팅방 ID에 해당하는 메시지만 필터링
    const filteredMessages = dummyChatMessages
      .filter(msg => msg.chatRoomId === Number(roomId))
      .map(msg => ({
        ...msg,
        senderName: msg.senderId === userId ? '나' : '상대방', // 혹은 적절한 이름 매핑
      }));
    setMessages(filteredMessages);
    console.log(filteredMessages);

    // 채팅방 진입 시 스크롤을 하단으로 이동
    setTimeout(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop =
          chatContainerRef.current.scrollHeight;
      }
    }, 100); // 약간의 지연을 두어 DOM이 렌더링된 후 스크롤이 이동하도록 함
  }, [roomId]);

  // 메시지 그룹화 함수 - 같은 발신자가 동일 분에 보낸 메시지는 프로필 한번만 표시하고, 시간은 그룹의 마지막 메시지에만 표시
  const getGroupedMessages = () => {
    return messages.map((message, index) => {
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
        message.sentAt.substring(0, 16) === prevMessage.sentAt.substring(0, 16);

      const isSameSenderAsNext =
        nextMessage && message.senderId === nextMessage.senderId;
      const isSameMinuteAsNext =
        nextMessage &&
        message.sentAt.substring(0, 16) === nextMessage.sentAt.substring(0, 16);

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
          content={message.content}
          sentAt={message.sentAt}
          isMine={message.senderId === userId}
          showProfile={showProfile}
          userName={message.senderName}
          showTime={showTime}
          isNewSender={isNewSender}
        />
      );
    });
  };

  // 채팅이 추가될 때 스크롤 맨 아래로 이동
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // 새 메시지 전송 핸들러
  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now(),
      chatRoomId: Number(roomId),
      senderId: userId,
      senderName: '나',
      content,
      isRead: false,
      sentAt: new Date().toISOString(),
    };

    setMessages(prev => [...prev, newMessage]);
  };

  return (
    <div className="flex flex-col items-center h-screen bg-[#EEECFF]">
      <div className="relative w-full max-w-[500px] h-full flex flex-col">
        <ChatRoomHeader otherName={otherUserName} handleBack={onBack} />

        {/* 스크롤 가능한 영역 */}
        <div className="flex-1 overflow-y-auto" ref={chatContainerRef}>
          <div className="flex flex-col h-full mx-3">
            <div className="flex-1 text-left ">{getGroupedMessages()}</div>
          </div>
        </div>
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default ChatRoom;
