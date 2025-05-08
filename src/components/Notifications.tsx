import * as React from 'react';
import {Button} from './ui/button';
import alarmIcon from '@/assets/icons/alarm.svg';
import {Drawer, DrawerContent, DrawerTitle, DrawerTrigger} from './ui/drawer';

export const Notifications: React.FC = () => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="ghost" className="w-6 h-6 p-0.5">
          <img src={alarmIcon} alt="알림" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-w-[500px] mx-auto min-h-[80dvh]">
        <DrawerTitle className="text-center">알림</DrawerTitle>
        <div className="mt-4 border-t divide-y overflow-y-auto">
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
