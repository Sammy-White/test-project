const Paginate = ({ totalPosts, currentPage, paginate }) => {
  let maxPages = totalPosts;
  let items = [];
  let leftSide = currentPage - 2;
  if (leftSide <= 0) leftSide = 1;
  let rightSide = currentPage + 2;
  if (rightSide > maxPages) rightSide = maxPages;
  for (let number = leftSide; number <= rightSide; number++) {
    items.push(
      <div
        key={number}
        className={
          number === currentPage ? "round-effect active" : "round-effect"
        }
        onClick={() => paginate(number)}
      >
        {number}
      </div>
    );
  }
  const nextPage = () => {
    if (currentPage < maxPages) {
      paginate(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1);
    }
  };

  const paginationRender = (
    <div className="flex-container">
      <div className="paginate-ctn">
        <div className="round-effect" onClick={prevPage}>
          {" "}
          &lsaquo;{" "}
        </div>
        {items}
        <div className="round-effect" onClick={nextPage}>
          {" "}
          &rsaquo;{" "}
        </div>
      </div>
    </div>
  );
  return paginationRender;
};
export default Paginate;