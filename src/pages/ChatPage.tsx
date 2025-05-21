import '@/features/chat/init';

import {useQuery} from '@tanstack/react-query';

import {userChatQueries} from '@/entities/chat/api/user-chat/user-chat.query';
import {ChatItem} from '@/features/chat/ChatItem';
import {LayoutBottomBar} from '@/layouts/LayoutBottomBar';
import {useChatRoomId, useSetChatRoomId} from '@/shared/model/chat-room';
import ChatRoom from '../features/chat/ChatRoom';

const ChatPage = () => {
  const {data: chatList} = useQuery(userChatQueries.chatList());

  const chatRoomId = useChatRoomId();
  const setChatRoomId = useSetChatRoomId();

  if (chatList?.[0]?.userId) {
    localStorage.setItem('userId', chatList[0].userId.toString());
  }
  if (chatRoomId) {
    return (
      <ChatRoom onBack={() => setChatRoomId(null)} chatRoomId={chatRoomId} />
    );
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
