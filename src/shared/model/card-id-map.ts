import type {GetAllCardsResponseDto} from '@/entities/card';

import {QueryClient} from '@tanstack/react-query';
import {atom, useAtomValue} from 'jotai';
import {loadable} from 'jotai/utils';

import {cardQueries} from '@/entities/card/api/card.query';

const cardIdMapAtom = loadable(
  atom(async () => {
    const queryClient = new QueryClient();
    try {
      const cards = await queryClient.fetchQuery(cardQueries.allCards());

      return cards.reduce((acc, card) => {
        acc.set(card.id, card);
        return acc;
      }, new Map<number, GetAllCardsResponseDto[number]>());
    } catch (error) {
      console.error('Failed to fetch card data:', error);
      return new Map<number, GetAllCardsResponseDto[number]>();
    }
  }),
);

export const useCardIdMap = () => useAtomValue(cardIdMapAtom);
