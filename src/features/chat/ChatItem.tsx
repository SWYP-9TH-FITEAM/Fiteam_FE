import {formatTimeString} from '@/features/chat/utils/formatTimeString';

type ChatRoomItemProps = {
  otherUserName: string;
  otherUserProfileImgUrl: string | null;
  lastMessageContent: string;
  unreadMessageCount: number;
  lastMessageTime: string | null;
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
  const formattedTime = formatTimeString(lastMessageTime || '');

  // if (!lastMessageTime) {
  //   return null;
  // }

  return (
    <li
      className="flex h-[76px] w-full cursor-pointer items-center rounded-md text-sm text-black"
      onClick={onClick}
    >
      <div
        className="h-12 w-12 flex-shrink-0 rounded bg-gray-200"
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
        <div className="flex items-center justify-between">
          <span className="font-medium">{otherUserName}</span>
        </div>
        <p className="w-[203px] truncate">{lastMessageContent}</p>
      </div>

      <div className="flex w-[56px] flex-col items-end gap-1">
        <span className="h-4 text-[10px] text-[#A4A4A4]">{formattedTime}</span>
        {unreadMessageCount > 0 && (
          <div className="flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#E95D42] text-white">
            <span className="text-xs">
              {unreadMessageCount > 99 ? '99+' : unreadMessageCount}
            </span>
          </div>
        )}
      </div>
    </li>
  );
};
