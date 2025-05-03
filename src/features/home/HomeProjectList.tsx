import ContentsCard from './components/ContentsCard';

interface HomeProjectListProps {
  isLogin: boolean;
}

const HomeProjectList = ({isLogin}: HomeProjectListProps) => {
  if (!isLogin) {
    return (
      <ContentsCard title="진행중인 프로젝트">
        <div className="h-[200px] flex flex-col items-center justify-center">
          <div className="text-[#767676] text-justify text-base font-medium leading-6">
            진행 예정인 프로젝트가 있으신가요?
          </div>
          <div className="text-[#111] text-justify text-lg font-bold leading-6">
            나와 맞는 사람과 팀빌딩하러가기
          </div>
        </div>
      </ContentsCard>
    );
  }

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
