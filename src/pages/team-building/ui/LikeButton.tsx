import * as React from 'react';

import heartIcon from '@/assets/icons/heart.svg';
import {useCurrentGroupId} from '@/shared/model/group-id';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {deleteLikeUnlike, postLikeAdd} from '@/entities/like/api';
import {memberQueries} from '@/entities/member/api';
import {toast} from 'sonner';
import {cn} from '@/lib/utils';

interface LikeButtonProps {
  likeId: number | null;
  userId: number;
  className?: string;
}

export const LikeButton: React.FC<LikeButtonProps> = ({
  likeId,
  userId,
  className,
}) => {
  const currentGroupId = useCurrentGroupId();

  const queryClient = useQueryClient();

  const {mutateAsync: addLike} = useMutation({
    mutationFn: postLikeAdd,
    onSuccess: async () => {
      if (!currentGroupId) return;
      await queryClient.fetchQuery(
        memberQueries.membersByGroupId(currentGroupId),
      );
      toast.success('좋아요를 눌렀습니다.');
    },
  });

  const {mutateAsync: removeLike} = useMutation({
    mutationFn: deleteLikeUnlike,
    onSuccess: async () => {
      if (!currentGroupId) return;
      await queryClient.fetchQuery(
        memberQueries.membersByGroupId(currentGroupId),
      );
      toast.success('좋아요를 취소했습니다.');
    },
  });

  const isLiked = likeId !== null;

  const handleHeartClick: React.MouseEventHandler<HTMLButtonElement> = e => {
    e.stopPropagation();
    e.preventDefault();

    if (!currentGroupId) return;

    if (likeId) {
      removeLike(likeId);
    } else {
      addLike({
        groupId: currentGroupId,
        memo: '',
        number: 1,
        receiverId: userId,
      });
    }
  };

  return (
    <button
      className={cn(
        'rounded-full bg-white w-6 h-6 flex items-center justify-center',
        className,
      )}
      onClick={handleHeartClick}
    >
      <img
        src={heartIcon}
        alt="Like"
        className={cn('w-4 h-4', !isLiked && 'grayscale-100')}
      />
    </button>
  );
};
