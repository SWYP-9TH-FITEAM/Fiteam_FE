import {useQuery} from '@tanstack/react-query';

import {userQueries} from '@/entities/user/api';
import ContentsCard from './components/ContentsCard';

const HomeProjectInProgress = () => {
  const {data: projectList} = useQuery(userQueries.groupsAccepted());

  return (
    <ContentsCard title="진행중인 프로젝트" arrowLink="/projects">
      <div className="mt-[14px] flex flex-col gap-2 text-left">
        {projectList && projectList.length > 0 ? (
          projectList?.map(project => (
            <div
              key={project.groupId}
              className="bg-gray-1 text-gray-dark hover:bg-primary-light hover:text-primary cursor-pointer rounded-md p-3.5 text-sm font-medium transition"
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
