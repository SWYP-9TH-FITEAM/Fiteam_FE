import {ChevronRightIcon} from 'lucide-react';

import {SettingsStatus} from './MyPageSettings';

interface SettingsMainProps {
  setSettingsStatus: (status: SettingsStatus) => void;
}

const SettingsMain = ({setSettingsStatus}: SettingsMainProps) => {
  return (
    <section className="relative mb-15 w-full rounded-[20px] bg-white px-[74px] py-[72px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]">
      <h3 className="mb-10 text-center text-2xl font-medium">설정</h3>
      <ul className="text-lg leading-6 font-medium">
        <li
          className="flex h-18 items-center justify-between"
          onClick={() => setSettingsStatus('INFO')}
        >
          <span>내 정보</span>
          <ChevronRightIcon className="h-6 w-6 cursor-pointer" />
        </li>
        <li
          className="flex h-18 items-center justify-between"
          onClick={() => setSettingsStatus('PASSWORD')}
        >
          <span>비밀 번호 변경</span>
          <ChevronRightIcon className="h-6 w-6 cursor-pointer" />
        </li>
      </ul>
    </section>
  );
};

export default SettingsMain;
