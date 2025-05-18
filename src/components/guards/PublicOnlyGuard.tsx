import {Navigate, Outlet} from 'react-router-dom';

import {useToken} from '@/shared/model/auth';
import {useUserInfo} from '@/shared/model/user';

/**
 * A route guard that allows access only if the user is NOT authenticated.
 * If the user is authenticated (token exists), they are redirected to "/home".
 * Used for routes like /login, /sign-up, /find-password.
 */
const PublicOnlyGuard = () => {
  const token = useToken();
  const userInfo = useUserInfo();

  if (!token) return <Outlet />;

  if (userInfo?.type === 'manager') {
    return <Navigate to="/manager" replace />;
  }

  // User is authenticated, redirect them from public-only pages (e.g., login, sign-up)
  return <Navigate to="/home" replace />;
};

export default PublicOnlyGuard;
