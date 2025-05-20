import {useQuery} from '@tanstack/react-query';
import {Link, useLocation} from 'react-router-dom';

import alarmIcon from '@/assets/icons/alarm.svg';
import {managerQueries} from '@/entities/manager/api';
import {useUserInfo} from '@/shared/model/user';
import {Header} from '@/shared/ui/desktop/Header';

interface ManagerHeaderProps {
  isLoginPage?: boolean;
}

const ManagerHeader = ({isLoginPage = false}: ManagerHeaderProps) => {
  const userInfo = useUserInfo();
  const location = useLocation();

  const status = isLoginPage
    ? 'LOGIN_PAGE'
    : userInfo?.type === 'manager'
      ? 'AFTER_LOGIN'
      : 'BEFORE_LOGIN';

  const {data: managerName} = useQuery({
    ...managerQueries.name(),
    enabled: userInfo?.type === 'manager',
  });

  return (
    <Header>
      {status === 'AFTER_LOGIN' && (
        <>
          <div className="ml-[76px] flex flex-1 items-center gap-12 text-xl font-medium">
            <Link
              to="/manager/team-building"
              className={
                location.pathname.startsWith('/manager/team-building')
                  ? 'text-violet-600'
                  : ''
              }
            >
              팀빌딩
            </Link>
            <Link
              to="/manager/chat"
              className={
                location.pathname.startsWith('/manager/chat')
                  ? 'text-violet-600'
                  : ''
              }
            >
              1:1 채팅
            </Link>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Link
              className="border-gray-3 flex h-[52px] w-[206px] items-center justify-center gap-[10px] rounded-[30px] border border-solid text-base leading-6 font-medium tracking-[-0.4px]"
              to="/manager/mypage"
            >
              <span className="inline-block h-[28px] w-[28px] rounded-full bg-gray-200" />
              {managerName?.managerName}님, 안녕하세요!
            </Link>
            <button className="ml-2">
              <img src={alarmIcon} alt="알림" />
            </button>
          </div>
        </>
      )}

      {status === 'BEFORE_LOGIN' && (
        <>
          <div className="ml-[76px] flex flex-1 items-center gap-12 text-xl font-medium">
            <Link to="/test/start">성향테스트</Link>
            <Link to="/profile">나의 프로필</Link>
            <Link to="/team-building">팀빌딩</Link>
            <Link to="/chat">1:1 채팅</Link>
          </div>
          <div className="ml-auto flex items-center gap-4 text-[15px] text-gray-500">
            <Link to="/manager/login">로그인</Link>
            <span>|</span>
            <Link to="/manager/sign-up">회원가입</Link>
          </div>
        </>
      )}

      {status === 'LOGIN_PAGE' && (
        <div className="ml-auto flex items-center">
          <Link
            to="/"
            className="border-gray-3 h-12 w-[154px] rounded-[30px] border border-solid text-base leading-6 font-medium tracking-[-0.4px]"
          >
            Fiteam 홈 바로가기
          </Link>
        </div>
      )}
    </Header>
  );
};

export default ManagerHeader;
