import {HomeHeader} from '@/features/home/HomeHeader';
import HomeProfile from '@/features/home/HomeProfile';
import HomeProjectList from '@/features/home/HomeProjectList';
import {HomeResultCard} from '@/features/home/HomeResultCard';
import {LayoutBottomBar} from '@/layouts/LayoutBottomBar';

const HomePage = () => {
  const isLogin = true; //TODO: 로그인 . props를 넘길지, 전역관리할지

  return (
    <LayoutBottomBar classNames={{wrapper: 'bg-[#f1f2f4]'}}>
      <HomeHeader isLogin={isLogin} />
      <div className="flex flex-col gap-4 pb-4">
        <HomeResultCard isLogin={isLogin} />
        <HomeProfile isLogin={isLogin} />
        <HomeProjectList isLogin={isLogin} />
      </div>
    </LayoutBottomBar>
  );
};

export default HomePage;
