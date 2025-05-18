import type {GetCardResponseDto} from '@/entities/card';

import {useNavigate} from 'react-router-dom';

import {Dialog, DialogContent} from '@/components/ui/dialog';

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
    if (card?.id) {
      navigate(`/result/${card.id}`);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex items-center justify-center border-0 bg-transparent p-0 shadow-none [&>button]:hidden">
        <div className="flex h-[350px] w-[347px] flex-col items-center rounded-2xl bg-white px-[15px] pt-[17px] pb-[19px] shadow-xl">
          <div className="mb-[10px] h-[140px] w-[140px] bg-gray-200"></div>

          <div className="mb-4 text-center">
            <div className="mb-1 text-xl leading-tight font-medium text-black">
              {title}
            </div>
            <div className="text-center text-base leading-6 font-medium tracking-[-0.4px] text-[#111]">
              {description}
            </div>
          </div>
          <div className="mt-auto flex w-full gap-1.5">
            <button
              className="h-[54px] w-full rounded-lg bg-gray-100 text-base font-medium text-[#111]"
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
