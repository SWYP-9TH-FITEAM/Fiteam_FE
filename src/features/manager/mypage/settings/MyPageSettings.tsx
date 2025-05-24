import {useState} from 'react';

import SettingsInfo from './SettingsInfo';
import SettingsMain from './SettingsMain';
import SettingsPassword from './SettingsPassword';

export type SettingsStatus = 'MAIN' | 'INFO' | 'PASSWORD';

const MyPageSettings = () => {
  const [settingsStatus, setSettingsStatus] = useState<SettingsStatus>('MAIN');

  if (settingsStatus === 'MAIN') {
    return <SettingsMain setSettingsStatus={setSettingsStatus} />;
  }

  if (settingsStatus === 'INFO') {
    return <SettingsInfo setSettingsStatus={setSettingsStatus} />;
  }

  if (settingsStatus === 'PASSWORD') {
    return <SettingsPassword setSettingsStatus={setSettingsStatus} />;
  }

  return <div>MyPageSettings</div>;
};

export default MyPageSettings;
