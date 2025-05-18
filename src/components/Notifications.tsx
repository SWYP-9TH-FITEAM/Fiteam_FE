import * as React from 'react';

import alarmIcon from '@/assets/icons/alarm.svg';
import {Button} from './ui/button';
import {Drawer, DrawerContent, DrawerTitle, DrawerTrigger} from './ui/drawer';

export const Notifications: React.FC = () => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="ghost" className="h-6 w-6 p-0.5">
          <img src={alarmIcon} alt="알림" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="mx-auto min-h-[80dvh] max-w-[500px]">
        <DrawerTitle className="text-center">알림</DrawerTitle>
        <div className="border-border divide-border mt-4 divide-y overflow-y-auto border-t">
          {Array.from(Array(50)).map((_, index) => (
            <div key={index} className="px-4 py-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
              quos.
            </div>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  );
};
