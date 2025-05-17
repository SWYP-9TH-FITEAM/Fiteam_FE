import {userQueries} from '@/entities/user/api';
import MyProfile from '@/features/profile/MyProfile';
import MyProfileEmpty from '@/features/profile/MyProfileEmpty';
import {LayoutBottomBar} from '@/layouts/LayoutBottomBar';
import {useQuery} from '@tanstack/react-query';

// 헤더 컴포넌트
const ProfileHeader = () => {
  return (
    <header className="sticky top-0 z-10 h-12 px-4 py-3 text-center font-semibold text-lg">
      나의 프로필
    </header>
  );
};

const ProfilePage = () => {
  const {data: userCardData} = useQuery(userQueries.card());
  const {data: acceptedGroupsData} = useQuery(userQueries.groupsAccepted());

  // 그룹없으면
  if (acceptedGroupsData?.length === 0) {
    return (
      <LayoutBottomBar
        classNames={{wrapper: 'bg-[#f6f6f6]'}}
        header={<ProfileHeader />}
      >
        <MyProfileEmpty userCardData={userCardData} />
      </LayoutBottomBar>
    );
  }

  if (!userCardData) return <div>로딩 중...</div>;

  return (
    <LayoutBottomBar
      classNames={{wrapper: 'bg-[#f6f6f6]'}}
      header={<ProfileHeader />}
    >
      <MyProfile />
    </LayoutBottomBar>
  );
};

export default ProfilePage;
