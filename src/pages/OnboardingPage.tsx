import arrowLeftIcon from '@/assets/arrowLeft.svg';
import arrowRightIcon from '@/assets/arrowRight.svg';

import {Button} from '@/components/ui/button';
import LayoutMo from '@/layouts/LayoutMo';
import {useState} from 'react';
import {cn} from '@/lib/utils';
import {useNavigate} from 'react-router-dom';

const OnboardingPage = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = Array.from({length: 4});
  const texts = [
    '테스트를 하고\n나의 성향을 파악해보세요 !',
    '나의 성향카드를 공유하고\n친구들에게 보낼 수 있어요 !',
    '성향카드를 토대로 나만의\n 프로필 카드를 만들 수 있어요',
    '프로필 카드로 팀원을 구해봐요',
  ];

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  const routeToTest = () => {
    navigate('/test');
  };

  return (
    <LayoutMo hasHeader={true}>
      <div className="flex flex-col justify-between h-full ">
        <div className="text-center mt-5 pb-0 px-[84px]  h-16">
          <p className="text-2xl font-semibold whitespace-pre-line">
            {texts[currentIndex]}
          </p>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center px-[75px]">
          <div className="relative w-full ">
            {/* 이전/다음 버튼 */}
            <button
              onClick={goToPrevious}
              className="absolute -left-16 top-1/2 -translate-y-1/2 w-10 h-10  flex items-center justify-center bg-white rounded-full shadow-md hover:bg-gray-50"
              aria-label="이전으로"
            >
              <img src={arrowLeftIcon} alt="이전으로" />
            </button>
            <button
              onClick={goToNext}
              className="absolute -right-16 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-md hover:bg-gray-50"
              aria-label="다음으로"
            >
              <img src={arrowRightIcon} alt="다음으로" />
            </button>

            {/* 캐러셀 컨테이너 */}
            <div className="w-full overflow-hidden">
              <div
                className="flex transition-transform duration-300 ease-in-out"
                style={{transform: `translateX(-${currentIndex * 100}%)`}}
              >
                {slides.map((_, index) => (
                  <div
                    key={index}
                    className="w-full h-[300px] flex-shrink-0 bg-gray-200 flex items-center justify-center text-2xl font-bold"
                  >
                    {index}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 하단 인디케이터 */}
          <div className="flex justify-center gap-2 mt-16">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  'h-2 w-2 rounded-full transition-all',
                  currentIndex === index ? 'w-6 bg-gray-400' : 'bg-gray-300',
                )}
              />
            ))}
          </div>
        </div>
        <Button
          className="w-full flex h-[54px] mb-[114px] justify-center items-center gap-2.5 shrink-0 px-[132px] py-[13px] rounded-[10px] bg-[#E9E9E9] text-black text-xl font-medium hover:bg-[#c9c9c9]"
          onClick={routeToTest}
        >
          시작하기
        </Button>
      </div>
    </LayoutMo>
  );
};

export default OnboardingPage;
