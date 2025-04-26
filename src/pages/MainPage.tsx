import {Button} from '@/components/ui/button';
import {useNavigate} from 'react-router-dom';

const MainPage = () => {
  const navigate = useNavigate();

  // 임의 배경구분 색 bg-amber-1000
  return (
    <div className="flex flex-col justify-between px-[60px] py-[30px] bg-amber-100 h-[812px] min-h-[812px]">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Fiteam</h1>
        <p className="text-base text-gray-600">나만의 팀을 만드는 특별함</p>
      </div>
      <div className="w-full h-[370px] bg-gray-200 " />
      <Button
        onClick={() => navigate('/onboarding')}
        className="w-full flex  h-[54px] justify-center items-center gap-2.5 shrink-0 px-[132px] py-[13px] rounded-[10px] bg-[#E9E9E9] text-black text-xl font-medium hover:bg-[#c9c9c9]"
      >
        시작하기
      </Button>
    </div>
  );
};

export default MainPage;
