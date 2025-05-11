import {useState} from 'react';
import {LayoutBottomBar} from '@/layouts/LayoutBottomBar';
import {ChatItem} from '@/features/chat/ChatItem';
import {dummyData} from '@/features/chat/dummy';
import ChatRoom from '../features/chat/ChatRoom';

interface SelectedRoom {
  roomId: number;
  otherUserName: string;
  otherUserId: number;
  otherUserProfileImgUrl: string;
}

const ChatPage = () => {
  const [selectedRoom, setSelectedRoom] = useState<SelectedRoom | null>(null);

  if (selectedRoom) {
    return (
      <ChatRoom roomInfo={selectedRoom} onBack={() => setSelectedRoom(null)} />
    );
  }

  return (
    <LayoutBottomBar>
      <header className="flex justify-center items-center h-12 px-3 py-2 text-[#111] text-2xl font-semibold leading-8">
        채팅
      </header>
      <ul className="flex flex-col gap-3 mt-4">
        {dummyData.map(data => (
          <ChatItem
            key={data.chatRoomId}
            otherUserName={data.otherUserName}
            otherUserProfileImgUrl={data.otherUserProfileImgUrl}
            lastMessageContent={data.lastMessageContent}
            unreadMessageCount={data.unreadMessageCount}
            lastMessageTime={data.lastMessageTime}
            onClick={() =>
              setSelectedRoom({
                roomId: data.chatRoomId,
                otherUserName: data.otherUserName,
                otherUserId: data.otherUserId,
                otherUserProfileImgUrl: data.otherUserProfileImgUrl,
              })
            }
          />
        ))}
      </ul>
    </LayoutBottomBar>
  );
};

export default ChatPage;
