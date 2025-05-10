import {LayoutBottomBar} from '@/layouts/LayoutBottomBar';
import {ChevronRight} from 'lucide-react';
import * as React from 'react';
import {Link} from 'react-router-dom';

export const MyPage: React.FC = () => {
  return (
    <LayoutBottomBar
      classNames={{
        wrapper: 'bg-[#EEECFF]',
        scrollableArea: 'px-0 flex flex-col',
      }}
      header={
        <header className="px-3 py-2.5 h-12 text-2xl tracking-[-0.6px] font-semibold text-center">
          마이페이지
        </header>
      }
    >
      <div className="px-5 flex gap-3.5 items-center mt-6">
        <div className="w-14 h-14 rounded-full bg-white"></div>
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

      <div className="rounded-t-[30px] bg-white shadow-[0px_-1px_2px_0px_#CECBE8] px-5 pt-6 mt-6 flex-1 divide-y divide-[#F1F2F4]">
        <Link
          to="/profile"
          className="py-3 h-16 text-lg tracking-[-0.45px] text-left flex items-center justify-between"
        >
          내 프로필 카드
        </Link>
        <Link
          to="/settings"
          className="py-3 h-16 text-lg tracking-[-0.45px] text-left flex items-center justify-between"
        >
          설정
        </Link>
        <Link
          to="/announcements"
          className="py-3 h-16 text-lg tracking-[-0.45px] flex items-center justify-between"
        >
          <span>공지사항/이벤트</span>
          <ChevronRight className="stroke-[1.5]" />
        </Link>
        <div className="py-3 h-16 font-medium text-lg tracking-[-0.45px] flex items-center justify-between">
          <span>웹 정보</span>
          <span>v 1.0</span>
        </div>
      </div>
    </LayoutBottomBar>
  );
};
