import {HomeHeader} from '@/features/home/HomeHeader';
import HomeProfile from '@/features/home/HomeProfile';
import HomeProjectList from '@/features/home/HomeProjectList';
import {HomeResultCard} from '@/features/home/HomeResultCard';
import {LayoutBottomBar} from '@/layouts/LayoutBottomBar';

const HomePage = () => {
  const isLogin = true; //TODO: 로그인 . props를 넘길지, 전역관리할지
  if (!isLogin) {
    return;
  }
  return (
    <LayoutBottomBar bgColor="#F1F2F4">
      <HomeHeader />
      <div className="flex flex-col gap-4 pb-4">
        <HomeResultCard />
        <HomeProfile />
        <HomeProjectList />
      </div>
    </LayoutBottomBar>
  );
};

export default HomePage;
