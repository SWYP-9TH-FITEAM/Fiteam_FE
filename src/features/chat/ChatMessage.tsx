import paperPlane from '@/assets/images/paper-plane.png';
import {formatTimeString} from '@/features/chat/utils/formatTimeString';

type ChatMessageProps = {
  content: string;
  sentAt: string;
  isMine: boolean;
  showProfile?: boolean;
  userName?: string;
  showTime?: boolean;
  isNewSender?: boolean;
  messageType?: string;
};

export const ChatMessage = ({
  content,
  sentAt,
  isMine,
  showProfile = true,
  userName,
  showTime = false,
  isNewSender = false,
  messageType,
}: ChatMessageProps) => {
  const formattedTime = formatTimeString(sentAt);

  // messageType별 스타일/텍스트 객체
  const typeMap = {
    TEAM_REQUEST: {
      text: '제안을 하셨습니다!',
      button: '수락하기',
      bg: isMine ? '#F6B354' : '#fff',
      btnBg: '#fff',
      btnText: '#111',
    },
    TEAM_RESPONSE: {
      text: '제안을 받았습니다!',
      button: '나의 팀 보기',
      bg: isMine ? '#6858FF' : '#fff',
      btnBg: '#6858FF',
      btnText: '#fff',
    },
  } as const;

  const renderSpecialCard = () => {
    const type = typeMap[messageType as keyof typeof typeMap];
    if (!type) return null;
    return (
      <div className="flex w-full justify-center">
        <div
          className="flex h-[161px] w-[153px] flex-col items-center justify-between rounded-2xl px-2 py-[10px]"
          style={{backgroundColor: type.bg}}
        >
          <div className="text-center text-[13px] leading-4 font-medium">
            {type.text}
          </div>
          <img src={paperPlane} alt="제안" className="mb-3 h-[50px] w-[70px]" />
          <button
            className="h-[36px] w-[120px] rounded-md text-center text-[13px] leading-4 font-medium"
            style={{backgroundColor: type.btnBg, color: type.btnText}}
          >
            {type.button}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`flex ${isNewSender ? 'mb-4' : 'mb-2'} ${isMine ? 'justify-end' : 'justify-start'}`}
    >
      {!isMine && (
        <div className="flex">
          {showProfile ? (
            <div className="mr-[6px] h-9 w-9 flex-shrink-0 self-start rounded-md bg-gray-200" />
          ) : (
            <div className="mr-[6px] h-9 w-9 flex-shrink-0" />
          )}
          <div>
            {showProfile && userName && (
              <div className="mb-[6px] text-[13px] leading-4 font-medium text-[#111]">
                {userName}
                <span className="ml-[3px] text-[10px] leading-[13px] font-medium text-[#767676]">
                  디자인
                </span>
              </div>
            )}
            <div className="flex items-end">
              {messageType === 'TEAM_RESPONSE' ||
              messageType === 'TEAM_REQUEST' ? (
                renderSpecialCard()
              ) : (
                <div className="max-w-[300px] min-w-fit rounded-lg bg-white p-2 text-black">
                  {content}
                </div>
              )}
              {showTime && (
                <span className="ml-1 text-[10px] text-gray-400">
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
            <span className="mr-1 w-full text-[10px] text-gray-400">
              {formattedTime}
            </span>
          )}
          {messageType === 'TEAM_RESPONSE' || messageType === 'TEAM_REQUEST' ? (
            renderSpecialCard()
          ) : (
            <div className="max-w-[300px] min-w-fit rounded-lg bg-[#6858FF] p-2 text-white">
              {content}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
