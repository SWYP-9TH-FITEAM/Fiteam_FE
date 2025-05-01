import {Dialog, DialogContent} from '@/components/ui/dialog';
import {useNavigate} from 'react-router-dom';

interface TypeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedTypeIndex: number;
}

const TypeDialog = ({
  open,
  onOpenChange,
  selectedTypeIndex,
}: TypeDialogProps) => {
  const navigate = useNavigate();
  //TODO: selectedTypeIndex GET요청으로 타이틀, 설명 받아오기
  const title = `목표를 향해 돌진하는 로봇 ${selectedTypeIndex + 1}`;
  const description = '성향 상세 정보 어쩌구어쩌구';

  const handleClickMore = () => {
    navigate(`/result/${selectedTypeIndex}`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 border-0 shadow-none bg-transparent flex items-center justify-center [&>button]:hidden">
        <div className="w-[347px] h-[350px] rounded-2xl bg-white pt-[17px] pb-[19px] px-[15px] flex flex-col items-center shadow-xl">
          <div className="text-6xl mb-6">✋</div>

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
