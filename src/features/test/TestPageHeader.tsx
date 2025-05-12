import arrowLeftIcon from '@/assets/arrowLeft.svg';
import homeDarkIcon from '@/assets/icons/home-dark.svg';
import {useNavigate} from 'react-router-dom';
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
    <header className="flex justify-between items-center pl-3 pr-5 py-2.5 h-12">
      <div className="flex gap-2.5">
        <button
          className="w-6 h-6 flex justify-center items-center cursor-pointer"
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
