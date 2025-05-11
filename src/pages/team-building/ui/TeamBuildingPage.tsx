import * as React from 'react';
import {LayoutBottomBar} from '@/layouts/LayoutBottomBar';
import {TeamBuildingHeader} from './TeamBuildingHeader';
import {RegisterProfileCard} from './RegisterProfileCard';
import {TeamBuilding} from './TeamBuilding';

const PAGES = Object.freeze({
  NO_GROUPS: 'NO_GROUPS',
  NOT_UPLOADED_PROFILE_CARD: 'NOT_UPLOADED_PROFILE_CARD',
  TEAM_BUILDING: 'TEAM_BUILDING',
} as const);

type Page = (typeof PAGES)[keyof typeof PAGES];

export const TeamBuildingPage: React.FC = () => {
  // TODO: integrate with API
  const [page] = React.useState<Page>(PAGES.TEAM_BUILDING);

  switch (page) {
    case PAGES.NO_GROUPS:
      return (
        <LayoutBottomBar
          classNames={{wrapper: 'bg-white'}}
          header={<TeamBuildingHeader />}
        >
          <div>그룹이 없습니다.</div>
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
          <TeamBuilding
            groups={Array.from(Array(10)).map((_, index) => ({
              groupId: index,
              groupName: `그룹 ${index + 1}`,
            }))}
          />
        </LayoutBottomBar>
      );
  }
};
