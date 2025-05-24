import {useState} from 'react';

import NoticeCreate from './NoticeCreate';
import NoticeDetail from './NoticeDetail';
import NoticeManagement from './NoticeManagement';

export type MyPageNoticeStatus =
  | 'NOTICE_MANAGEMENT'
  | 'NOTICE_CREATE'
  | 'NOTICE_DETAIL';

const MyPageNotice = () => {
  const [myPageNoticeStatus, setMyPageNoticeStatus] =
    useState<MyPageNoticeStatus>('NOTICE_MANAGEMENT');

  console.log(myPageNoticeStatus);
  if (myPageNoticeStatus === 'NOTICE_MANAGEMENT') {
    return <NoticeManagement setMyPageNoticeStatus={setMyPageNoticeStatus} />;
  }

  if (myPageNoticeStatus === 'NOTICE_CREATE') {
    return <NoticeCreate setMyPageNoticeStatus={setMyPageNoticeStatus} />;
  }

  if (myPageNoticeStatus === 'NOTICE_DETAIL') {
    return <NoticeDetail setMyPageNoticeStatus={setMyPageNoticeStatus} />;
  }

  return <NoticeManagement setMyPageNoticeStatus={setMyPageNoticeStatus} />;
};

export default MyPageNotice;
