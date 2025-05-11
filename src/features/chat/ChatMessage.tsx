import {formatTimeString} from '@/features/chat/utils/formatTimeString';

import paperPlane from '@/assets/images/paper-plane.png';

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
      <div className="flex justify-center w-full">
        <div
          className="flex flex-col items-center justify-between rounded-2xl w-[153px] h-[161px] px-2 py-[10px]"
          style={{backgroundColor: type.bg}}
        >
          <div className="text-center text-[13px] font-medium leading-4">
            {type.text}
          </div>
          <img src={paperPlane} alt="제안" className="w-[70px] h-[50px] mb-3" />
          <button
            className="w-[120px] h-[36px] rounded-md text-center text-[13px] font-medium leading-4"
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
              {messageType === 'TEAM_RESPONSE' ||
              messageType === 'TEAM_REQUEST' ? (
                renderSpecialCard()
              ) : (
                <div className="bg-white rounded-lg p-2 min-w-fit max-w-[300px] text-black">
                  {content}
                </div>
              )}
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
            <span className="w-full text-[10px] text-gray-400 mr-1">
              {formattedTime}
            </span>
          )}
          {messageType === 'TEAM_RESPONSE' || messageType === 'TEAM_REQUEST' ? (
            renderSpecialCard()
          ) : (
            <div className="bg-[#6858FF] rounded-lg p-2 min-w-fit max-w-[300px] text-white">
              {content}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
