import {useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import {Link} from 'react-router-dom';

import {Button} from '@/components/ui/button';
import {managerQueries} from '@/entities/manager/api';
import ManagerHeader from '@/features/manager/layouts/ManagerHeader';
import GroupCard from '@/pages/manager-team-building/ui/GroupCard';
import GroupStatusFilter from '@/pages/manager-team-building/ui/GroupStatusFilter';
import LeftMenu from '@/pages/manager-team-building/ui/LeftMenu';
import {Footer} from '@/shared/ui/desktop/Footer';
import {Main} from '@/shared/ui/desktop/Main';

const ManagerTeamBuildingPage = () => {
  const {
    data: groups,
    isLoading,
    isError,
  } = useQuery(managerQueries.groupsAll());

  const statusSet = new Set([
    '전체',
    ...(groups?.map(group => group.status) || []),
  ]);

  const [currentFilter, setCurrentFilter] = useState('전체');

  const handleFilterChange = (newFilter: string) => {
    setCurrentFilter(newFilter);
  };

  const filteredGroups = groups?.filter(group => {
    if (currentFilter === '전체') return true;
    return group.status === currentFilter;
  });

  return (
    <>
      <ManagerHeader />
      <Main classNames={{main: 'bg-[#F9F9F9]'}}>
        <div className="flex flex-1">
          <LeftMenu />

          <main className="flex-1 px-8 py-12">
            <div className="mb-6 flex items-start justify-between">
              <div className="text-left">
                <h1 className="mb-6 text-3xl font-bold text-gray-800">
                  팀빌딩 현황
                </h1>
                <GroupStatusFilter
                  currentFilter={currentFilter}
                  onFilterChange={handleFilterChange}
                  statusSet={statusSet}
                />
              </div>
              <div className="flex gap-3">
                <Button
                  asChild
                  variant="outline"
                  className="bg-gray-2 hover:bg-gray-3 h-auto rounded-[6px] border-transparent px-[60px] py-[14px] text-lg font-medium text-gray-800"
                >
                  <Link to="/manager/team-building/all-profiles">
                    모든 프로필 조회
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="bg-gray-2 hover:bg-gray-3 h-auto rounded-[6px] border-transparent px-[60px] py-[14px] text-lg font-medium text-gray-800"
                >
                  <Link to="/manager/team-building/create-group">
                    새 그룹 만들기
                  </Link>
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {isLoading && (
                <div className="loading loading-spinner loading-xl" />
              )}
              {isError && <div>그룹을 불러오는데 실패했습니다.</div>}
              {filteredGroups &&
                (filteredGroups.length > 0 ? (
                  filteredGroups.map(group => (
                    <GroupCard key={group.groupId} group={group} />
                  ))
                ) : (
                  <p className="col-span-full text-center text-gray-500">
                    그룹이 존재하지 않습니다.
                  </p>
                ))}
            </div>
          </main>
        </div>
      </Main>
      <Footer />
    </>
  );
};

export default ManagerTeamBuildingPage;
