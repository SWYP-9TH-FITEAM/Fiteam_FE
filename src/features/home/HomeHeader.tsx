import alarmIcon from '@/assets/icons/alarm.svg';
import logo from '@/assets/images/logo.png';

export const HomeHeader = () => {
  return (
    <div className="flex justify-between items-center py-4">
      <img src={logo} alt="Fiteam" className="h-4" />
      <div className="w-5 h-5">
        <img src={alarmIcon} alt="알림" />
      </div>
    </div>
  );
};
