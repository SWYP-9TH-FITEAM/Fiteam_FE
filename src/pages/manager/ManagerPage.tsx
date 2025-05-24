import InProgressBanner from '@/features/manager/home/InProgressBanner';
import MyprofileBanner from '@/features/manager/home/MyprofileBanner';
import NoticeBoard from '@/features/manager/home/NoticeBoard';
import TeamBuildingBanner from '@/features/manager/home/TeamBuildingBanner';
import TopBanner from '@/features/manager/home/TopBanner';
import LayoutManager from '@/features/manager/layouts/LayoutManager';
import {useManagerInfo} from '@/shared/model/manager';

const ManagerPage = () => {
  const managerInfo = useManagerInfo();

  return (
    <LayoutManager>
      <TopBanner />
      <div className="mb-5 grid h-[330px] grid-cols-[980px_400px] gap-5">
        {managerInfo ? <TeamBuildingBanner /> : <MyprofileBanner />}
        <InProgressBanner isManager={!!managerInfo} />
      </div>
      <NoticeBoard />
    </LayoutManager>
  );
};

export default ManagerPage;
