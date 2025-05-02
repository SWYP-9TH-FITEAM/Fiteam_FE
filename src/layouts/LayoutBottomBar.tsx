import homeSelectedIcon from '@/assets/bottomIcon/home-selected.svg';
import homeIcon from '@/assets/bottomIcon/home.svg';
import myPageSelectedIcon from '@/assets/bottomIcon/myPage-selected.svg';
import myPageIcon from '@/assets/bottomIcon/myPage.svg';
import profileSelectedIcon from '@/assets/bottomIcon/profile-selected.svg';
import profileIcon from '@/assets/bottomIcon/profile.svg';
import teamBuildingSelectedIcon from '@/assets/bottomIcon/teambuilding-selected.svg';
import teamBuildingIcon from '@/assets/bottomIcon/teambuilding.svg';
import {ReactNode} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

type LayoutBottomBarProps = {
  children: ReactNode;
  header?: ReactNode;
  bgColor?: string;
};

const BottomBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const isHome = currentPath === '/home';
  const isProfile = currentPath === '/profile';
  const isTeambuilding = currentPath === '/teambuilding';
  const isChat = currentPath === '/chat';
  const isMyPage = currentPath === '/mypage';

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <nav className="sticky bottom-0 z-10 bg-white shadow-[0px_-1px_4px_0px_rgba(89,89,89,0.25)] px-4 py-2">
      <div className="flex justify-around">
        <button
          className="flex flex-col items-center text-sm"
          onClick={() => handleNavigate('/home')}
        >
          <div className="w-6 h-6 flex items-center justify-center">
            <img
              src={isHome ? homeSelectedIcon : homeIcon}
              alt="홈"
              className="w-6 h-6"
              style={{objectFit: 'contain'}}
            />
          </div>
          홈
        </button>
        <button
          className="flex flex-col items-center text-sm"
          onClick={() => handleNavigate('/profile')}
        >
          <div className="w-6 h-6 flex items-center justify-center">
            <img
              src={isProfile ? profileSelectedIcon : profileIcon}
              alt="나의 프로필"
              className="w-6 h-6"
              style={{objectFit: 'contain'}}
            />
          </div>
          나의 프로필
        </button>
        <button
          className="flex flex-col items-center text-sm"
          onClick={() => handleNavigate('/teambuilding')}
        >
          <div className="w-6 h-6 flex items-center justify-center">
            <img
              src={isTeambuilding ? teamBuildingSelectedIcon : teamBuildingIcon}
              alt="팀빌딩"
              className="w-6 h-6"
              style={{objectFit: 'contain'}}
            />
          </div>
          팀빌딩
        </button>
        <button
          className="flex flex-col items-center text-sm"
          onClick={() => handleNavigate('/chat')}
        >
          <div className="w-6 h-6 flex items-center justify-center">
            {/* 아이콘 변경 */}
            <img
              src={isChat ? teamBuildingSelectedIcon : teamBuildingIcon}
              alt="1:1 채팅"
              className="w-6 h-6"
              style={{objectFit: 'contain'}}
            />
          </div>
          1:1 채팅
        </button>
        <button
          className="flex flex-col items-center text-sm"
          onClick={() => handleNavigate('/mypage')}
        >
          <div className="w-6 h-6 flex items-center justify-center">
            <img
              src={isMyPage ? myPageSelectedIcon : myPageIcon}
              alt="마이페이지"
              className="w-6 h-6"
              style={{objectFit: 'contain'}}
            />
          </div>
          마이페이지
        </button>
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
        <div className="flex-1 overflow-y-auto px-4 py-6">{children}</div>

        <BottomBar />
      </div>
    </div>
  );
};
