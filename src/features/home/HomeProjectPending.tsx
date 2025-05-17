import {userQueries} from '@/entities/user/api';
import {useQuery} from '@tanstack/react-query';
import ContentsCard from './components/ContentsCard';

const HomeProjectPending = () => {
  const {data: projectList} = useQuery(userQueries.groupsPending());

  return (
    <ContentsCard title="수락 대기중인 프로젝트" arrowLink="/projects">
      <div className="flex flex-col gap-2 mt-[14px] text-left">
        {projectList && projectList.length > 0 ? (
          projectList.map(project => (
            <div className="p-3.5 bg-[#EEECFF] rounded-md">
              <span className="text-sm text-[#5F4AFF] font-medium">
                {project.groupName}
              </span>
            </div>
          ))
        ) : (
          <div>수락 대기중인 프로젝트가 없습니다 🥲</div>
        )}
      </div>
    </ContentsCard>
  );
};

export default HomeProjectPending;
