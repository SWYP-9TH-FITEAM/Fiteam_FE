import * as React from 'react';
import {useQuery} from '@tanstack/react-query';

import {memberQueries} from '@/entities/member/api';
import {useCurrentGroupId} from '@/shared/model/group-id';

interface RoleSelectorProps {
  onRoleSelect?: (role: string) => void;
  selectedRole: string;
}

export const RoleSelector: React.FC<RoleSelectorProps> = ({
  onRoleSelect,
  selectedRole,
}) => {
  const currentGroupId = useCurrentGroupId();

  const {data: positions, isError} = useQuery({
    ...memberQueries.positionsByGroupId(currentGroupId ?? -1),
    enabled: currentGroupId !== null,
  });

  const handleRoleClick = (roleId: string) => {
    onRoleSelect?.(roleId);
  };

  return (
    <div className="mt-3 flex items-center justify-center rounded-[20px_16px_0px_0px] bg-white px-5 pt-3">
      {!positions && !isError && (
        <div className="loading loading-spinner loading-xl" />
      )}
      {isError && <div className="text-red-500">Failed to load positions</div>}
      {positions?.map((role, index) => (
        <button
          key={index}
          className={`flex items-center justify-center px-[15px] py-[10px] ${
            selectedRole === role
              ? 'border-b border-[#5F4AFF] text-[#5F4AFF]'
              : 'text-[#979797]'
          }`}
          onClick={() => handleRoleClick(role)}
        >
          <span className="text-[18px] leading-[1.33] font-medium tracking-[-2.5%]">
            {role}
          </span>
        </button>
      ))}
    </div>
  );
};
