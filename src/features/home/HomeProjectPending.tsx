import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';

import {patchAcceptGroup, userQueries} from '@/entities/user/api';
import ContentsCard from './components/ContentsCard';

const HomeProjectPending = () => {
  const queryClient = useQueryClient();
  const {data: projectList} = useQuery(userQueries.groupsPending());

  const {mutate: acceptGroup} = useMutation({
    mutationFn: (groupId: number) => patchAcceptGroup(groupId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: userQueries.groupsPending().queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: userQueries.groupsAccepted().queryKey,
      });
    },
  });

  const handleAcceptGroup = (groupId: number) => {
    acceptGroup(groupId);
  };

  return (
    <ContentsCard title="수락 대기중인 프로젝트" arrowLink="/projects">
      <div className="mt-[14px] flex flex-col gap-2 text-left">
        {projectList && projectList.length > 0 ? (
          projectList.map(project => (
            <div
              key={project.groupId}
              className="bg-gray-1 text-gray-dark hover:bg-primary-light hover:text-primary flex cursor-pointer items-center justify-between rounded-md p-3.5 text-sm font-medium transition"
            >
              <span className="text-sm font-medium text-[#5F4AFF]">
                {project.groupName}
              </span>
              <button
                className="rouned-lg h-8 w-21 bg-[#e8e8e8] text-sm leading-5 font-medium tracking-[-0.35px]"
                onClick={() => handleAcceptGroup(project.groupId)}
              >
                수락하기
              </button>
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
