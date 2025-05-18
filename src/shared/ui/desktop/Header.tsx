import * as React from 'react';
import {Link} from 'react-router-dom';

import logo from '@/assets/images/logo.png';

interface HeaderProps {
  logoHref?: string;
  children?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({
  logoHref = '/manager',
  children,
}) => {
  return (
    <header className="sticky top-0 left-0 z-50 flex min-h-20 w-full min-w-[768px] items-center justify-center bg-white shadow">
      <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-8">
        <Link to={logoHref}>
          <img src={logo} alt="logo" className="h-[37px]" />
        </Link>
        {children}
      </div>
    </header>
  );
};
