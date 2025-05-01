import LayoutMo from '@/layouts/LayoutMo';
import TypeDialog from './TypeDialog';
import {useState} from 'react';

const ResultAllType = () => {
  const [isTypeDialogOpen, setIsTypeDialogOpen] = useState(false);
  const [selectedTypeIndex, setSelectedTypeIndex] = useState<number>(0);

  const handleTypeClick = (index: number) => {
    setSelectedTypeIndex(index);
    setIsTypeDialogOpen(true);
  };

  return (
    <LayoutMo hasHeader={true} text="모든 결과 유형">
      <div className="flex flex-col items-center mt-1 mb-[67px]">
        <div className="flex flex-col gap-3 w-full">
          {Array.from({length: 16}).map((_, index) => (
            // TODO: GET16개 데이터에서 오는 index (1~16)
            <div
              key={index}
              className="bg-white rounded-lg p-4 h-[206px] shadow-sm flex flex-col items-center justify-center cursor-pointer"
              onClick={() => handleTypeClick(index)}
            >
              <div className="w-16 h-16 rounded-full bg-gray-200 mb-2"></div>
              <div className="text-lg font-medium">
                목표를 향해 돌진하는 로봇 {index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>

      <TypeDialog
        open={isTypeDialogOpen}
        onOpenChange={setIsTypeDialogOpen}
        selectedTypeIndex={selectedTypeIndex}
      />
    </LayoutMo>
  );
};

export default ResultAllType;
