import '@/features/chat/init';

import {useQuery} from '@tanstack/react-query';

import {getChatList} from '@/entities/chat/api/list';
import {ChatItem} from '@/features/chat/ChatItem';
import {LayoutBottomBar} from '@/layouts/LayoutBottomBar';
import {useChatRoomId, useSetChatRoomId} from '@/shared/model/chat-room';
import ChatRoom from '../features/chat/ChatRoom';

const ChatPage = () => {
  const {data: chatList} = useQuery({
    queryKey: ['chatList'],
    queryFn: () => getChatList(),
  });

  const chatRoomId = useChatRoomId();
  const setChatRoomId = useSetChatRoomId();

  if (chatList?.[0]?.userId) {
    localStorage.setItem('userId', chatList[0].userId.toString());
  }

  if (chatRoomId) {
    const selectedRoom = chatList?.find(room => room.chatRoomId === chatRoomId);
    if (selectedRoom) {
      return (
        <ChatRoom
          roomInfo={{
            roomId: selectedRoom.chatRoomId,
            otherUserName: selectedRoom.otherUserName,
          }}
          onBack={() => setChatRoomId(null)}
          chatRoomId={selectedRoom.chatRoomId}
          senderId={Number(localStorage.getItem('userId'))}
        />
      );
    }
  }

  return (
    <LayoutBottomBar>
      <header className="flex h-12 items-center justify-center px-3 py-2 text-2xl leading-8 font-semibold text-[#111]">
        채팅
      </header>
      <ul className="mt-4 flex flex-col gap-3">
        {chatList?.map(data => (
          <ChatItem
            key={data.chatRoomId}
            otherUserName={data.otherUserName}
            otherUserProfileImgUrl={data.otherUserProfileImgUrl}
            lastMessageContent={data.lastMessageContent}
            unreadMessageCount={data.unreadMessageCount}
            lastMessageTime={data.lastMessageTime}
            onClick={() => setChatRoomId(data.chatRoomId)}
          />
        ))}
      </ul>
    </LayoutBottomBar>
  );
};

export default ChatPage;
