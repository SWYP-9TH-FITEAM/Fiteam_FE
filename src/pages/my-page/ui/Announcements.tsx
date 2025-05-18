import * as React from 'react';
import {ChevronLeft, ChevronRight} from 'lucide-react';
import {Link, useNavigate} from 'react-router-dom';

import {LayoutBottomBar} from '@/layouts/LayoutBottomBar';

export const Announcements: React.FC = () => {
  const navigate = useNavigate();
  return (
    <LayoutBottomBar
      hideBottomBar
      classNames={{
        wrapper: 'bg-white',
      }}
      header={
        <header className="flex gap-2.5 px-3 py-2.5">
          <button onClick={() => navigate(-1)}>
            <ChevronLeft className="h-6 w-6 stroke-[1.5]" />
          </button>
          <span className="text-xl font-semibold tracking-[-0.5px]">
            공지사항/이벤트
          </span>
        </header>
      }
    >
      <div className="flex-1 divide-y divide-[#F1F2F4] bg-white">
        <Link
          to="/"
          className="flex h-16 items-center justify-between py-3 text-left text-lg tracking-[-0.45px]"
        >
          <span>업데이트 내역</span>
          <ChevronRight className="stroke-[1.5]" />
        </Link>
        <Link
          to="/"
          className="flex h-16 items-center justify-between py-3 text-left text-lg tracking-[-0.45px]"
        >
          <span>팀 빌딩 시 유의사항</span>
          <ChevronRight className="stroke-[1.5]" />
        </Link>
      </div>
    </LayoutBottomBar>
  );
};
