import {Navigate, Outlet} from 'react-router-dom';
import {useToken} from '@/shared/model/auth';

/**
 * A route guard that allows access only if the user is NOT authenticated.
 * If the user is authenticated (token exists), they are redirected to "/home".
 * Used for routes like /login, /sign-up, /find-password.
 */
const PublicOnlyGuard = () => {
  const token = useToken();

  if (token) {
    // User is authenticated, redirect them from public-only pages (e.g., login, sign-up)
    return <Navigate to="/home" replace />;
  }

  // User is not authenticated, allow access to the child routes
  return <Outlet />;
};

export default PublicOnlyGuard;
