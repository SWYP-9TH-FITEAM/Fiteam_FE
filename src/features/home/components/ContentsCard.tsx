import type {ReactNode} from 'react';

import {ChevronRightIcon} from 'lucide-react';
import {Link} from 'react-router-dom';

interface ContentsCardProps {
  title?: string;
  arrowLink?: string;
  children: ReactNode;
}
const ContentsCard = ({title, arrowLink, children}: ContentsCardProps) => {
  return (
    <div className="rounded-[14px] bg-white px-4 py-3 shadow-[0px_0px_2px_0px_rgba(0,0,0,0.25)]">
      <div className="flex items-center justify-between">
        <h3 className="text-base leading-6 font-medium tracking-[-0.4px] text-black">
          {title}
        </h3>
        {arrowLink && (
          <Link to={arrowLink}>
            <ChevronRightIcon className="h-6 w-6" />
          </Link>
        )}
      </div>

      {children}
    </div>
  );
};

export default ContentsCard;
