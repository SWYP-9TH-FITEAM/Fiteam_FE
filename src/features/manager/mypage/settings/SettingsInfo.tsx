import {ChevronLeft} from 'lucide-react';

import {Button} from '@/components/ui/button';
import {SettingsStatus} from './MyPageSettings';

interface SettingsInfoProps {
  setSettingsStatus: (status: SettingsStatus) => void;
}

const SettingsInfo = ({setSettingsStatus}: SettingsInfoProps) => {
  const changeStatusToSettingsMain = () => {
    setSettingsStatus('MAIN');
  };

  return (
    <section className="relative mb-15 w-full rounded-[20px] bg-white px-[74px] py-[72px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]">
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-9"
        onClick={changeStatusToSettingsMain}
      >
        <ChevronLeft className="h-9 w-9" />
      </Button>
      <h3 className="mb-[90px] text-center text-2xl font-medium">내 정보</h3>
      <table className="w-full">
        <tbody>
          <tr>
            <th className="w-[120px] pb-7 text-left align-middle text-lg font-normal">
              이름
            </th>
            <td className="pb-7">
              <input
                type="text"
                readOnly
                className="h-[48px] w-[594px] rounded-[6px] bg-[#F2F2F2] px-4 text-base outline-none"
                value="홍길동"
              />
            </td>
          </tr>
          <tr>
            <th className="w-[120px] pb-7 text-left align-middle text-lg font-normal">
              이메일
            </th>
            <td className="pb-7">
              <input
                type="text"
                readOnly
                className="h-[48px] w-[594px] rounded-[6px] bg-[#F2F2F2] px-4 text-base outline-none"
                value="hong@email.com"
              />
            </td>
          </tr>
          <tr>
            <th className="w-[120px] text-left align-middle text-lg font-normal">
              가입날짜
            </th>
            <td>
              <input
                type="text"
                readOnly
                className="h-[48px] w-[594px] rounded-[6px] bg-[#F2F2F2] px-4 text-base outline-none"
                value="2024-05-01"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

export default SettingsInfo;
