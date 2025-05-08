import * as React from 'react';

interface RoleSelectorProps {
  onRoleSelect?: (role: string) => void;
  selectedRole: string;
}

export const RoleSelector: React.FC<RoleSelectorProps> = ({
  onRoleSelect,
  selectedRole,
}) => {
  const roles = [
    {id: 'pm', label: 'PM'},
    {id: 'designer', label: '디자이너'},
    {id: 'frontend', label: '프론트엔드'},
    {id: 'backend', label: '백엔드'},
  ];

  const handleRoleClick = (roleId: string) => {
    onRoleSelect?.(roleId);
  };

  return (
    <div className="flex items-center mt-3 justify-center pt-3 px-5 bg-white rounded-[20px_16px_0px_0px]">
      {roles.map(role => (
        <button
          key={role.id}
          className={`flex justify-center items-center py-[10px] px-[15px] ${
            selectedRole === role.id
              ? 'border-b border-[#5F4AFF] text-[#5F4AFF]'
              : 'text-[#979797]'
          }`}
          onClick={() => handleRoleClick(role.id)}
        >
          <span className="font-medium text-[18px] leading-[1.33] tracking-[-2.5%]">
            {role.label}
          </span>
        </button>
      ))}
    </div>
  );
};
