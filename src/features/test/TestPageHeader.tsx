import {useNavigate} from 'react-router-dom';

import arrowLeftIcon from '@/assets/arrowLeft.svg';
import homeDarkIcon from '@/assets/icons/home-dark.svg';
import logo from '@/assets/images/logo.png';

interface TestPageHeaderProps {
  onClickBack?: () => void;
}

const TestPageHeader = ({onClickBack}: TestPageHeaderProps) => {
  const navigate = useNavigate();

  const navigateToBack = () => {
    if (onClickBack) {
      onClickBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <header className="flex h-12 items-center justify-between py-2.5 pr-5 pl-3">
      <div className="flex gap-2.5">
        <button
          className="flex h-6 w-6 cursor-pointer items-center justify-center"
          onClick={navigateToBack}
          aria-label="뒤로가기"
        >
          <img src={arrowLeftIcon} alt="뒤로가기" />
        </button>
      </div>

      <div>
        <img src={logo} alt="Fiteam" className="w-[65px]" />
      </div>

      <img src={homeDarkIcon} alt="홈으로" />
    </header>
  );
};

export default TestPageHeader;
