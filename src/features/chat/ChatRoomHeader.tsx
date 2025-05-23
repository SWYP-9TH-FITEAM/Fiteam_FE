import {useState} from 'react';

import arrowLeftIcon from '@/assets/arrowLeft.svg';
import infoIcon from '@/assets/icons/info.svg';
import {GetChatRoomDataResponseDto} from '@/entities/chat/api/user-chat/dto';
import {postTeamRequest} from '@/entities/team/api/create-team';
import ChatTeamInfoDialog from './ChatTeamInfoDialog';

interface ChatRoomHeaderProps {
  chatRoomData: GetChatRoomDataResponseDto;
  handleBack: () => void;
  handleSendRequest: () => void;
}

export const ChatRoomHeader = ({
  chatRoomData,
  handleBack,
  handleSendRequest,
}: ChatRoomHeaderProps) => {
  const [isInfoDialogOpen, setIsInfoDialogOpen] = useState(false);
  const [isRequesting, setIsRequesting] = useState(false);

  const handleInfoDialogOpen = () => {
    setIsInfoDialogOpen(true);
  };

  const handleSuggest = async () => {
    if (isRequesting || !chatRoomData?.groupId || !chatRoomData?.user2Id)
      return;

    try {
      setIsRequesting(true);
      await postTeamRequest(chatRoomData.groupId, chatRoomData.user2Id);
    } finally {
      handleSendRequest();
      setIsRequesting(false);
    }
  };

  return (
    <header className="flex h-12 items-center justify-between py-2.5 pr-5 pl-3">
      <div className="flex items-center gap-2.5">
        <i
          className="flex h-6 w-6 cursor-pointer items-center justify-center"
          onClick={handleBack}
        >
          <img src={arrowLeftIcon} alt="뒤로가기" />
        </i>
        <span className="text-xl leading-7 font-medium">
          {chatRoomData.user2Name}님
        </span>
      </div>
      <div className="flex gap-[5px] text-center">
        <img
          src={infoIcon}
          alt="제안하기"
          onClick={handleInfoDialogOpen}
          className="cursor-pointer"
        />
        <button
          onClick={handleSuggest}
          disabled={isRequesting}
          className="flex h-[26px] items-center justify-center gap-2.5 rounded-[20px] bg-[linear-gradient(96deg,#934AFF_1.73%,#4C82EE_98.27%)] px-2.5 py-[5px] text-[13px] leading-4 font-medium text-white disabled:opacity-50"
        >
          제안하기
        </button>
      </div>
      <ChatTeamInfoDialog
        open={isInfoDialogOpen}
        onOpenChange={setIsInfoDialogOpen}
        chatRoomData={chatRoomData}
        onClick={handleSuggest}
      />
    </header>
  );
};
