import {memberQueries} from '@/entities/member/api';
import {useCurrentGroupId} from '@/shared/model/group-id';
import {useQuery} from '@tanstack/react-query';
import * as React from 'react';

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
    ...memberQueries.positionsByGroupId(currentGroupId ?? 0),
    enabled: currentGroupId !== null,
  });

  const handleRoleClick = (roleId: string) => {
    onRoleSelect?.(roleId);
  };

  return (
    <div className="flex items-center mt-3 justify-center pt-3 px-5 bg-white rounded-[20px_16px_0px_0px]">
      {!positions && !isError && (
        <div className="loading loading-spinner loading-xl" />
      )}
      {isError && <div className="text-red-500">Failed to load positions</div>}
      {positions?.map((role, index) => (
        <button
          key={index}
          className={`flex justify-center items-center py-[10px] px-[15px] ${
            selectedRole === role
              ? 'border-b border-[#5F4AFF] text-[#5F4AFF]'
              : 'text-[#979797]'
          }`}
          onClick={() => handleRoleClick(role)}
        >
          <span className="font-medium text-[18px] leading-[1.33] tracking-[-2.5%]">
            {role}
          </span>
        </button>
      ))}
    </div>
  );
};
