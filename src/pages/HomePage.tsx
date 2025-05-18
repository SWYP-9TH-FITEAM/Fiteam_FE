import {useQuery} from '@tanstack/react-query';

import {userQueries} from '@/entities/user/api';
import {HomeHeader} from '@/features/home/HomeHeader';
import HomeProjectInProgress from '@/features/home/HomeProjectInProgress';
import HomeProjectPending from '@/features/home/HomeProjectPending';
import {HomeResultCard} from '@/features/home/HomeResultCard';
import {LayoutBottomBar} from '@/layouts/LayoutBottomBar';

const HomePage = () => {
  const {data: userMiniResultData} = useQuery(userQueries.miniResult());

  // TOODO:: 각 바 누르면 해당 팀빌딩 화면
  return (
    <LayoutBottomBar classNames={{wrapper: 'bg-gray-1'}}>
      <HomeHeader />
      <div className="flex flex-col gap-4 pb-4">
        {userMiniResultData && <HomeResultCard data={userMiniResultData} />}
        <HomeProjectInProgress />
        <HomeProjectPending />
      </div>
    </LayoutBottomBar>
  );
};

export default HomePage;
