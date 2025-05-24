import {useSearchParams} from 'react-router-dom';

import LayoutManager from '@/features/manager/layouts/LayoutManager';
import MyPageEvent from '@/features/manager/mypage/events/MyPageEvent';
import MyPageLeftSection from '@/features/manager/mypage/MyPageLeftSection';
import MyPageMain from '@/features/manager/mypage/MyPageMain';
import MyPageNotice from '@/features/manager/mypage/notice/MypageNotice';
import MyPageSettings from '@/features/manager/mypage/settings/MyPageSettings';

export type MenuType = 'notice' | 'settings' | 'events';

const ManagerMyPage = () => {
  const [searchParams] = useSearchParams();
  const menu = searchParams.get('menu') as MenuType | null;

  return (
    <LayoutManager>
      <div className="mt-12 grid grid-cols-[276px_1080px] gap-[43px]">
        <MyPageLeftSection />
        <div>
          {!menu && (
            <h2 className="mb-[30px] text-left text-[32px] leading-9 font-semibold">
              마이페이지
            </h2>
          )}
          {!menu ? (
            <MyPageMain />
          ) : (
            <>
              {menu === 'notice' && <MyPageNotice />}
              {menu === 'settings' && <MyPageSettings />}
              {menu === 'events' && <MyPageEvent />}
            </>
          )}
        </div>
      </div>
    </LayoutManager>
  );
};

export default ManagerMyPage;
