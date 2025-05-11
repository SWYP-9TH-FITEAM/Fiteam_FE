import * as React from 'react';
import robot from '@/assets/images/robot.png';
import {cn} from '@/lib/utils';
import chatIcon from '@/assets/icons/chat.svg';
import heartIcon from '@/assets/icons/heart.svg';

interface UserCardProps {
  userName: string;
  userType: string;
  profileImageUrl?: string;
  role: string;
  onClick?: () => void;
  isLiked?: boolean;
  onHeartClick?: (event: React.MouseEvent) => void;
}

export const UserCard: React.FC<UserCardProps> = ({
  userName,
  userType,
  profileImageUrl,
  role,
  onClick,
  onHeartClick,
  isLiked = false,
}) => {
  const handleHeartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onHeartClick?.(e);
  };

  return (
    <div
      className="flex justify-between items-center p-[14px_20px_24px] bg-white border-b border-[#EEEEEE] cursor-pointer"
      onClick={onClick}
    >
      <div className="flex gap-2">
        <div className="w-24 h-24 rounded-[10px] bg-[#E9E9E9] overflow-hidden relative">
          <img
            src={profileImageUrl || robot}
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
            {userType}
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
    </div>
  );
};
