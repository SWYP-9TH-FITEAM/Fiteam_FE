import {Link} from 'react-router-dom';

import noGroup from '@/assets/images/no-group.png';
import {Button} from '@/components/ui/button';
import {GroupDrawer} from '@/shared/ui/GroupDrawer';

export const RegisterProfileCard = () => {
  return (
    <div className="flex h-full flex-col">
      <GroupDrawer />
      <div className="mt-11 text-2xl font-semibold tracking-[-0.6px]">
        현재 등록된 프로필이 없습니다.
      </div>

      <img className="mx-auto mt-20 h-52 w-52" src={noGroup} alt="no group" />

      <Button asChild className="mt-auto mb-8 h-[3.375rem] text-xl">
        <Link to="/profile/edit">프로필 생성하기</Link>
      </Button>
    </div>
  );
};
