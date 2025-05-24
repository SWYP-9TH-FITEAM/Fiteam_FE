import {useQuery} from '@tanstack/react-query';

import {Dialog, DialogContent} from '@/components/ui/dialog';
import {GetChatRoomDataResponseDto} from '@/entities/chat/api/user-chat/dto';
import {teamQueries} from '@/entities/team/api/team.query';

interface ChatTeamInfoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  chatRoomData: GetChatRoomDataResponseDto;
  onClickSuggest?: () => void;
  isMyTeam?: boolean;
}

const ChatTeamInfoDialog = ({
  open,
  onOpenChange,
  chatRoomData,
  isMyTeam,
  onClickSuggest,
}: ChatTeamInfoDialogProps) => {
  const {data: otherTeamData} = useQuery({
    ...teamQueries.teamBySenderIdGroupId(
      chatRoomData.user2Id,
      chatRoomData.groupId,
    ),
    enabled: !isMyTeam,
  });

  const {data: myTeamData} = useQuery({
    ...teamQueries.myTeam(chatRoomData.groupId),
    enabled: isMyTeam,
  });

  const handleSuggest = () => {
    if (onClickSuggest) {
      onClickSuggest();
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex items-center justify-center border-0 bg-transparent p-0 shadow-none [&>button]:hidden">
        <div className="flex h-[309px] w-[347px] flex-col items-center gap-[10px] rounded-2xl bg-white px-[15px] pt-[17px] pb-[19px] shadow-xl">
          <div className="text-center text-xl leading-7 font-medium">
            {isMyTeam
              ? '나의 팀 정보'
              : `${chatRoomData.user2Name}님의 팀 정보`}
          </div>
          <div className="bg-gray-2 h-[168px] w-[302px] rounded-[10px] px-[36px] py-[26px]">
            {isMyTeam
              ? myTeamData?.members.map(teamMember => (
                  <div key={teamMember.userId}>
                    <span className="mr-5">{teamMember.position}</span>
                    <span>{teamMember.userName}</span>
                  </div>
                ))
              : otherTeamData?.map(teamMember => (
                  <div key={teamMember.userId}>
                    <span className="mr-5">{teamMember.position}</span>
                    <span>{teamMember.userName}</span>
                  </div>
                ))}
          </div>

          <div className="mt-auto flex w-full gap-1.5">
            {onClickSuggest && (
              <button
                onClick={handleSuggest}
                className="h-[54px] flex-1 rounded-lg bg-[#5F4AFF] text-center text-xl leading-7 font-medium text-white"
              >
                제안하기
              </button>
            )}
            <button
              className="h-[54px] w-[90px] rounded-lg bg-[#e9e9e9] text-center text-xl leading-7 font-medium"
              onClick={() => onOpenChange(false)}
              type="button"
            >
              닫기
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default ChatTeamInfoDialog;
