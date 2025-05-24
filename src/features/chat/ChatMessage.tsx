import paperPlane from '@/assets/images/paper-plane.png';
import {ChatMessageDto} from '@/entities/chat/api/user-chat/dto';
import {formatTimeString} from '@/features/chat/utils/formatTimeString';

type ChatMessageProps = {
  message: ChatMessageDto;
  isMine: boolean;
  showProfile?: boolean;
  otherName?: string;
  showTime?: boolean;
  isNewSender?: boolean;
  hanleAcceptRequest?: () => void;
  groupId?: number;
  handleOpenInfoDialog?: () => void;
};

export const ChatMessage = ({
  message,
  isMine,
  showProfile = true,
  otherName,
  showTime = false,
  isNewSender = false,
  hanleAcceptRequest,
  groupId,
  handleOpenInfoDialog,
}: ChatMessageProps) => {
  const {messageType, content, sentAt} = message;

  const formattedTime = formatTimeString(sentAt);

  const viewTeamInfo = async () => {
    if (!groupId) return;
    handleOpenInfoDialog?.();
  };

  const typeMap = {
    TEAM_REQUEST: {
      text: '제안을 하셨습니다!', // TODO: api응답으로 교체
      button: '수락하기',
      bg: isMine ? '#F6B354' : '#fff',
      btnBg: isMine ? '#fff' : '#5F4AFF',
      btnText: isMine ? '#111' : '#fff',
      onClick: isMine ? () => {} : hanleAcceptRequest,
    },
    TEAM_RESPONSE: {
      text: '제안을 받았습니다!', // TODO: api응답으로 교체
      button: '나의 팀 보기',
      bg: isMine ? '#F6B354' : '#fff',
      btnBg: isMine ? '#fff' : '#5F4AFF',
      btnText: isMine ? '#111' : '#fff',
      onClick: viewTeamInfo,
    },
  } as const;

  const renderSpecialCard = () => {
    const type = typeMap[messageType as keyof typeof typeMap];
    if (!type) return null;
    return (
      <div className="flex justify-center">
        <div
          className="flex h-[161px] w-[153px] flex-col items-center justify-between rounded-2xl px-2 py-[10px]"
          style={{backgroundColor: type.bg}}
        >
          <div className="text-center text-[13px] leading-4 font-medium whitespace-pre-line">
            {message.content}
          </div>
          <img src={paperPlane} alt="제안" className="mb-3 h-[50px] w-[70px]" />
          <button
            onClick={type.onClick}
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
            {showProfile && otherName && (
              <div className="mb-[6px] text-[13px] leading-4 font-medium text-[#111]">
                {otherName}
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
                <div className="w-fit max-w-[300px] rounded-lg bg-white p-2 text-black">
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
            <span className="mr-1 text-[10px] text-gray-400">
              {formattedTime}
            </span>
          )}
          {messageType === 'TEAM_RESPONSE' || messageType === 'TEAM_REQUEST' ? (
            renderSpecialCard()
          ) : (
            <div className="max-w-[300px] rounded-lg bg-[#6858FF] p-2 text-white">
              {content}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
