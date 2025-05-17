import {GetAllCardsResponseDto} from '@/entities/card';
import {cardQueries} from '@/entities/card/api/card.query';
import {QueryClient} from '@tanstack/react-query';
import {atom, useAtomValue} from 'jotai';
import {loadable} from 'jotai/utils';

const cardIdMapAtom = loadable(
  atom(async () => {
    const queryClient = new QueryClient();
    const cards = await queryClient.fetchQuery(cardQueries.allCards());

    return cards.reduce((acc, card) => {
      acc.set(card.id, card);
      return acc;
    }, new Map<number, GetAllCardsResponseDto[number]>());
  }),
);

export const useCardIdMap = () => useAtomValue(cardIdMapAtom);
