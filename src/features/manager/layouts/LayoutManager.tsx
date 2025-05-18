import {ReactNode} from 'react';
import ManagerHeader from './ManagerHeader';

const LayoutManager = ({children}: {children: ReactNode}) => {
  return (
    <div className="min-h-[100dvh] bg-[#fafafa] w-full flex flex-col min-w-[1400px]">
      <ManagerHeader />
      {/* 본문 */}
      <main className="pt-[80px] flex-1 flex justify-center">
        <div className="w-[1400px] bg-sky-50">{children}</div>
      </main>
      <footer className="h-[78px] bg-gray-1 w-full flex items-center justify-center text-gray-5 ">
        매니저 푸터
      </footer>
    </div>
  );
};

export default LayoutManager;
