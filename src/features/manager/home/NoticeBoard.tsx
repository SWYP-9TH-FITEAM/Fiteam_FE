import {useState} from 'react';
import {ChevronUp, ChevronDown} from 'lucide-react';

const NOTICE_DATA = ['공지사항이예욤', '이벤트예욤', '공지사항이예욤22'];

export default function NoticeBoard() {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-[1400px] bg-white rounded-2xl border border-[#F3F4F6] shadow-sm flex flex-col overflow-hidden mb-[138px]">
      <div
        className="flex items-center justify-between bg-[#F3F4F6] px-8 py-6 cursor-pointer"
        onClick={() => setOpen(prev => !prev)}
      >
        <span className="text-[28px] font-semibold leading-9">
          공지사항 / 이벤트
        </span>
        {open ? (
          <ChevronUp className="w-6 h-6" />
        ) : (
          <ChevronDown className="w-6 h-6" />
        )}
      </div>
      {open && (
        <div className="flex-1 flex flex-col justify-center px-7 py-[20px]">
          {NOTICE_DATA.map(item => (
            <div
              key={item}
              className="text-2xl font-semibold leading-8 text-gray-6 h-[54px] border-t border-[#E5E7EB] first:border-t-0 flex items-center"
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
