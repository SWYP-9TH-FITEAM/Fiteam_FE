import {formatTimeString} from '@/features/chat/utils/formatTimeString';

type ChatRoomItemProps = {
  otherUserName: string;
  otherUserProfileImgUrl: string;
  lastMessageContent: string;
  unreadMessageCount: number;
  lastMessageTime: string;
  onClick?: () => void;
};

export const ChatItem = ({
  otherUserName,
  otherUserProfileImgUrl,
  lastMessageContent,
  unreadMessageCount,
  lastMessageTime,
  onClick,
}: ChatRoomItemProps) => {
  const formattedTime = formatTimeString(lastMessageTime);

  return (
    <li
      className="w-full h-[76px] rounded-md flex items-center text-black text-sm cursor-pointer"
      onClick={onClick}
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
        {unreadMessageCount > 0 && (
          <div className="min-w-[18px] h-[18px] bg-[#E95D42] text-white rounded-full flex items-center justify-center">
            <span className="text-xs">
              {unreadMessageCount > 99 ? '99+' : unreadMessageCount}
            </span>
          </div>
        )}
      </div>
    </li>
  );
};
