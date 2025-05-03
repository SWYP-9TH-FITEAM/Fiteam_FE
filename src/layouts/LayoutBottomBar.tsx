import homeSelectedIcon from '@/assets/bottomIcon/home-selected.svg';
import homeIcon from '@/assets/bottomIcon/home.svg';
import myPageSelectedIcon from '@/assets/bottomIcon/mypage-selected.svg';
import myPageIcon from '@/assets/bottomIcon/myPage.svg';
import profileSelectedIcon from '@/assets/bottomIcon/profile-selected.svg';
import profileIcon from '@/assets/bottomIcon/profile.svg';
import teamBuildingSelectedIcon from '@/assets/bottomIcon/teambuilding-selected.svg';
import teamBuildingIcon from '@/assets/bottomIcon/teambuilding.svg';
import {ReactNode} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

// 일단 채팅 아이콘이 없어 임시로 teambuilding 아이콘을 사용
const chatSelectedIcon = teamBuildingSelectedIcon;
const chatIcon = teamBuildingIcon;

type LayoutBottomBarProps = {
  children: ReactNode;
  header?: ReactNode;
  bgColor?: string;
};

const BottomBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const menuItems = [
    {
      path: '/home',
      icon: homeIcon,
      selectedIcon: homeSelectedIcon,
      label: '홈',
    },
    {
      path: '/profile',
      icon: profileIcon,
      selectedIcon: profileSelectedIcon,
      label: '나의 프로필',
    },
    {
      path: '/teambuilding',
      icon: teamBuildingIcon,
      selectedIcon: teamBuildingSelectedIcon,
      label: '팀빌딩',
    },
    {
      path: '/chat',
      icon: chatIcon,
      selectedIcon: chatSelectedIcon,
      label: '1:1 채팅',
    },
    {
      path: '/mypage',
      icon: myPageIcon,
      selectedIcon: myPageSelectedIcon,
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
  bgColor = '#fafafa',
}: LayoutBottomBarProps) => {
  return (
    <div
      className="flex flex-col items-center h-screen"
      style={{backgroundColor: bgColor}}
    >
      <div className="relative w-full max-w-[500px] h-full flex flex-col">
        {header}

        {/* 스크롤 가능한 영역 */}
        <div className="flex-1 overflow-y-auto px-5">{children}</div>

        <BottomBar />
      </div>
    </div>
  );
};
