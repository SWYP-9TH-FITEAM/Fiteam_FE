import * as React from 'react';
import robot from '@/assets/images/robot.png';
import {cn} from '@/lib/utils';
import chatIcon from '@/assets/icons/chat.svg';
import heartIcon from '@/assets/icons/heart.svg';
import {GetAllCardsResponseDto} from '@/entities/card';
import {Link} from 'react-router-dom';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {deleteLikeUnlike, postLikeAdd} from '@/entities/like/api';
import {useCurrentGroupId} from '@/shared/model/group-id';
import {memberQueries} from '@/entities/member/api';
import {toast} from 'sonner';

interface UserCardProps {
  userName: string;
  profileImageUrl?: string;
  role: string;
  teamStatus: string;
  cardIdDataMap: Map<number, GetAllCardsResponseDto[number]> | null;
  cardId: number;
  memberId: number;
  likeId: number | null;
  userId: number;
}

export const UserCard: React.FC<UserCardProps> = ({
  userName,
  cardId,
  profileImageUrl,
  role,
  likeId,
  teamStatus,
  cardIdDataMap,
  memberId,
  userId,
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
    <Link
      to={`/profile/${memberId}`}
      className={cn(
        'flex justify-between items-center p-[14px_20px_24px] bg-white border-b border-[#EEEEEE] cursor-pointer',
        teamStatus === '마감' && 'bg-[#D9D9D9]',
      )}
    >
      <div className="flex gap-2">
        <div className="w-24 h-24 rounded-[10px] bg-[#E9E9E9] overflow-hidden relative">
          <img
            src={profileImageUrl || cardIdDataMap?.get(cardId)?.imgUrl || robot}
            alt={`${userName}'s profile`}
            className="w-full h-full object-cover"
          />
          <button
            className="absolute bottom-[5px] right-[5px] rounded-full bg-white w-6 h-6 flex items-center justify-center"
            onClick={handleHeartClick}
          >
            <img
              src={heartIcon}
              alt="Like"
              className={cn('w-4 h-4', !isLiked && 'grayscale-100')}
            />
          </button>
        </div>

        <div className="flex flex-col gap-1 w-[101px] pt-1 text-left">
          <span className="text-[18px] font-medium leading-[1.33] tracking-[-2.5%] text-[#111111]">
            {userName}
          </span>
          <span className="text-[13px] font-medium leading-[1.23] tracking-[-2.5%] text-[#767676]">
            {cardIdDataMap?.get(cardId)?.name}
          </span>
        </div>
      </div>

      <div className="flex flex-col items-end justify-between self-stretch">
        <div className="flex items-center gap-1">
          <div className="flex items-center gap-1">
            <button className="px-2 h-6 rounded-[11.5px] bg-[#F1F2F4] flex items-center justify-center">
              <span className="text-[13px] font-medium leading-[1.23] tracking-[-2.5%] text-[#111111]">
                궁합
              </span>
            </button>

            <button className="w-6 h-6 rounded-full bg-[#F1F2F4] flex items-center justify-center">
              <img src={chatIcon} alt="Message icon" className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="px-3 h-5 rounded-[4px] bg-[#D9D9D9] flex items-center justify-center">
          <span className="text-[13px] font-medium leading-[1.23] tracking-[-2.5%] text-[#111111]">
            {role}
          </span>
        </div>
      </div>
    </Link>
  );
};
