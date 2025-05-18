import * as React from 'react';
import {ChevronLeft, ChevronRight} from 'lucide-react';
import {Link, useNavigate} from 'react-router-dom';

import {LayoutBottomBar} from '@/layouts/LayoutBottomBar';
import {LogoutButton} from './LogoutButton';

export const Settings: React.FC = () => {
  const navigate = useNavigate();

  return (
    <LayoutBottomBar
      classNames={{wrapper: 'bg-white', scrollableArea: 'px-0'}}
      hideBottomBar
      header={
        <header className="flex gap-2.5 px-3 py-2.5">
          <button onClick={() => navigate(-1)}>
            <ChevronLeft className="h-6 w-6 stroke-[1.5]" />
          </button>
          <span className="text-xl font-semibold tracking-[-0.5px]">설정</span>
        </header>
      }
    >
      <div className="flex-1 divide-y divide-[#F1F2F4] bg-white px-5">
        <Link
          to="/profile"
          className="flex h-16 items-center justify-between py-3 text-left text-lg tracking-[-0.45px]"
        >
          <span>내 정보</span>
          <ChevronRight className="stroke-[1.5]" />
        </Link>
        <Link
          to="/change-password"
          className="flex h-16 items-center justify-between py-3 text-left text-lg tracking-[-0.45px]"
        >
          <span>비밀번호 변경</span>
          <ChevronRight className="stroke-[1.5]" />
        </Link>

        <LogoutButton />
      </div>
    </LayoutBottomBar>
  );
};
