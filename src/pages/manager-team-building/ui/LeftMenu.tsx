import {Link, useLocation} from 'react-router-dom';

import {cn} from '@/lib/utils';

const menuItems = [
  {name: '그룹 생성', path: '/manager/team-building/create-group'},
  {name: '그룹원 초대', path: '/manager/team-building/invite-members'},
];

const LeftMenu = () => {
  const location = useLocation();

  return (
    <aside className="mt-12 w-[276px]">
      <nav className="rounded-[18px] bg-white px-6 py-5 shadow-md">
        <ul className="divide-border divide space-y-1 divide-y">
          {menuItems.map(item => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={cn(
                    'block rounded-md px-4 py-[22px] text-lg font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900',
                    isActive && 'bg-violet-50 font-semibold text-violet-700',
                  )}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default LeftMenu;
