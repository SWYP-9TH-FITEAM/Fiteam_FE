import * as React from 'react';
import {LayoutBottomBar} from '@/layouts/LayoutBottomBar';
import {TeamBuildingHeader} from './TeamBuildingHeader';
import {RegisterProfileCard} from './RegisterProfileCard';
import {TeamBuilding} from './TeamBuilding';
import noGroups from '@/assets/images/no-group.png';
import {useQueries} from '@tanstack/react-query';
import {userQueries} from '@/entities/user/api';
import {memberQueries} from '@/entities/member/api';
import {useCurrentGroupId, useSetCurrentGroupId} from '@/shared/model/group-id';

const PAGES = Object.freeze({
  NO_GROUPS: 'NO_GROUPS',
  NOT_UPLOADED_PROFILE_CARD: 'NOT_UPLOADED_PROFILE_CARD',
  TEAM_BUILDING: 'TEAM_BUILDING',
} as const);

type Page = (typeof PAGES)[keyof typeof PAGES];

export const TeamBuildingPage: React.FC = () => {
  const currentGroupId = useCurrentGroupId();
  const setCurrentGroupId = useSetCurrentGroupId();

  const {
    data: [{data: acceptedGroups}, {data: pendingGroups}, {data: myProfile}],
    loading,
    error,
  } = useQueries({
    queries: [
      userQueries.groupsAccepted(),
      userQueries.groupsPending(),
      {
        ...memberQueries.myProfile(currentGroupId ?? -1),
        enabled: currentGroupId !== null,
      },
    ],
    combine: data => {
      return {
        data,
        loading: data.some(data => data.isLoading),
        error: data.some(data => data.isError),
      };
    },
  });

  const [page, setPage] = React.useState<Page | null>(null);

  React.useEffect(() => {
    if (!acceptedGroups || !pendingGroups) return;

    if (acceptedGroups.length > 0) {
      setCurrentGroupId(prev => {
        if (prev === null) {
          return acceptedGroups[0].groupId;
        }

        return prev;
      });
      return;
    }

    if (pendingGroups.length > 0) {
      setCurrentGroupId(prev => {
        if (prev === null) {
          return pendingGroups[0].groupId;
        }
        return prev;
      });
      return;
    }

    setCurrentGroupId(null);
  }, [acceptedGroups, setCurrentGroupId, pendingGroups]);

  React.useEffect(() => {
    if (loading) return;

    if (acceptedGroups?.length === 0) {
      setPage(PAGES.NO_GROUPS);
      return;
    }

    if (!myProfile) {
      setPage(PAGES.NOT_UPLOADED_PROFILE_CARD);
      return;
    }

    if (myProfile && myProfile.position === null) {
      setPage(PAGES.NOT_UPLOADED_PROFILE_CARD);
      return;
    }

    setPage(PAGES.TEAM_BUILDING);
  }, [acceptedGroups, myProfile, loading]);

  if (loading) {
    return (
      <LayoutBottomBar
        classNames={{
          wrapper: 'bg-white',
          scrollableArea: 'flex items-center justify-center',
        }}
        header={<TeamBuildingHeader />}
      >
        <div className="loading loading-spinner loading-xl" />
      </LayoutBottomBar>
    );
  }

  if (error) {
    return (
      <LayoutBottomBar
        classNames={{
          wrapper: 'bg-white',
          scrollableArea: 'flex items-center justify-center',
        }}
        header={<TeamBuildingHeader />}
      >
        <div className="text-red-500">
          데이터를 불러오는 중 오류가 발생했습니다.
        </div>
      </LayoutBottomBar>
    );
  }

  switch (page) {
    case PAGES.NO_GROUPS:
      return (
        <LayoutBottomBar
          classNames={{wrapper: 'bg-white'}}
          header={<TeamBuildingHeader />}
        >
          <div className="mt-20 text-2xl font-semibold tracking-[-0.6px]">
            현재 참가하고 있는 그룹이 없습니다.
          </div>
          <img
            className="w-52 h-52 mx-auto mt-20"
            src={noGroups}
            alt="no group"
          />
        </LayoutBottomBar>
      );

    case PAGES.NOT_UPLOADED_PROFILE_CARD:
      return (
        <LayoutBottomBar
          classNames={{wrapper: 'bg-white'}}
          header={<TeamBuildingHeader />}
        >
          <RegisterProfileCard />
        </LayoutBottomBar>
      );

    case PAGES.TEAM_BUILDING:
      return (
        <LayoutBottomBar
          classNames={{
            wrapper: 'bg-[#F5F4FD]',
            scrollableArea: 'px-0 relative',
          }}
          header={<TeamBuildingHeader />}
        >
          <TeamBuilding />
        </LayoutBottomBar>
      );
    default:
      return (
        <LayoutBottomBar
          classNames={{
            wrapper: 'bg-white',
            scrollableArea: 'flex items-center justify-center',
          }}
          header={<TeamBuildingHeader />}
        >
          <div className="loading loading-spinner loading-xl" />
        </LayoutBottomBar>
      );
  }
};
