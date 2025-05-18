import {queryOptions} from '@tanstack/react-query';

import {getGroupData} from './get-group';

export const groupQueries = {
  all: () => ['group'],

  groupKey: () => [...groupQueries.all(), 'group'],
  group: (groupId: number) =>
    queryOptions({
      queryKey: [...groupQueries.groupKey(), groupId],
      queryFn: () => getGroupData(groupId),
    }),
};
