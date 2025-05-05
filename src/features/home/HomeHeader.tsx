import alarmIcon from '@/assets/icons/alarm.svg';
import logo from '@/assets/images/logo.png';

interface HomeHeaderProps {
  isLogin: boolean;
}

export const HomeHeader = ({isLogin = false}: HomeHeaderProps) => {
  return (
    <header className="flex justify-between items-center py-4">
      <img src={logo} alt="Fiteam" className="h-4" />
      {isLogin && (
        <div className="w-5 h-5">
          <img src={alarmIcon} alt="알림" />
        </div>
      )}
    </header>
  );
};
