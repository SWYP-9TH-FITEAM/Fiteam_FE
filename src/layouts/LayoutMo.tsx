import {ReactNode} from 'react';
import arrowLeftIcon from '@/assets/arrowLeft.svg';
import {useNavigate} from 'react-router-dom';

interface LayoutMoProps {
  hasHeader?: boolean;
  children: ReactNode;
  bgColor?: string;
  text?: string;
  rightChildren?: ReactNode;
}

const LayoutMo = ({
  hasHeader = false,
  children,
  bgColor = '#fafafa',
  text,
  rightChildren,
}: LayoutMoProps) => {
  const navigate = useNavigate();

  const navigateToBack = () => {
    navigate(-1);
  };

  return (
    <div
      className="flex flex-col h-full min-h-[812px]"
      style={{backgroundColor: bgColor}}
    >
      {hasHeader && (
        <div className="flex justify-between h-12 items-center shrink-0 px-3 bg-white">
          {/* 왼쪽 */}
          <div className="flex gap-2.5">
            <button
              className="w-6 h-6 flex justify-center items-center cursor-pointer"
              onClick={navigateToBack}
              aria-label="뒤로가기"
            >
              <img src={arrowLeftIcon} alt="뒤로가기" />
            </button>
            <span>{text}</span>
          </div>

          {/* 가운데 */}
          <div className=" bg-pink-200"></div>
          {/* 오른쪽 */}
          <div>{rightChildren && rightChildren}</div>
        </div>
      )}
      <div className="flex-1 mx-5">{children}</div>
    </div>
  );
};

export default LayoutMo;
