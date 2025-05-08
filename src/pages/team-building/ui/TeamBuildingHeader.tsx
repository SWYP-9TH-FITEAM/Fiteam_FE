import {Notifications} from '@/components/Notifications';
import * as React from 'react';

export const TeamBuildingHeader: React.FC = () => {
  return (
    <header className="relative flex justify-end items-center py-2.5 px-5">
      <div className="text-2xl font-semibold tracking-[-0.6px] absolute left-1/2 -translate-x-1/2">
        팀빌딩
      </div>
      <Notifications />
    </header>
  );
};
