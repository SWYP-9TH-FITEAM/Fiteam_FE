import skipPopupImage from '@/assets/images/skip-popup.png';
import {Dialog, DialogContent} from '@/components/ui/dialog';

interface ProfileSkipDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProfileSkipDialog = ({open, onOpenChange}: ProfileSkipDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex items-center justify-center border-0 bg-transparent p-0 shadow-none [&>button]:hidden">
        <div className="flex h-[350px] w-[347px] flex-col items-center rounded-2xl bg-white px-[15px] pt-[17px] pb-[19px] shadow-xl">
          <div className="mb-4 text-center">
            <div className="text-gray-6 text-center text-base leading-6 font-medium">
              정말 건너뛰실건가요 ?
            </div>
            <div className="text-center text-xl leading-7 font-medium">
              프로필카드를 생성하면 팀빌딩에 <br />
              도움을 줄 수 있어요 !
            </div>
          </div>
          <img
            src={skipPopupImage}
            alt="건너뛰실건가요?"
            className="h-[130px] w-[158px]"
          />
          <div className="mt-auto flex w-full gap-1.5">
            <button className="h-[54px] flex-1 rounded-lg bg-[#5F4AFF] text-center text-xl leading-7 font-medium text-white">
              프로필 생성하기
            </button>
            <button
              className="h-[54px] w-[90px] rounded-lg bg-[#e9e9e9] text-center text-xl leading-7 font-medium"
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
