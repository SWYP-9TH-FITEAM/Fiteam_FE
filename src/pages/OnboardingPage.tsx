import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

import arrowLeftIcon from '@/assets/arrowLeft.svg';
import arrowRightIcon from '@/assets/arrowRight.svg';
import onboarding1 from '@/assets/images/onboarding/onboarding1.png';
import onboarding2 from '@/assets/images/onboarding/onboarding2.png';
import onboarding3 from '@/assets/images/onboarding/onboarding3.png';
import onboarding4 from '@/assets/images/onboarding/onboarding4.png';
import {Button} from '@/components/ui/button';
import LayoutMo from '@/layouts/LayoutMo';
import {cn} from '@/lib/utils';

const OnboardingPage = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [onboarding1, onboarding2, onboarding3, onboarding4];
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
    navigate('/test/start');
  };

  return (
    <LayoutMo>
      <div className="flex h-full min-h-[764px] flex-col justify-between py-[60px] text-black">
        <p className="h-[64px] text-2xl font-semibold whitespace-pre-line">
          {texts[currentIndex]}
        </p>
        <div className="flex flex-1 flex-col items-center justify-center px-[75px]">
          <div className="relative w-full">
            {/* 이전/다음 버튼 */}
            <button
              onClick={goToPrevious}
              className="absolute top-1/2 -left-16 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-50"
              aria-label="이전으로"
            >
              <img src={arrowLeftIcon} alt="이전으로" />
            </button>
            <button
              onClick={goToNext}
              className="absolute top-1/2 -right-16 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-50"
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
                {slides.map((slide, index) => (
                  <div
                    key={index}
                    className="flex h-[300px] w-full flex-shrink-0 items-center justify-center"
                  >
                    <img
                      src={slide}
                      alt={`온보딩 ${index + 1}`}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 하단 인디케이터 */}
          <div className="mt-16 flex justify-center gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  'h-2 w-2 rounded-full transition-all',
                  currentIndex === index
                    ? 'bg-primary w-6'
                    : 'bg-primary-light',
                )}
              />
            ))}
          </div>
        </div>
        <Button
          className="bg-primary flex h-[54px] w-full shrink-0 items-center justify-center gap-2.5 rounded-[10px] px-[132px] py-[13px] text-xl font-medium text-white"
          onClick={routeToTest}
        >
          시작하기
        </Button>
      </div>
    </LayoutMo>
  );
};

export default OnboardingPage;
