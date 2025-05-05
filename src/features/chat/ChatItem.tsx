import {formatTimeString} from '@/features/chat/utils/formatTimeString';
import {useNavigate} from 'react-router-dom';

type ChatRoomItemProps = {
  chatRoomId: number;
  otherUserId: number;
  otherUserName: string;
  otherUserProfileImgUrl: string;
  lastMessageContent: string;
  lastMessageTime: string; // ISO 8601 형식 (예: 2025-05-01T14:15:00)
  unreadCount?: number; // 읽지 않은 메시지 수
};

export const ChatItem = ({
  chatRoomId,
  otherUserName,
  otherUserProfileImgUrl,
  lastMessageContent,
  lastMessageTime,
  unreadCount = 0,
}: ChatRoomItemProps) => {
  const navigate = useNavigate();
  const formattedTime = formatTimeString(lastMessageTime);

  const navigateToChatRoom = () => {
    navigate(`/chat/${chatRoomId}`);
  };

  return (
    <li
      className="w-full h-[76px] rounded-md flex items-center text-black text-sm cursor-pointer"
      onClick={navigateToChatRoom}
    >
      <div
        className="w-12 h-12 bg-gray-200 rounded flex-shrink-0"
        style={
          otherUserProfileImgUrl
            ? {
                backgroundImage: `url(${otherUserProfileImgUrl})`,
                backgroundSize: 'cover',
              }
            : {}
        }
      ></div>
      <div className="ml-4 flex-grow text-left">
        <div className="flex justify-between items-center">
          <span className="font-medium">{otherUserName}</span>
        </div>
        <p className="truncate w-[203px]">{lastMessageContent}</p>
      </div>
      <div className="w-[56px] flex flex-col items-end">
        <span className="text-[10px] text-[#A4A4A4] h-4">{formattedTime}</span>

        {unreadCount > 0 && (
          <div className="min-w-[18px] h-[18px] bg-[#E95D42] text-white rounded-full flex items-center justify-center">
            <span className="text-xs">
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          </div>
        )}
      </div>
    </li>
  );
};
