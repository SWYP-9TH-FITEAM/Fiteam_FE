import {ChevronLeft} from 'lucide-react';

import {Button} from '@/components/ui/button';
import {EventDetailProps} from './EventsList';

interface EventsDetailProps {
  settingDetailId: number;
  navigateToEventList: () => void;
}

const EventsDetail = ({
  settingDetailId,
  navigateToEventList,
}: EventsDetailProps) => {
  const dummy: EventDetailProps = {
    id: settingDetailId,
    title: `공지사항${settingDetailId}`,
    author: `공지사항작성자${settingDetailId}`,
    date: '2024-01-01',
    content: '공지사항 내용',
  };
  const {title, author, date, content} = dummy;

  return (
    <section className="mb-15 w-full rounded-[20px] bg-white px-13 py-10 shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]">
      <div className="relative flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="absolute -left-9"
          onClick={navigateToEventList}
        >
          <ChevronLeft className="h-7 w-7" />
        </Button>
        <h1 className="text-xl leading-7 font-medium">&nbsp;</h1>
      </div>
      <div className="border-gray-1 border-b pb-4 text-left">
        <div>
          <h2 className="mb-2 text-3xl leading-[38px] font-bold">{title}</h2>
        </div>
        <div className="mb-2 flex text-sm text-gray-500">
          <span className="mr-2">관리자</span> •
          <span className="mx-2">{date}</span> •
          <span className="ml-2">{author}</span>
        </div>
      </div>
      <div className="flex-1 py-8 text-left">
        <pre className="font-sans text-base whitespace-pre-wrap">{content}</pre>
      </div>
    </section>
  );
};

export default EventsDetail;
