import {LayoutBottomBar} from '@/layouts/LayoutBottomBar';
import {ChatItem} from '@/features/chat/ChatItem';
import {dummyData} from '@/features/chat/dummy';

// TODO: 채팅 목록 조회수 안읽은 메시지 수 추가 예정
const ChatPage = () => {
  return (
    <LayoutBottomBar>
      <header className="flex justify-center items-center h-12 px-3 py-2 text-[#111] text-2xl font-semibold leading-8">
        채팅
      </header>
      <ul className="flex flex-col gap-3 mt-4">
        {dummyData.map(data => {
          return (
            <ChatItem
              key={data.chatRoomId}
              chatRoomId={data.chatRoomId}
              otherUserId={data.otherUserId}
              otherUserName={data.otherUserName}
              otherUserProfileImgUrl={data.otherUserProfileImgUrl}
              lastMessageContent={data.lastMessageContent}
              lastMessageTime={data.lastMessageTime}
              unreadCount={data.unreadCount}
            />
          );
        })}
      </ul>
    </LayoutBottomBar>
  );
};

export default ChatPage;
