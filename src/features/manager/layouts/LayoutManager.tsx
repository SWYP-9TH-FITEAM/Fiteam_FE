import type {ReactNode} from 'react';

import {Footer} from '@/shared/ui/desktop/Footer';
import {Main} from '@/shared/ui/desktop/Main';
import ManagerHeader from './ManagerHeader';

const LayoutManager = ({children}: {children: ReactNode}) => {
  return (
    <>
      <ManagerHeader />
      {/* 본문 */}
      <Main>{children}</Main>
      <Footer />
    </>
  );
};

export default LayoutManager;
