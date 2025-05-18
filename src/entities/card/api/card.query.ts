import {queryOptions} from '@tanstack/react-query';

import {getAllCards, getCardById} from './create-card';

export const cardQueries = {
  all: () => ['card'],

  allCardsKey: () => [...cardQueries.all(), 'all'],
  allCards: () =>
    queryOptions({
      queryKey: [...cardQueries.allCardsKey()],
      queryFn: () => getAllCards(),
    }),

  cardByIdKey: (cardId: number) => [...cardQueries.all(), 'card', cardId],
  cardById: (cardId: number) =>
    queryOptions({
      queryKey: [...cardQueries.cardByIdKey(cardId)],
      queryFn: () => getCardById(cardId),
    }),
};
