import { useCallback, useState } from "react";

function usePagination(allProducts, cardPerPage) {
  const [page, setPage] = useState(1);

  const maxPage = Math.ceil(allProducts.length / cardPerPage);

  function pageProducts() {
    const indexOfFirstCard = (page - 1) * cardPerPage;
    const indexOfLastCard = indexOfFirstCard + cardPerPage;

    return allProducts.slice(indexOfFirstCard, indexOfLastCard);
  }

  const jumpPage = useCallback(
    (page) => {
      const pageNumber = Math.max(1, page);
      setPage(Math.min(pageNumber, maxPage));
    },
    [maxPage]
  );

  return { jumpPage, pageProducts, page, maxPage };
}

export default usePagination;
