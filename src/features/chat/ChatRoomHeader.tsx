import arrowLeftIcon from '@/assets/arrowLeft.svg';
import infoIcon from '@/assets/icons/info.svg';
import {useState} from 'react';
import ChatTeamInfoDialog from './ChatTeamInfoDialog';

interface ChatRoomHeaderProps {
  otherName: string;
  handleBack: () => void;
}

export const ChatRoomHeader = ({
  otherName,
  handleBack,
}: ChatRoomHeaderProps) => {
  const [isInfoDialogOpen, setIsInfoDialogOpen] = useState(false);

  const handleInfoDialogOpen = () => {
    setIsInfoDialogOpen(true);
  };

  const handleSuggest = () => {
    console.log('제안하기');
  };

  return (
    <header className="flex justify-between items-center pl-3 pr-5 py-2.5 h-12">
      <div className="flex items-center gap-2.5 ">
        <i
          className="w-6 h-6 flex justify-center items-center cursor-pointer"
          onClick={handleBack}
        >
          <img src={arrowLeftIcon} alt="뒤로가기" />
        </i>
        <span className="text-xl font-medium leading-7">{otherName}님</span>
      </div>
      <div className="text-center flex gap-[5px]">
        <img
          src={infoIcon}
          alt="제안하기"
          onClick={handleInfoDialogOpen}
          className="cursor-pointer"
        />
        <button
          onClick={handleSuggest}
          className="h-[26px] flex justify-center items-center gap-2.5 bg-[linear-gradient(96deg,#934AFF_1.73%,#4C82EE_98.27%)] px-2.5 py-[5px] rounded-[20px] text-white text-[13px] font-medium leading-4"
        >
          제안하기
        </button>
      </div>
      <ChatTeamInfoDialog
        open={isInfoDialogOpen}
        onOpenChange={setIsInfoDialogOpen}
      />
    </header>
  );
};
