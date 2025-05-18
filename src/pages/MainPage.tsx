import {useNavigate} from 'react-router-dom';

import backgroundImage from '@/assets/images/background.png';
import logo from '@/assets/images/logo.png';
import {Button} from '@/components/ui/button';

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="flex min-h-screen flex-col justify-between px-[60px] py-[40px]"
      style={{
        background: `linear-gradient(
          0deg,
          rgba(255, 255, 255, 0.3) 0%,
          rgba(255, 255, 255, 0.3) 100%
        ),
        linear-gradient(187deg, #fff 0.79%, rgba(255, 255, 255, 0) 69.96%),
        url(${backgroundImage}) lightgray 50% / cover no-repeat`,
      }}
    >
      <div className="flex flex-col items-center gap-1.5">
        <img src={logo} alt="Fiteam" className="w-[126px]" />
        <p className="text-center text-base leading-7 font-semibold text-[#585858]">
          나만의 팀을 만드는 특별함
        </p>
      </div>
      <div className="h-[370px] w-full bg-gray-200" />
      <Button
        onClick={() => navigate('/onboarding')}
        className="bg-primary flex h-[54px] w-full shrink-0 items-center justify-center gap-2.5 rounded-[10px] px-[132px] py-[13px] text-xl font-medium text-white"
      >
        시작하기
      </Button>
    </div>
  );
};

export default MainPage;
