import {ReactNode} from 'react';

type LayoutMobileProps = {
  children: ReactNode;
  header?: ReactNode;
  bgColor?: string;
};

export const LayoutMobile = ({
  children,
  header,
  bgColor = '#fafafa',
}: LayoutMobileProps) => {
  return (
    <div
      className="flex flex-col items-center h-screen"
      style={{backgroundColor: bgColor}}
    >
      <div className="relative w-full max-w-[500px] h-full flex flex-col">
        {header}

        <div className="flex-1 overflow-y-auto px-5">{children}</div>
      </div>
    </div>
  );
};
