import * as React from 'react';
import {UserCard} from './UserCard';

export interface User {
  id: number;
  userName: string;
  userType: string;
  profileImageUrl?: string;
  position: string;
}

interface UserListProps {
  users: User[];
  onUserClick?: (userId: number) => void;
  likedUserIds?: number[];
  onLikeToggle?: (userId: number) => void;
}

export const UserList: React.FC<UserListProps> = ({
  users,
  onUserClick,
  likedUserIds = [],
  onLikeToggle,
}) => {
  return (
    <div className="flex flex-col">
      {users.map(user => (
        <UserCard
          key={user.id}
          userName={user.userName}
          userType={user.userType}
          profileImageUrl={user.profileImageUrl}
          role={user.position}
          isLiked={likedUserIds.includes(user.id)}
          onClick={() => onUserClick?.(user.id)}
          onHeartClick={() => onLikeToggle?.(user.id)}
        />
      ))}
    </div>
  );
};
