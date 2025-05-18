import * as React from 'react';
import {Navigate, Outlet} from 'react-router-dom';

import {useUserInfo} from '@/shared/model/user';

export const UserOnlyGuard: React.FC = () => {
  const userInfo = useUserInfo();

  if (userInfo?.type === 'manager') {
    return <Navigate to="/manager" replace />;
  }

  return <Outlet />;
};
