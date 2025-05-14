import {useQuery} from '@tanstack/react-query';
import ContentsCard from './components/ContentsCard';
import {getUserGroupsAccepted} from '@/entities/user/api';

const HomeProjectList = () => {
  const {data: projectList} = useQuery({
    queryKey: ['projectList'],
    queryFn: () => getUserGroupsAccepted(),
  });

  if (!projectList) return null;

  return (
    <ContentsCard title="진행중인 프로젝트" arrowLink="/projects">
      <div className="flex flex-col gap-2 mt-[14px] text-left">
        {projectList.map(project => (
          <div className="p-3.5 bg-[#EEECFF] rounded-md">
            <span className="text-sm text-[#5F4AFF] font-medium">
              {project.groupName}
            </span>
          </div>
        ))}
      </div>
    </ContentsCard>
  );
};

export default HomeProjectList;
