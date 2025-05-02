import {LayoutBottomBar} from '@/layouts/LayoutBottomBar';

const ProfilePage = () => {
  const Header = () => {
    return (
      <header className="sticky top-0 z-10 h-12 px-4 py-3 text-center font-semibold text-lg">
        헤더
      </header>
    );
  };

  return (
    <LayoutBottomBar bgColor="#F1F2F4" header={<Header />}>
      <div>ProfilePage</div>
    </LayoutBottomBar>
  );
};

export default ProfilePage;
