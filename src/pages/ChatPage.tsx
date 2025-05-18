import {useState} from 'react';

import {ChatItem} from '@/features/chat/ChatItem';
import {dummyData} from '@/features/chat/dummy';
import {LayoutBottomBar} from '@/layouts/LayoutBottomBar';
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
      <header className="flex h-12 items-center justify-center px-3 py-2 text-2xl leading-8 font-semibold text-[#111]">
        채팅
      </header>
      <ul className="mt-4 flex flex-col gap-3">
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
