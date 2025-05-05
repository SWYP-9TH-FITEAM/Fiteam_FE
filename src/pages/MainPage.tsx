import {Button} from '@/components/ui/button';
import {useNavigate} from 'react-router-dom';
import logo from '@/assets/images/logo.png';
import backgroundImage from '@/assets/images/background.png';

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col justify-between px-[60px] py-[40px] min-h-screen"
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
        <p className="text-[#585858] text-center text-base font-semibold leading-7">
          나만의 팀을 만드는 특별함
        </p>
      </div>
      <div className="w-full h-[370px] bg-gray-200 " />
      <Button
        onClick={() => navigate('/onboarding')}
        className="w-full flex  h-[54px] justify-center items-center gap-2.5 shrink-0 px-[132px] py-[13px] rounded-[10px] bg-primary text-white text-xl font-medium"
      >
        시작하기
      </Button>
    </div>
  );
};

export default MainPage;
