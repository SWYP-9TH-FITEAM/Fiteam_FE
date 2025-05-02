import {Dialog, DialogContent} from '@/components/ui/dialog';

interface ProfileSkipDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProfileSkipDialog = ({open, onOpenChange}: ProfileSkipDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 border-0 shadow-none bg-transparent flex items-center justify-center [&>button]:hidden">
        <div className="w-[347px] h-[350px] rounded-2xl bg-white pt-[17px] pb-[19px] px-[15px] flex flex-col items-center shadow-xl">
          <div className="text-center mb-4">
            <div className="text-gray-400 text-lg font-medium mb-1">
              정말 건너뛰실건가요 ?
            </div>
            <div className="text-black text-xl font-medium leading-tight mb-1">
              프로필카드를 생성하면 팀빌딩에 <br />
              도움을 줄 수 있어요 !
            </div>
          </div>
          <div className="text-6xl mb-6">✋</div>
          <div className="flex w-full gap-1.5 mt-auto">
            <button className="flex-1 h-[54px] rounded-lg bg-[#EEECFF] text-[#5F4AFF] font-bold text-xl whitespace-nowrap">
              프로필 생성하기
            </button>
            <button
              className="w-[90px] h-[54px] rounded-lg bg-gray-100 text-gray-500 font-medium text-base"
              onClick={() => onOpenChange(false)}
              type="button"
            >
              건너뛰기
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default ProfileSkipDialog;
