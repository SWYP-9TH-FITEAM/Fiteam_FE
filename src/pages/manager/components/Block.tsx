import {ReactNode} from 'react';

const Block = ({children}: {children: ReactNode}) => {
  return (
    <section className="mb-5 w-full rounded-[20px] bg-white px-[33px] py-9 shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]">
      {children}
    </section>
  );
};

export default Block;
