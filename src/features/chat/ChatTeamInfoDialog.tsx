import {Dialog, DialogContent} from '@/components/ui/dialog';

interface ChatTeamInfoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ChatTeamInfoDialog = ({open, onOpenChange}: ChatTeamInfoDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex items-center justify-center border-0 bg-transparent p-0 shadow-none [&>button]:hidden">
        <div className="flex h-[309px] w-[347px] flex-col items-center gap-[10px] rounded-2xl bg-white px-[15px] pt-[17px] pb-[19px] shadow-xl">
          <div className="text-center text-xl leading-7 font-medium">
            김뫄뫄님의 팀정보
          </div>
          <div className="bg-gray-2 h-[168px] w-[302px] rounded-[10px]"></div>
          <div className="mt-auto flex w-full gap-1.5">
            <button className="h-[54px] flex-1 rounded-lg bg-[#5F4AFF] text-center text-xl leading-7 font-medium text-white">
              제안하기
            </button>
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
