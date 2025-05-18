import {patchAcceptGroup, userQueries} from '@/entities/user/api';
import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
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
      <div className="flex flex-col gap-2 mt-[14px] text-left">
        {projectList && projectList.length > 0 ? (
          projectList.map(project => (
            <div
              key={project.groupId}
              className="flex items-center justify-between p-3.5 rounded-md bg-gray-1 text-gray-dark font-medium text-sm transition hover:bg-primary-light hover:text-primary cursor-pointer"
            >
              <span className="text-sm text-[#5F4AFF] font-medium">
                {project.groupName}
              </span>
              <button
                className="w-21 h-8 bg-[#e8e8e8] rouned-lg text-sm font-medium leading-5 tracking-[-0.35px]"
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
