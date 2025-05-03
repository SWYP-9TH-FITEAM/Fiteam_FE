import ContentsCard from './components/ContentsCard';

const HomeProfile = () => {
  return (
    <ContentsCard title="내 프로필" arrowLink="/profile">
      <div className="bg-white p-4 mt-2 rounded-md border-[1.5px] border-solid border-[#5F4AFF]">
        <h4 className="text-left text-[#111] text-2xl font-semibold leading-8">
          김도은
        </h4>
        <div className="flex items-center gap-1.5 text-[#111] text-sm font-medium leading-">
          <span>디자이너</span>
          <div className="w-1 h-1 rounded-full bg-black"></div>
          <span>취준생</span>
        </div>
      </div>
    </ContentsCard>
  );
};

export default HomeProfile;
