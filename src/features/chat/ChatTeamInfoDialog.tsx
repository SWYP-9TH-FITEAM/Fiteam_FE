import {Dialog, DialogContent} from '@/components/ui/dialog';
interface ChatTeamInfoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ChatTeamInfoDialog = ({open, onOpenChange}: ChatTeamInfoDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 border-0 shadow-none bg-transparent flex items-center justify-center [&>button]:hidden">
        <div className="w-[347px] h-[309px] rounded-2xl bg-white pt-[17px] pb-[19px] px-[15px] flex flex-col items-center shadow-xl gap-[10px]">
          <div className="text-center text-xl font-medium leading-7">
            김뫄뫄님의 팀정보
          </div>
          <div className="w-[302px] h-[168px] rounded-[10px] bg-gray-2"></div>
          <div className="flex w-full gap-1.5 mt-auto">
            <button className="flex-1 h-[54px] rounded-lg text-white bg-[#5F4AFF] text-center text-xl font-medium leading-7">
              제안하기
            </button>
            <button
              className="w-[90px] h-[54px] rounded-lg bg-[#e9e9e9] text-center text-xl font-medium leading-7"
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
