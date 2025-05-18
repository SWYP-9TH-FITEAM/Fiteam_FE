import logo from '@/assets/images/logo.png';
import {useUserInfo} from '@/shared/model/user';
import {Link, useNavigate} from 'react-router-dom';
import alarmIcon from '@/assets/icons/alarm.svg';

interface ManagerHeaderProps {
  isLoginPage?: boolean;
}

const ManagerHeader = ({isLoginPage = false}: ManagerHeaderProps) => {
  const userInfo = useUserInfo();
  const navigate = useNavigate();

  const status = isLoginPage
    ? 'LOGIN_PAGE'
    : userInfo?.type === 'manager'
      ? 'AFTER_LOGIN'
      : 'BEFORE_LOGIN';

  const userName = '이름'; // TODO: get /manager/name

  const navigateToHome = () => {
    navigate('/');
  };
  const navigateToManagerHome = () => {
    navigate('/manager');
  };
  const navigateToMypage = () => {
    navigate('/manager/mypage');
  };

  return (
    <header className="fixed top-0 left-0 w-full h-[80px] bg-white z-50 shadow flex items-center justify-center">
      <div className="w-full max-w-[1400px] px-8 mx-auto flex items-center justify-between">
        <img
          src={logo}
          onClick={navigateToManagerHome}
          alt="logo"
          className="w-[135px]"
        />

        {status === 'AFTER_LOGIN' && (
          <>
            <div className="flex-1 flex items-center ml-[76px] gap-12 font-medium text-xl]">
              <Link to="/manager/team-building">팀빌딩</Link>
              <Link to="/manager/chat">1:1 채팅</Link>
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <button
                className="w-[206px] h-[52px] flex items-center justify-center gap-[10px] border text-base font-medium leading-6 rounded-[30px] border-solid border-gray-3 tracking-[-0.4px]"
                onClick={navigateToMypage}
              >
                <span className="w-[28px] h-[28px] rounded-full bg-gray-200 inline-block" />
                {userName}님, 안녕하세요!
              </button>
              <button className="ml-2">
                <img src={alarmIcon} alt="알림" />
              </button>
            </div>
          </>
        )}

        {status === 'BEFORE_LOGIN' && (
          <>
            <div className="flex-1 flex items-center ml-[76px] gap-12 font-medium text-xl]">
              <Link to="/test/start">성향테스트</Link>
              <Link to="/profile">나의 프로필</Link>
              <Link to="/team-building">팀빌딩</Link>
              <Link to="/chat">1:1 채팅</Link>
            </div>
            <div className="flex items-center gap-4 ml-auto text-gray-500 text-[15px]">
              <Link to="/manager/login">로그인</Link>
              <span>|</span>
              <Link to="/manager/sign-up">회원가입</Link>
            </div>
          </>
        )}

        {status === 'LOGIN_PAGE' && (
          <div className="flex items-center ml-auto">
            <button
              onClick={navigateToHome}
              className="w-[154px] h-12 border text-base font-medium leading-6 rounded-[30px] border-solid border-gray-3 tracking-[-0.4px]"
            >
              Fiteam 홈 바로가기
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default ManagerHeader;
