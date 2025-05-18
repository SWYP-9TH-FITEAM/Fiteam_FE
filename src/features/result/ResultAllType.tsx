import type {GetAllCardsResponseDto} from '@/entities/card';

import {useEffect, useState} from 'react';

import {getAllCards} from '@/entities/card';
import LayoutMo from '@/layouts/LayoutMo';
import TypeDialog from './TypeDialog';

interface ResultAllTypeProps {
  onClose: () => void;
}

const ResultAllType = ({onClose}: ResultAllTypeProps) => {
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
    <LayoutMo
      hasHeader={true}
      text="모든 결과 유형"
      onClickBack={onClose}
      bgColor="white"
    >
      <div className="mt-1 mb-[67px] flex flex-col items-center">
        <div className="flex w-full flex-col gap-3">
          {allCards.map(card => (
            <div
              key={card.id}
              className="bg-gray-1 flex h-[206px] cursor-pointer flex-col items-center justify-center rounded-lg p-4 shadow-sm"
              onClick={() => handleTypeClick(card.id)}
            >
              <div className="mb-[10px] h-[140px] w-[140px] bg-gray-200"></div>
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
