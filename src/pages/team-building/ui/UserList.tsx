import * as React from 'react';
import {UserCard} from './UserCard';
import {useQueries} from '@tanstack/react-query';
import {useCurrentGroupId} from '@/shared/model/group-id';
import {memberQueries} from '@/entities/member/api';
import {cardQueries} from '@/entities/card/api/card.query';
import {useCardIdMap} from '@/shared/model/card-id-map';

interface UserListProps {
  selectedRole: string;
  excludeClosed: boolean;
}

export const UserList: React.FC<UserListProps> = ({
  selectedRole,
  excludeClosed,
}) => {
  const currentGroupId = useCurrentGroupId();

  const cardData = useCardIdMap();

  const {
    data: [{data: members}],
    loading,
  } = useQueries({
    queries: [
      {
        ...memberQueries.membersByGroupId(currentGroupId ?? 0),
        enabled: currentGroupId !== null,
      },
      cardQueries.allCards(),
    ],
    combine: data => {
      return {
        data,
        loading: data.some(data => data.isLoading),
      };
    },
  });

  const filteredMembers = React.useMemo(() => {
    return members?.filter(
      member =>
        (!excludeClosed || member.teamStatus !== '마감') &&
        member.position === selectedRole,
    );
  }, [members, excludeClosed, selectedRole]);

  return (
    <div className="flex flex-col">
      {(loading || cardData.state === 'loading') && (
        <div className="loading loading-spinner loading-xl" />
      )}
      {cardData.state === 'hasError' && <div>에러가 발생했습니다.</div>}
      {cardData.state === 'hasData' &&
        filteredMembers?.map(member => (
          <UserCard
            key={member.userId}
            userName={member.userName}
            cardId={member.cardId1}
            profileImageUrl={member.profileImageUrl ?? ''}
            role={member.position ?? ''}
            teamStatus={member.teamStatus}
            cardIdDataMap={cardData.data}
            memberId={member.memberId}
            likeId={member.likeId}
            userId={member.userId}
          />
        ))}
    </div>
  );
};
