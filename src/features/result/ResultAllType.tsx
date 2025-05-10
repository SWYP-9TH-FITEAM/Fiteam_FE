import LayoutMo from '@/layouts/LayoutMo';
import TypeDialog from './TypeDialog';
import {useState, useEffect} from 'react';
import {getAllCards} from '@/entities/card';
import type {GetAllCardsResponseDto} from '@/entities/card';

const ResultAllType = () => {
  const [isTypeDialogOpen, setIsTypeDialogOpen] = useState(false);
  const [selectedTypeId, setSelectedTypeId] = useState<number>(0);
  const [allCards, setAllCards] = useState<GetAllCardsResponseDto>([]);

  useEffect(() => {
    // /v1/card/all API 호출
    getAllCards()
      .then(setAllCards)
      .catch(error => {
        // TODO: 에러 핸들링 필요시 추가
        console.error('카드 전체 목록 불러오기 실패:', error);
      });
  }, []);

  const selectedCard = allCards.find(card => card.id === selectedTypeId);

  const handleTypeClick = (id: number) => {
    setSelectedTypeId(id);
    setIsTypeDialogOpen(true);
  };

  return (
    <LayoutMo hasHeader={true} text="모든 결과 유형">
      <div className="flex flex-col items-center mt-1 mb-[67px]">
        <div className="flex flex-col gap-3 w-full">
          {allCards.map(card => (
            <div
              key={card.id}
              className="bg-gray-1 rounded-lg p-4 h-[206px] shadow-sm flex flex-col items-center justify-center cursor-pointer"
              onClick={() => handleTypeClick(card.id)}
            >
              <div className="w-[140px] h-[140px] bg-gray-200 mb-[10px]"></div>
              <div className="text-lg font-medium">{card.name}</div>
            </div>
          ))}
        </div>
      </div>

      <TypeDialog
        open={isTypeDialogOpen}
        onOpenChange={setIsTypeDialogOpen}
        card={selectedCard}
      />
    </LayoutMo>
  );
};

export default ResultAllType;
