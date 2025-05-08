import {ReactNode} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

import * as icons from '@/assets/bottomIcon';
import {cn} from '@/lib/utils';

type LayoutBottomBarProps = {
  children: ReactNode;
  header?: ReactNode;
  classNames?: {
    wrapper?: string;
    scrollableArea?: string;
  };
};

const BottomBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const menuItems = [
    {
      path: '/home',
      icon: icons.home,
      selectedIcon: icons.homeSelected,
      label: '홈',
    },
    {
      path: '/profile',
      icon: icons.profile,
      selectedIcon: icons.profileSelected,
      label: '나의 프로필',
    },
    {
      path: '/team-building',
      icon: icons.teamBuilding,
      selectedIcon: icons.teamBuildingSelected,
      label: '팀빌딩',
    },
    {
      path: '/chat',
      icon: icons.chat,
      selectedIcon: icons.chatSelected,
      label: '1:1 채팅',
    },
    {
      path: '/mypage',
      icon: icons.myPage,
      selectedIcon: icons.myPageSelected,
      label: '마이페이지',
    },
  ];

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <nav className="sticky bottom-0 z-10 bg-white shadow-[0px_-1px_4px_0px_rgba(89,89,89,0.25)] px-4 py-2">
      <div className="flex justify-around">
        {menuItems.map(menuItem => (
          <button
            key={menuItem.path}
            className="flex flex-col items-center text-sm"
            onClick={() => handleNavigate(menuItem.path)}
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <img
                src={
                  currentPath === menuItem.path
                    ? menuItem.selectedIcon
                    : menuItem.icon
                }
                alt={menuItem.label}
                className="w-6 h-6"
                style={{objectFit: 'contain'}}
              />
            </div>
            {menuItem.label}
          </button>
        ))}
      </div>
    </nav>
  );
};

export const LayoutBottomBar = ({
  children,
  header,
  classNames,
}: LayoutBottomBarProps) => {
  return (
    <div
      className={cn(
        'flex flex-col h-[100dvh] bg-[#fafafa] relative w-full max-w-[500px]',
        classNames?.wrapper,
      )}
    >
      {header}

      {/* 스크롤 가능한 영역 */}
      <div
        className={cn(
          'flex-1 overflow-y-auto px-5',
          classNames?.scrollableArea,
        )}
      >
        {children}
      </div>

      <BottomBar />
    </div>
  );
};
