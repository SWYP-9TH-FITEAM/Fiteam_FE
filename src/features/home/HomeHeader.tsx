import alarmIcon from '@/assets/icons/alarm.svg';
import logo from '@/assets/images/logo.png';

export const HomeHeader = () => {
  return (
    <header className="flex items-center justify-between py-4">
      <img src={logo} alt="Fiteam" className="h-4" />
      <div className="h-5 w-5">
        <img src={alarmIcon} alt="알림" />
      </div>
    </header>
  );
};
