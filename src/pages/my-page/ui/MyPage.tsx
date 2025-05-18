import * as React from 'react';
import {ChevronRight} from 'lucide-react';
import {Link} from 'react-router-dom';

import {LayoutBottomBar} from '@/layouts/LayoutBottomBar';

export const MyPage: React.FC = () => {
  return (
    <LayoutBottomBar
      classNames={{
        wrapper: 'bg-[#EEECFF]',
        scrollableArea: 'px-0 flex flex-col',
      }}
      header={
        <header className="h-12 px-3 py-2.5 text-center text-2xl font-semibold tracking-[-0.6px]">
          마이페이지
        </header>
      }
    >
      <div className="mt-6 flex items-center gap-3.5 px-5">
        <div className="h-14 w-14 rounded-full bg-white"></div>
        <div className="flex flex-col items-start">
          <span className="text-xl font-medium tracking-[-0.5px]">아무개</span>
          <Link
            to="/profile"
            className="text-sm font-medium tracking-[-0.5px] text-[#585858]"
          >
            기본 정보 보기
          </Link>
        </div>
      </div>

      <div className="mt-6 flex-1 divide-y divide-[#F1F2F4] rounded-t-[30px] bg-white px-5 pt-6 shadow-[0px_-1px_2px_0px_#CECBE8]">
        <Link
          to="/profile"
          className="flex h-16 items-center justify-between py-3 text-left text-lg tracking-[-0.45px]"
        >
          내 프로필 카드
        </Link>
        <Link
          to="/settings"
          className="flex h-16 items-center justify-between py-3 text-left text-lg tracking-[-0.45px]"
        >
          설정
        </Link>
        <Link
          to="/announcements"
          className="flex h-16 items-center justify-between py-3 text-lg tracking-[-0.45px]"
        >
          <span>공지사항/이벤트</span>
          <ChevronRight className="stroke-[1.5]" />
        </Link>
        <div className="flex h-16 items-center justify-between py-3 text-lg font-medium tracking-[-0.45px]">
          <span>웹 정보</span>
          <span>v 1.0</span>
        </div>
      </div>
    </LayoutBottomBar>
  );
};
