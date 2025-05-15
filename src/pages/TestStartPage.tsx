import {Button} from '@/components/ui/button';
import {useNavigate} from 'react-router-dom';
import backgroundImage from '@/assets/images/background.png';
import arrowLeftIcon from '@/assets/arrowLeft.svg';
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
    navigate(-1);
  };

  return (
    <div
      className="relative flex flex-col justify-between px-5 py-[40px] min-h-screen"
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
        className="absolute top-3 left-3 w-6 h-6 flex justify-center items-center cursor-pointer"
        onClick={navigateToBack}
        aria-label="뒤로가기"
      >
        <img src={arrowLeftIcon} alt="뒤로가기" />
      </button>
      <p className="text-gray-6 text-3xl font-semibold whitespace-pre-line font-[paperlogy] mt-[18px]">
        나만의 팀을 찾기 위한
      </p>
      <p className="font-[paperlogy] text-[40px] font-extrabold leading-[48px] text-primary">
        성향테스트
      </p>

      <div className="flex-1 flex flex-col items-center justify-center px-[75px]">
        <div className="relative w-full ">
          <div className="w-full h-[300px] flex-shrink-0 bg-gray-200 flex items-center justify-center text-2xl font-bold">
            ?
          </div>
        </div>
      </div>
      <Button
        className="w-full flex h-[54px] mb-2 justify-center items-center gap-2.5 shrink-0 px-[132px] py-[13px] rounded-[10px] bg-primary text-white text-xl font-medium "
        onClick={routeToTest}
      >
        테스트하기
      </Button>
      {!token && (
        <Button
          className="w-full flex h-[54px]  justify-center items-center gap-2.5 shrink-0 px-[132px] py-[13px] rounded-[10px] bg-[#E9E9E9] text-black text-xl font-medium "
          onClick={routeToLogin}
        >
          로그인하기
        </Button>
      )}
    </div>
  );
};

export default TestStartPage;
