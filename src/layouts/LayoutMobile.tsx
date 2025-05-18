import type {ReactNode} from 'react';

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
      className="flex h-screen flex-col items-center"
      style={{backgroundColor: bgColor}}
    >
      <div className="relative flex h-full w-full max-w-[500px] flex-col">
        {header}

        <div className="flex-1 overflow-y-auto px-5">{children}</div>
      </div>
    </div>
  );
};
