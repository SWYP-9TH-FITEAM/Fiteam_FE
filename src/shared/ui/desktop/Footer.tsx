import * as React from 'react';

import logoGray from '@/assets/images/logo-gray.png';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-1 text-gray-5 flex min-h-[78px] w-full items-center gap-20 px-12">
      <img src={logoGray} alt="logo" className="h-[22px]" />
      <a
        href="mailto:wearetheoneteam10@gmail.com"
        className="text-base font-medium tracking-[-0.4px] text-[#767676] hover:!underline"
      >
        Contact
      </a>
    </footer>
  );
};
