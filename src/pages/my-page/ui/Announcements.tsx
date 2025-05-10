import {LayoutBottomBar} from '@/layouts/LayoutBottomBar';
import {ChevronLeft, ChevronRight} from 'lucide-react';
import * as React from 'react';
import {Link, useNavigate} from 'react-router-dom';

export const Announcements: React.FC = () => {
  const navigate = useNavigate();
  return (
    <LayoutBottomBar
      hideBottomBar
      classNames={{
        wrapper: 'bg-white',
      }}
      header={
        <header className="px-3 py-2.5 flex gap-2.5">
          <button onClick={() => navigate(-1)}>
            <ChevronLeft className="w-6 h-6 stroke-[1.5]" />
          </button>
          <span className="text-xl tracking-[-0.5px] font-semibold">
            공지사항/이벤트
          </span>
        </header>
      }
    >
      <div className="bg-white flex-1 divide-y divide-[#F1F2F4]">
        <Link
          to="/"
          className="py-3 h-16 text-lg tracking-[-0.45px] text-left flex items-center justify-between"
        >
          <span>업데이트 내역</span>
          <ChevronRight className="stroke-[1.5]" />
        </Link>
        <Link
          to="/"
          className="py-3 h-16 text-lg tracking-[-0.45px] text-left flex items-center justify-between"
        >
          <span>팀 빌딩 시 유의사항</span>
          <ChevronRight className="stroke-[1.5]" />
        </Link>
      </div>
    </LayoutBottomBar>
  );
};
