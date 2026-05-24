type PaginationProps = {
  page: number;
  hasNextPage: boolean;
  onPrevPage: () => void;
  onNextPage: () => void;
};

function Pagination({
  page,
  hasNextPage,
  onPrevPage,
  onNextPage,
}: PaginationProps) {
  return (
    <div className="pagination">
      <span
        className={`material-symbols-outlined pagination-icon ${page === 0 ? 'pagination-disabled' : ''}`}
        onClick={onPrevPage}
      >
        arrow_circle_left
      </span>

      <div className="page-number">
        {page + 1}
      </div>

      <span
        className={`material-symbols-outlined pagination-icon ${!hasNextPage ? 'pagination-disabled' : ''}`}
        onClick={onNextPage}
      >
        arrow_circle_right
      </span>
    </div>
  );
}

export default Pagination;