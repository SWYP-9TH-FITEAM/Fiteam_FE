import * as React from 'react';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {toast} from 'sonner';

import heartIcon from '@/assets/icons/heart.svg';
import {deleteLikeUnlike, postLikeAdd} from '@/entities/like/api';
import {memberQueries} from '@/entities/member/api';
import {cn} from '@/lib/utils';
import {useCurrentGroupId} from '@/shared/model/group-id';

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
    onError: error => {
      toast.error('좋아요를 누르는 중 오류가 발생했습니다.');
      console.error('Like error:', error);
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
    onError: error => {
      toast.error('좋아요를 취소하는 중 오류가 발생했습니다.');
      console.error('Unlike error:', error);
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
        'flex h-6 w-6 items-center justify-center rounded-full bg-white',
        className,
      )}
      onClick={handleHeartClick}
    >
      <img
        src={heartIcon}
        alt="Like"
        className={cn('h-4 w-4', !isLiked && 'grayscale-100')}
      />
    </button>
  );
};
