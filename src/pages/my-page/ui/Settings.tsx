import {LayoutBottomBar} from '@/layouts/LayoutBottomBar';
import {ChevronLeft, ChevronRight} from 'lucide-react';
import * as React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {LogoutButton} from './LogoutButton';

export const Settings: React.FC = () => {
  const navigate = useNavigate();

  return (
    <LayoutBottomBar
      classNames={{wrapper: 'bg-white', scrollableArea: 'px-0'}}
      hideBottomBar
      header={
        <header className="px-3 py-2.5 flex gap-2.5">
          <button onClick={() => navigate(-1)}>
            <ChevronLeft className="w-6 h-6 stroke-[1.5]" />
          </button>
          <span className="text-xl tracking-[-0.5px] font-semibold">설정</span>
        </header>
      }
    >
      <div className="bg-white px-5 flex-1 divide-y divide-[#F1F2F4]">
        <Link
          to="/profile"
          className="py-3 h-16 text-lg tracking-[-0.45px] text-left flex items-center justify-between"
        >
          <span>내 정보</span>
          <ChevronRight className="stroke-[1.5]" />
        </Link>
        <Link
          to="/change-password"
          className="py-3 h-16 text-lg tracking-[-0.45px] text-left flex items-center justify-between"
        >
          <span>비밀번호 변경</span>
          <ChevronRight className="stroke-[1.5]" />
        </Link>

        <LogoutButton />
      </div>
    </LayoutBottomBar>
  );
};
