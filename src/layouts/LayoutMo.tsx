import type {ReactNode} from 'react';

import {useNavigate} from 'react-router-dom';

import arrowLeftIcon from '@/assets/arrowLeft.svg';

interface LayoutMoProps {
  hasHeader?: boolean;
  children: ReactNode;
  bgColor?: string;
  text?: string;
  rightChildren?: ReactNode;
  onClickBack?: () => void;
}

const LayoutMo = ({
  hasHeader = false,
  children,
  bgColor = '#fafafa',
  text,
  rightChildren,
  onClickBack,
}: LayoutMoProps) => {
  const navigate = useNavigate();

  const navigateToBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex h-full flex-col" style={{backgroundColor: bgColor}}>
      {hasHeader && (
        <div className="flex h-12 shrink-0 items-center justify-between bg-white px-3">
          {/* 왼쪽 */}
          <div className="flex gap-2.5">
            <button
              className="flex h-6 w-6 cursor-pointer items-center justify-center"
              onClick={onClickBack || navigateToBack}
              aria-label="뒤로가기"
            >
              <img src={arrowLeftIcon} alt="뒤로가기" />
            </button>
            <span>{text}</span>
          </div>

          {/* 가운데 */}
          <div className="bg-pink-200"></div>
          {/* 오른쪽 */}
          <div>{rightChildren && rightChildren}</div>
        </div>
      )}
      <div className="mx-5 flex-1">{children}</div>
    </div>
  );
};

export default LayoutMo;
