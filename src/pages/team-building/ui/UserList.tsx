import * as React from 'react';
import {UserCard} from './UserCard';
import {useQueries} from '@tanstack/react-query';
import {useCurrentGroupId} from '@/shared/model/group-id';
import {memberQueries} from '@/entities/member/api';
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
    error,
  } = useQueries({
    queries: [
      {
        ...memberQueries.membersByGroupId(currentGroupId ?? -1),
        enabled: currentGroupId !== null,
      },
    ],
    combine: data => {
      return {
        data,
        loading: data.some(data => data.isLoading),
        error: data.some(data => data.isError),
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
      {(error || cardData.state === 'hasError') && (
        <div>에러가 발생했습니다.</div>
      )}
      {cardData.state === 'hasData' && filteredMembers?.length === 0 && (
        <div className="text-center p-4">해당 조건의 멤버가 없습니다.</div>
      )}
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
