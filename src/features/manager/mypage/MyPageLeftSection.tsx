import {useSearchParams} from 'react-router-dom';

const MyPageLeftSection = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentMenu = searchParams.get('menu');

  const handleMenuClick = (menu: string) => {
    setSearchParams({menu});
  };

  return (
    <section className="flex h-[456px] w-[276px] flex-col justify-between rounded-[18px] bg-white px-6 py-5 text-left shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]">
      <div>
        <header>
          <h2 className="mb-6 text-2xl leading-8 font-semibold">My Page</h2>
        </header>
        <ul className="space-y-4">
          <li
            className={`text-gray-5 hover:text-gray-6 text-base ${currentMenu === 'notice' ? 'text-primary' : ''}`}
          >
            <button onClick={() => handleMenuClick('notice')}>
              • 내 공지사항 관리
            </button>
          </li>
        </ul>
        <hr className="my-6 border-[#E0E0E0]" />
        <ul className="space-y-4">
          <li
            className={`text-gray-5 hover:text-gray-6 text-base ${currentMenu === 'settings' ? 'text-primary' : ''}`}
          >
            <button onClick={() => handleMenuClick('settings')}>• 설정</button>
          </li>
          <li
            className={`text-gray-5 hover:text-gray-6 text-base ${currentMenu === 'events' ? 'text-primary' : ''}`}
          >
            <button onClick={() => handleMenuClick('events')}>
              • 시스템 공지사항 / 이벤트
            </button>
          </li>
        </ul>
      </div>
      <div className="mb-2 flex flex-col items-center gap-3">
        <span className="text-sm text-[#222]">웹 정보 : v1.0</span>
        <button className="h-[48px] w-full rounded-[12px] bg-[#F5F5F5] text-lg font-medium text-[#222] transition-colors hover:bg-[#e0e0e0]">
          로그아웃
        </button>
      </div>
    </section>
  );
};

export default MyPageLeftSection;
