import arrowLeft from '@/assets/arrowLeft.svg';
import arrowRight from '@/assets/arrowRight.svg';
import logoWhite from '@/assets/images/logo-white.png';
import logo from '@/assets/images/logo.png';
import {useManagerInfo} from '@/shared/model/manager';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

const SLIDES_TEXTS = [
  '성향테스트를 하고 나만의 팀을 찾아요!',
  '나의 성향카드를 공유하고 친구들에게 보낼 수 있어요 !',
  '성향카드를 토대로 나만의 프로필 카드를 만들 수 있어요',
  '프로필 카드로 팀원을 구해봐요',
];

const TopBanner = () => {
  const managerInfo = useManagerInfo();
  const navigate = useNavigate();
  const [slideIdx, setSlideIdx] = useState(0);
  const slideCount = SLIDES_TEXTS.length;

  const handlePrev = () => {
    setSlideIdx(prev => (prev === 0 ? slideCount - 1 : prev - 1));
  };
  const handleNext = () => {
    setSlideIdx(prev => (prev === slideCount - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full flex justify-center items-center py-6">
      <div className="w-full h-[382px] pt-[35px] pb-10 px-7 bg-[linear-gradient(273deg,#9182FF_-2.43%,#5F4AFF_57.69%,#4432CE_116.67%)] rounded-[20px] flex items-center relative">
        <div className="relative flex-1">
          <button
            className="absolute left-6 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/20 rounded-full hover:bg-white/30 transition"
            onClick={handlePrev}
            aria-label="이전 슬라이드"
          >
            <img src={arrowLeft} alt="이전" className="w-6 h-6" />
          </button>
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="text-white text-[48px] font-extrabold mb-2 tracking-tight drop-shadow">
              <img src={logoWhite} alt="Fiteam" className="w-[213px]" />
            </div>
            <div className="text-gray-3 text-center text-[28px] font-semibold leading-9 tracking-[-0.7px] mt-4">
              {SLIDES_TEXTS[slideIdx]}
            </div>
          </div>
          <div className="gap-2 flex justify-center absolute -translate-x-2/4 left-2/4 -bottom-20">
            {SLIDES_TEXTS.map((_, idx) => (
              <span
                key={idx}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${slideIdx === idx ? 'bg-white' : 'bg-white/40'}`}
              />
            ))}
          </div>

          <button
            className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/20 rounded-full hover:bg-white/30 transition"
            onClick={handleNext}
            aria-label="다음 슬라이드"
          >
            <img src={arrowRight} alt="다음" className="w-6 h-6" />
          </button>
        </div>

        <div className="w-[350px] h-[326px] bg-[radial-gradient(113.8%_113.8%_at_50%_50%,rgba(255,255,255,0.80)_23.56%,rgba(255,255,255,0.40)_100%)] rounded-[10px] px-5 py-[30px] flex flex-col justify-between shadow-lg">
          {managerInfo ? (
            <>
              <div className="text-left">
                <div className="text-[34px] font-bold leading-[38px] tracking-[-0.85px]">
                  {managerInfo?.managerName}
                  <span className="text-gray-5 ml-2 text-xl font-medium leading-7">
                    Manager
                  </span>
                </div>
                <div className="border-b border-gray-300 mt-7" />
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <div className="text-center text-[28px] font-semibold leading-9 tracking-[-0.7px]">
                  안녕하세요,{' '}
                  <b className="text-[#5F4AFF] font-bold inline">매니저님 </b>!
                  <br />
                  오늘도 힘차게 해볼까요?
                </div>
              </div>{' '}
            </>
          ) : (
            <>
              <div className="w-full text-left mb-2">
                <span className="text-[26px] font-bold leading-tight text-[#222]">
                  안녕하세요,
                </span>
              </div>
              <div className="flex items-center mb-2">
                <img src={logo} alt="Fiteam" className="h-10 mr-2" />
                <span className="text-[26px] font-bold leading-tight text-[#222]">
                  에 오신걸
                </span>
              </div>
              <div className="w-full text-left mb-6">
                <span className="text-[26px] font-bold leading-tight text-[#222] float-right">
                  환영합니다 !
                </span>
              </div>
              <button
                className="w-full h-12 bg-[#6C63FF] text-white text-xl font-medium leading-7 rounded-md transition hover:bg-[#5F4AFF]"
                onClick={() => navigate('/manager/login')}
              >
                로그인
              </button>
              <button
                className="w-full h-12 bg-white text-[#222] text-xl font-medium leading-7 rounded-md border border-[#E0E0E0] transition hover:bg-[#F5F5FF]"
                onClick={() => navigate('/manager/sign-up')}
              >
                회원가입
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopBanner;
