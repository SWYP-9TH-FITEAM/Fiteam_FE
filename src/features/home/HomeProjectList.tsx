import ContentsCard from './components/ContentsCard';

const HomeProjectList = () => {
  return (
    <ContentsCard title="진행중인 프로젝트" arrowLink="/projects">
      <div className="flex flex-col gap-2 mt-[14px] text-left">
        <div className="p-3.5 bg-[#EEECFF] rounded-md">
          <span className="text-sm text-[#5F4AFF] font-medium">
            스위프 웹 9기 프로젝트
          </span>
        </div>

        <div className="p-3.5 bg-[#F1F2F4] rounded-md">
          <span className="text-sm text-[#111111] font-medium">
            플래닝 앱 4기 프로젝트
          </span>
        </div>

        <div className="p-3.5 bg-[#F1F2F4] rounded-md">
          <span className="text-sm text-[#111111] font-medium">
            코드잇 프로덕트 디자이너
          </span>
        </div>
      </div>
    </ContentsCard>
  );
};

export default HomeProjectList;
