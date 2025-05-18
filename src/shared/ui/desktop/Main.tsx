import * as React from 'react';

import {cn} from '@/lib/utils';

interface MainProps {
  children: React.ReactNode;
  classNames?: {
    main?: string;
    content?: string;
  };
}

export const Main: React.FC<MainProps> = ({children, classNames}) => {
  return (
    <main className={cn('flex flex-1 justify-center', classNames?.main)}>
      <div className={cn('mx-auto w-full max-w-[1400px]', classNames?.content)}>
        {children}
      </div>
    </main>
  );
};
