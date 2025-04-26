import {ReactNode} from 'react';

interface LayoutMoProps {
  hasHeader: boolean;
  children: ReactNode;
}

const LayoutMo = ({hasHeader, children}: LayoutMoProps) => {
  return (
    <div className="flex flex-col h-[812px] bg-neutral-50">
      {hasHeader && (
        <div className="flex justify-between h-12 items-center shrink-0 px-3 bg-white">
          {/* 왼쪽 */}
          <button
            className="w-6 h-6 flex justify-center items-center cursor-pointer"
            aria-label="뒤로가기"
          >
            <img src="src/assets/arrowLeft.svg" alt="뒤로가기" />
          </button>
          {/* 가운데 */}
          <div className=" bg-pink-200"></div>
          {/* 오른쪽 */}
          <div className=" bg-pink-200"></div>
        </div>
      )}
      <div className="flex-1 px-5">{children}</div>
    </div>
  );
};

export default LayoutMo;
