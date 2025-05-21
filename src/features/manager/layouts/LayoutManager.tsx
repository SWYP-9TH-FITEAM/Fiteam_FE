import type {ReactNode} from 'react';

import {getManagerName} from '@/entities/manager/api/get-manager';
import {useToken} from '@/shared/model/auth';
import {useManagerInfo, useSetManagerInfo} from '@/shared/model/manager';
import {Footer} from '@/shared/ui/desktop/Footer';
import {Main} from '@/shared/ui/desktop/Main';
import ManagerHeader from './ManagerHeader';

const LayoutManager = ({children}: {children: ReactNode}) => {
  const token = useToken();
  const managerInfo = useManagerInfo();
  const setManagerInfo = useSetManagerInfo();

  if (token && !managerInfo) {
    getManagerName().then(res => {
      setManagerInfo(res);
    });
  }
  return (
    // 가로 1400고정
    <div className="flex min-h-[100dvh] w-full min-w-[1400px] flex-col bg-[#fafafa]">
      <ManagerHeader />
      {/* 본문 */}
      <Main>{children}</Main>
      <Footer />
    </div>
  );
};

export default LayoutManager;
