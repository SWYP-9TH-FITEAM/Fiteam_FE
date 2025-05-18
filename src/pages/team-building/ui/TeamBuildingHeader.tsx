import * as React from 'react';

import {Notifications} from '@/components/Notifications';

export const TeamBuildingHeader: React.FC = () => {
  return (
    <header className="relative flex items-center justify-end px-5 py-2.5">
      <div className="absolute left-1/2 -translate-x-1/2 text-2xl font-semibold tracking-[-0.6px]">
        팀빌딩
      </div>
      <Notifications />
    </header>
  );
};
