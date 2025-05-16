import LayoutMo from '@/layouts/LayoutMo';

interface ResultHistoryPageProps {
  onClose: () => void;
}

const ResultHistoryPage = ({onClose}: ResultHistoryPageProps) => {
  return (
    <LayoutMo
      hasHeader={true}
      text="테스트 히스토리"
      onClickBack={onClose}
      bgColor="white"
    >
      <div>
        <p>검색 기록</p>
        <p>검색 기록</p>
        <p>검색 기록</p>
        <p>검색 기록</p>
      </div>
    </LayoutMo>
  );
};

export default ResultHistoryPage;
