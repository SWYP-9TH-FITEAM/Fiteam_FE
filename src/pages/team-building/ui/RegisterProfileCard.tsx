import {Button} from '@/components/ui/button';
import {GroupDrawer} from '@/shared/ui/GroupDrawer';

import noGroup from '@/assets/images/no-group.png';
import {Link} from 'react-router-dom';

export const RegisterProfileCard = () => {
  return (
    <div className="flex flex-col h-full">
      <GroupDrawer />
      <div className="text-2xl font-semibold tracking-[-0.6px] mt-11">
        현재 등록된 프로필이 없습니다.
      </div>

      <img className="w-52 h-52 mx-auto mt-20" src={noGroup} alt="no group" />

      <Button asChild className="h-[3.375rem] mt-auto mb-8 text-xl">
        <Link to="/profile/edit">프로필 생성하기</Link>
      </Button>
    </div>
  );
};
