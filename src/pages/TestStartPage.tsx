import {useNavigate} from 'react-router-dom';

import arrowLeftIcon from '@/assets/arrowLeft.svg';
import backgroundImage from '@/assets/images/background.png';
import {Button} from '@/components/ui/button';
import {useToken} from '@/shared/model/auth';

const TestStartPage = () => {
  const token = useToken();
  const navigate = useNavigate();

  const routeToTest = () => {
    navigate('/test');
  };
  const routeToLogin = () => {
    navigate('/login');
  };
  const navigateToBack = () => {
    navigate('/');
  };

  return (
    <div
      className="relative flex min-h-screen flex-col justify-between px-5 py-[40px]"
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
      <button
        className="absolute top-3 left-3 flex h-6 w-6 cursor-pointer items-center justify-center"
        onClick={navigateToBack}
        aria-label="뒤로가기"
      >
        <img src={arrowLeftIcon} alt="뒤로가기" />
      </button>
      <p className="text-gray-6 mt-[18px] font-[paperlogy] text-3xl font-semibold whitespace-pre-line">
        나만의 팀을 찾기 위한
      </p>
      <p className="text-primary font-[paperlogy] text-[40px] leading-[48px] font-extrabold">
        성향테스트
      </p>

      <div className="flex flex-1 flex-col items-center justify-center px-[75px]">
        <div className="relative w-full">
          <div className="flex h-[300px] w-full flex-shrink-0 items-center justify-center bg-gray-200 text-2xl font-bold">
            ?
          </div>
        </div>
      </div>
      <Button
        className="bg-primary mb-2 flex h-[54px] w-full shrink-0 items-center justify-center gap-2.5 rounded-[10px] px-[132px] py-[13px] text-xl font-medium text-white"
        onClick={routeToTest}
      >
        테스트하기
      </Button>
      {!token && (
        <Button
          className="flex h-[54px] w-full shrink-0 items-center justify-center gap-2.5 rounded-[10px] bg-[#E9E9E9] px-[132px] py-[13px] text-xl font-medium text-black"
          onClick={routeToLogin}
        >
          로그인하기
        </Button>
      )}
    </div>
  );
};

export default TestStartPage;
