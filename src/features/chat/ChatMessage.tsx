import {formatTimeString} from '@/features/chat/utils/formatTimeString';

type ChatMessageProps = {
  content: string;
  sentAt: string;
  isMine: boolean;
  showProfile?: boolean;
  userName?: string;
  showTime?: boolean;
  isNewSender?: boolean;
};

export const ChatMessage = ({
  content,
  sentAt,
  isMine,
  showProfile = true,
  userName,
  showTime = false,
  isNewSender = false,
}: ChatMessageProps) => {
  const formattedTime = formatTimeString(sentAt);

  return (
    <div
      className={`flex ${isNewSender ? 'mb-4' : 'mb-2'} ${isMine ? 'justify-end' : 'justify-start'}`}
    >
      {!isMine && (
        <div className="flex">
          {showProfile ? (
            <div className="w-9 h-9 bg-gray-200 rounded-md flex-shrink-0 self-start mr-[6px]" />
          ) : (
            <div className="w-9 h-9 mr-[6px] flex-shrink-0" />
          )}
          <div>
            {showProfile && userName && (
              <div className="text-[#111] text-[13px] font-medium leading-4 mb-[6px]">
                {userName}
                <span className="text-[#767676] text-[10px] font-medium leading-[13px] ml-[3px]">
                  디자인
                </span>
              </div>
            )}
            <div className="flex items-end">
              <div className="bg-white rounded-lg p-2 max-w-[300px] text-black">
                {content}
              </div>
              {showTime && (
                <span className="text-[10px] text-gray-400 ml-1">
                  {formattedTime}
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {isMine && (
        <div className="flex items-end">
          {showTime && (
            <span className="text-[10px] text-gray-400 mr-1">
              {formattedTime}
            </span>
          )}
          <div className="bg-[#6858FF] rounded-lg p-2 max-w-[300px] text-white">
            {content}
          </div>
        </div>
      )}
    </div>
  );
};
