import {useQuery} from '@tanstack/react-query';
import ContentsCard from './components/ContentsCard';
import {userQueries} from '@/entities/user/api';

const HomeProjectInProgress = () => {
  const {data: projectList} = useQuery(userQueries.groupsAccepted());

  return (
    <ContentsCard title="진행중인 프로젝트" arrowLink="/projects">
      <div className="flex flex-col gap-2 mt-[14px] text-left">
        {projectList && projectList.length > 0 ? (
          projectList?.map(project => (
            <div
              key={project.groupId}
              className="p-3.5 rounded-md bg-gray-1 text-gray-dark font-medium text-sm transition hover:bg-primary-light hover:text-primary cursor-pointer"
            >
              <span>{project.groupName}</span>
            </div>
          ))
        ) : (
          <div>진행중인 프로젝트가 없습니다 🥲</div>
        )}
      </div>
    </ContentsCard>
  );
};

export default HomeProjectInProgress;
