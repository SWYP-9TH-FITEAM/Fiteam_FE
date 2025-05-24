import {useState} from 'react';

import EventsDetail from './EventsDetail';
import EventsList from './EventsList';

const MyPageEvent = () => {
  const [settingDetailId, setSettingDetailId] = useState<number>(0);
  const navigateToEventList = () => setSettingDetailId(0);

  if (settingDetailId) {
    return (
      <EventsDetail
        settingDetailId={settingDetailId}
        navigateToEventList={navigateToEventList}
      />
    );
  }
  return <EventsList setSettingDetailId={setSettingDetailId} />;
};

export default MyPageEvent;
