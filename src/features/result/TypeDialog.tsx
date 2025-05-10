import {Dialog, DialogContent} from '@/components/ui/dialog';
import {useNavigate} from 'react-router-dom';
import type {GetCardResponseDto} from '@/entities/card';

interface TypeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  card?: GetCardResponseDto;
}

const TypeDialog = ({open, onOpenChange, card}: TypeDialogProps) => {
  const navigate = useNavigate();
  const title = card?.name ?? '';
  const description = card?.summary ?? '';

  const handleClickMore = () => {
    navigate(`/result/${card?.id}`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 border-0 shadow-none bg-transparent flex items-center justify-center [&>button]:hidden">
        <div className="w-[347px] h-[350px] rounded-2xl bg-white pt-[17px] pb-[19px] px-[15px] flex flex-col items-center shadow-xl">
          <div className="w-[140px] h-[140px] bg-gray-200 mb-[10px]"></div>

          <div className="text-center mb-4">
            <div className="text-black text-xl font-medium leading-tight mb-1">
              {title}
            </div>
            <div className="text-[#111] text-center text-base font-medium leading-6 tracking-[-0.4px]">
              {description}
            </div>
          </div>
          <div className="flex w-full gap-1.5 mt-auto">
            <button
              className="w-full h-[54px] rounded-lg bg-gray-100 text-[#111] font-medium text-base"
              onClick={handleClickMore}
              type="button"
              disabled={!card}
            >
              자세히보기
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default TypeDialog;
