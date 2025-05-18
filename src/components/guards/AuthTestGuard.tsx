import {useEffect, useState} from 'react';
import {Navigate, Outlet, useLocation} from 'react-router-dom';

import {api} from '@/shared/api/client';
import {useToken} from '@/shared/model/auth';

/**
 * A route guard that allows access only if the user IS authenticated.
 * If the user is not authenticated (token does not exist), they are redirected to "/login".
 * The current path is stored in the state to allow redirection back after successful login.
 * Used for all routes except public-only ones like /login, /sign-up.
 */
const AuthTestGuard = () => {
  const token = useToken();
  const location = useLocation();

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'fail'>(
    'idle',
  );

  useEffect(() => {
    if (!token) return;
    setStatus('loading');
    api<unknown>('v1/user/card', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        if (res.ok) {
          setStatus('success');
        } else {
          setStatus('fail');
        }
      })
      .catch(() => {
        setStatus('fail');
      });
  }, [token]);

  if (!token) {
    // User is not authenticated, redirect them to the login page
    // Pass the current location to redirect back after login
    return <Navigate to="/login" state={{from: location}} replace />;
  }

  if (status === 'loading' || status === 'idle') {
    return null;
  }

  if (status === 'fail') {
    return <Navigate to="/test/start" replace />;
  }

  // status === 'success'일 때만 자식 라우트 렌더링
  return <Outlet />;
};

export default AuthTestGuard;
