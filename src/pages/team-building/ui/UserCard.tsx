import type {GetAllCardsResponseDto} from '@/entities/card';

import * as React from 'react';
import {Link} from 'react-router-dom';

import chatIcon from '@/assets/icons/chat.svg';
import robot from '@/assets/images/robot.png';
import {cn} from '@/lib/utils';
import {LikeButton} from './LikeButton';

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
  return (
    <Link
      to={`/profile/${memberId}`}
      className={cn(
        'flex cursor-pointer items-center justify-between border-b border-[#EEEEEE] bg-white p-[14px_20px_24px]',
        teamStatus === '마감' && 'bg-[#D9D9D9]',
      )}
    >
      <div className="flex gap-2">
        <div className="relative h-24 w-24 overflow-hidden rounded-[10px] bg-[#E9E9E9]">
          <img
            src={profileImageUrl || cardIdDataMap?.get(cardId)?.imgUrl || robot}
            alt={`${userName}'s profile`}
            className="h-full w-full object-cover"
          />
          <LikeButton
            className="absolute right-[5px] bottom-[5px]"
            likeId={likeId}
            userId={userId}
          />
        </div>

        <div className="flex w-[101px] flex-col gap-1 pt-1 text-left">
          <span className="text-[18px] leading-[1.33] font-medium tracking-[-2.5%] text-[#111111]">
            {userName}
          </span>
          <span className="text-[13px] leading-[1.23] font-medium tracking-[-2.5%] text-[#767676]">
            {cardIdDataMap?.get(cardId)?.name}
          </span>
        </div>
      </div>

      <div className="flex flex-col items-end justify-between self-stretch">
        <div className="flex items-center gap-1">
          <div className="flex items-center gap-1">
            <button className="flex h-6 items-center justify-center rounded-[11.5px] bg-[#F1F2F4] px-2">
              <span className="text-[13px] leading-[1.23] font-medium tracking-[-2.5%] text-[#111111]">
                궁합
              </span>
            </button>

            <button className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F1F2F4]">
              <img src={chatIcon} alt="Message icon" className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex h-5 items-center justify-center rounded-[4px] bg-[#D9D9D9] px-3">
          <span className="text-[13px] leading-[1.23] font-medium tracking-[-2.5%] text-[#111111]">
            {role}
          </span>
        </div>
      </div>
    </Link>
  );
};
