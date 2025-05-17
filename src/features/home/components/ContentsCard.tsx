import {ChevronRightIcon} from 'lucide-react';
import {ReactNode} from 'react';
import {Link} from 'react-router-dom';

interface ContentsCardProps {
  title?: string;
  arrowLink?: string;
  children: ReactNode;
}
const ContentsCard = ({title, arrowLink, children}: ContentsCardProps) => {
  return (
    <div className="bg-white rounded-[14px] px-4 py-3 shadow-[0px_0px_2px_0px_rgba(0,0,0,0.25)] ">
      <div className="flex justify-between items-center">
        <h3 className="text-black text-base font-medium leading-6 tracking-[-0.4px]">
          {title}
        </h3>
        {arrowLink && (
          <Link to={arrowLink}>
            <ChevronRightIcon className="w-6 h-6" />
          </Link>
        )}
      </div>

      {children}
    </div>
  );
};

export default ContentsCard;
