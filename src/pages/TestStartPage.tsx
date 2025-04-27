import {Button} from '@/components/ui/button';
import LayoutMo from '@/layouts/LayoutMo';
import {useNavigate} from 'react-router-dom';

const TestStartPage = () => {
  const navigate = useNavigate();

  const routeToTest = () => {
    navigate('/test');
  };
  const routeToLogin = () => {
    navigate('/login');
  };

  return (
    <LayoutMo hasHeader={true}>
      <div className="flex flex-col justify-between h-full ">
        <div className="text-center mt-5 pb-0 px-[84px]  h-16">
          <p className="text-2xl font-semibold whitespace-pre-line">
            {`나만의 팀을 찾기 위한\n 성향테스트`}
          </p>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center px-[75px]">
          <div className="relative w-full ">
            <div className="w-full h-[300px] flex-shrink-0 bg-gray-200 flex items-center justify-center text-2xl font-bold">
              ?
            </div>
          </div>
        </div>
        <Button
          className="w-full flex h-[54px] mb-2 justify-center items-center gap-2.5 shrink-0 px-[132px] py-[13px] rounded-[10px] bg-[#E9E9E9] text-black text-xl font-medium hover:bg-[#c9c9c9]"
          onClick={routeToTest}
        >
          테스트하기
        </Button>
        <Button
          className="w-full flex h-[54px] mb-[114px] justify-center items-center gap-2.5 shrink-0 px-[132px] py-[13px] rounded-[10px] bg-[#E9E9E9] text-black text-xl font-medium hover:bg-[#c9c9c9]"
          onClick={routeToLogin}
        >
          로그인하기
        </Button>
      </div>
    </LayoutMo>
  );
};

export default TestStartPage;
