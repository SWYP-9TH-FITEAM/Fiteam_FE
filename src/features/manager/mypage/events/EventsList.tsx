import {useState} from 'react';
import {ChevronLeft, ChevronRight, ChevronRightIcon} from 'lucide-react';

import {Button} from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination';

interface EventsListProps {
  setSettingDetailId: (id: number) => void;
}

export type EventDetailProps = {
  id: number;
  title: string;
  author: string;
  date: string;
  content: string;
};

// 더미 데이터 23개로 예시
const dummy: EventDetailProps[] = Array.from({length: 23}).map((_, i) => ({
  id: i + 1,
  title: `공지/이벤트 제목 ${i + 1}`,
  author: `작성자${i + 1}`,
  date: `2024-01-${(i % 30) + 1}`.padStart(10, '0'),
  content: `내용${i + 1}`,
}));

const PAGE_SIZE = 10;

const EventsList = ({setSettingDetailId}: EventsListProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  // 페이지네이션 데이터 계산
  const total = dummy.length;
  const totalPages = Math.ceil(total / PAGE_SIZE);
  const startIdx = (currentPage - 1) * PAGE_SIZE;
  const pageData = dummy.slice(startIdx, startIdx + PAGE_SIZE);

  // 페이지 이동 함수
  const goToPage = (p: number) => {
    setCurrentPage(p);
  };

  // 페이지네이션 번호 계산 (NoticeManagement.tsx와 동일)
  let pageNumbers: (number | 'ellipsis')[] = [];
  if (totalPages <= 5) {
    pageNumbers = Array.from({length: totalPages}, (_, i) => i + 1);
  } else {
    if (currentPage <= 3) {
      pageNumbers = [1, 2, 3, 4, 5];
      if (totalPages > 5) pageNumbers.push('ellipsis', totalPages);
    } else if (currentPage >= totalPages - 2) {
      pageNumbers = [1, 'ellipsis'];
      for (let i = totalPages - 4; i <= totalPages; i++) {
        if (i > 1) pageNumbers.push(i);
      }
    } else {
      pageNumbers = [
        1,
        'ellipsis',
        currentPage - 1,
        currentPage,
        currentPage + 1,
        'ellipsis',
        totalPages,
      ];
    }
  }

  return (
    <section className="relative mb-15 w-full rounded-[20px] bg-white px-[74px] py-[72px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]">
      <h3 className="mb-10 text-center text-2xl font-medium">
        공지사항 / 이벤트
      </h3>
      <ul className="text-lg leading-6 font-medium">
        {pageData.map(item => (
          <li
            key={item.id}
            className="flex h-18 cursor-pointer items-center justify-between"
            onClick={() => setSettingDetailId(item.id)}
          >
            <span>{item.title}</span>
            <ChevronRightIcon className="h-6 w-6" />
          </li>
        ))}
      </ul>
      {/* NoticeManagement.tsx와 동일한 pagination */}
      <div className="mt-10 flex justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  if (currentPage > 1) goToPage(currentPage - 1);
                }}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </PaginationItem>
            {pageNumbers.map((num, idx) =>
              num === 'ellipsis' ? (
                <PaginationItem key={`ellipsis-${idx}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              ) : (
                <PaginationItem key={num}>
                  <PaginationLink
                    href="#"
                    isActive={currentPage === num}
                    onClick={e => {
                      e.preventDefault();
                      goToPage(Number(num));
                    }}
                    className={`${currentPage === num ? 'text-primary' : ''} [&[data-active]]:border-0`}
                  >
                    {num}
                  </PaginationLink>
                </PaginationItem>
              ),
            )}
            <PaginationItem>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  if (currentPage < totalPages) goToPage(currentPage + 1);
                }}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </section>
  );
};

export default EventsList;
