import {Navigate, Outlet, useLocation} from 'react-router-dom';
import {useToken} from '@/shared/model/auth';
import ky, {HTTPError} from 'ky';
import {useState, useEffect} from 'react';

/**
 * A route guard that allows access only if the user IS authenticated.
 * If the user is not authenticated (token does not exist), they are redirected to "/login".
 * The current path is stored in the state to allow redirection back after successful login.
 * Used for all routes except public-only ones like /login, /sign-up.
 */
const AuthTestGuard = () => {
  const token = useToken();
  const location = useLocation();

  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error400' | 'errorOther'
  >('idle');

  useEffect(() => {
    if (!token) return;
    setStatus('loading');
    ky.get('/v1/user/card', {
      headers: {Authorization: `Bearer ${token}`},
    })
      .then(() => {
        setStatus('success');
      })
      .catch(error => {
        console.log(error);
        if (error instanceof HTTPError && error.response.status === 400) {
          setStatus('error400');
        } else {
          setStatus('errorOther');
        }
      });
  }, [token]);

  if (!token) {
    // User is not authenticated, redirect them to the login page
    // Pass the current location to redirect back after login
    return <Navigate to="/login" state={{from: location}} replace />;
  }

  // status가 'loading' 또는 'idle'이면 아무것도 렌더링하지 않음(=대기)
  if (status === 'loading' || status === 'idle') {
    return null;
  }

  if (status === 'error400') {
    return <Navigate to="/test/start" replace />;
  }
  return <Outlet />;
};

export default AuthTestGuard;
