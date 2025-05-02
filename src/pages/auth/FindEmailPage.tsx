import {ChevronLeft} from 'lucide-react';
import * as React from 'react';
import {useNavigate} from 'react-router-dom';

export const FindEmailPage: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <div className="flex items-center px-3 py-2.5 gap-2.5">
        <button onClick={handleBack}>
          <ChevronLeft className="w-6 h-6 stroke-[1.5]" />
        </button>
        <div className="text-xl font-medium">이메일 찾기</div>
      </div>
    </div>
  );
};
