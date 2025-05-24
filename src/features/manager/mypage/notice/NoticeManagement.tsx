import {useMemo, useState} from 'react';
import {ChevronLeft, ChevronRight} from 'lucide-react';

import {Button} from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {MyPageNoticeStatus} from './MypageNotice';

// 데이터 타입 정의
interface DataItem {
  id: number;
  title: string;
  group: string;
  date: string;
}

// 모킹 데이터 생성
const mockData: DataItem[] = [
  {id: 1, title: '팀 활동 안내', group: '팀 A', date: '2025.05.06'},
  {id: 2, title: '클라우드 서비스 안내', group: '팀 B', date: '2025.05.04'},
  {id: 3, title: '클라우드 서비스 안내', group: '팀 B', date: '2025.05.04'},
  {id: 4, title: '클라우드 서비스 안내', group: '팀 B', date: '2025.05.04'},
  {id: 5, title: '개발자 세미나 공지', group: '팀 C', date: '2025.05.07'},
  {id: 6, title: '신규 프로젝트 소개', group: '팀 A', date: '2025.05.08'},
  {id: 7, title: '서버 점검 안내', group: '팀 C', date: '2025.05.03'},
  {id: 8, title: '회의 일정 공유', group: '팀 A', date: '2025.05.05'},
];

interface NoticeManagementProps {
  setMyPageNoticeStatus: (status: MyPageNoticeStatus) => void;
}

const NoticeManagement = ({setMyPageNoticeStatus}: NoticeManagementProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGroup, setSelectedGroup] = useState<string>('전체');
  const itemsPerPage = 4;

  // 유니크 그룹 목록 추출
  const uniqueGroups = useMemo(() => {
    const groups = Array.from(new Set(mockData.map(item => item.group)));
    return ['전체', ...groups];
  }, []);

  // 필터링된 데이터
  const filteredData = useMemo(() => {
    if (selectedGroup === '전체') {
      return mockData;
    }
    return mockData.filter(item => item.group === selectedGroup);
  }, [selectedGroup]);

  // 페이지네이션 데이터
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage]);

  // 총 페이지 수
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // 페이지 이동 함수
  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const changeStatusToNotice = () => {
    setMyPageNoticeStatus('NOTICE_CREATE');
  };

  return (
    <section className="mb-15 w-full rounded-[20px] bg-white px-[74px] py-[72px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]">
      <h3 className="mb-10 text-center text-2xl font-medium">
        내 공지사항 관리
      </h3>

      <div className="mb-4 flex justify-end">
        <Select value={selectedGroup} onValueChange={setSelectedGroup}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="전체" />
          </SelectTrigger>
          <SelectContent>
            {uniqueGroups.map(group => (
              <SelectItem key={group} value={group}>
                {group}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Table>
        <TableHeader className="bg-gray-2 mb-[13px] h-[52px]">
          <TableRow className="border-none">
            <TableHead className="w-[492px] pl-5 text-[18px] font-medium">
              제목
            </TableHead>
            <TableHead className="w-[220px] text-center text-[18px] font-medium">
              그룹
            </TableHead>
            <TableHead className="w-[220px] text-center text-[18px] font-medium">
              작성일
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map(item => (
            <TableRow key={item.id} className="h-[58px] border-none">
              <TableCell
                className="cursor-pointer text-left text-[18px]"
                onClick={() => setMyPageNoticeStatus('NOTICE_DETAIL')}
              >
                {item.title}
              </TableCell>
              <TableCell className="text-center text-[18px]">
                {item.group}
              </TableCell>
              <TableCell className="text-center text-[18px]">
                {item.date}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="my-[62px] flex justify-center">
        <Button
          onClick={changeStatusToNotice}
          className="bg-gray-2 text-gray-dark hover:bg-gray-3 h-14 w-[220px] rounded-md px-10 py-5 text-xl leading-7 font-medium"
        >
          새로 작성
        </Button>
      </div>

      <div className="mt-auto flex justify-center">
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

            {Array.from({length: Math.min(5, totalPages)}).map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === i + 1}
                  onClick={e => {
                    e.preventDefault();
                    goToPage(i + 1);
                  }}
                  className={`${currentPage === i + 1 ? 'text-primary' : ''} [&[data-active]]:border-0`}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            {totalPages > 5 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
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

export default NoticeManagement;
