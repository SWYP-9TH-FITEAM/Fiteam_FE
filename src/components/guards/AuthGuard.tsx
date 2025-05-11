import {Navigate, Outlet, useLocation} from 'react-router-dom';
import {useToken} from '@/shared/model/auth';

/**
 * A route guard that allows access only if the user IS authenticated.
 * If the user is not authenticated (token does not exist), they are redirected to "/login".
 * The current path is stored in the state to allow redirection back after successful login.
 * Used for all routes except public-only ones like /login, /sign-up.
 */
const AuthGuard = () => {
  const token = useToken();
  const location = useLocation();

  if (!token) {
    // User is not authenticated, redirect them to the login page
    // Pass the current location to redirect back after login
    return <Navigate to="/login" state={{from: location}} replace />;
  }

  // User is authenticated, allow access to the child routes
  return <Outlet />;
};

export default AuthGuard;
