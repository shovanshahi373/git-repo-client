import { useState, useEffect, useMemo } from "react";

const MAX_LABELS = 7;

const usePagination = (totalItems, initialPage, size = 8) => {
  const [page, setPage] = useState(initialPage);
  const [labels, setLabels] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [hasMoreLeft, setHasMoreLeft] = useState(false);
  const [hasMoreRight, setHasMoreRight] = useState(false);

  const updatePage = (n) => setPage(n);

  useEffect(() => {
    setTotalPages(Math.ceil(totalItems / size));
  }, [totalItems]);

  const buildChapters = (p1 = 1, p2 = totalPages, pageArr = [p1, p2]) => {
    if (p1 === p2) return pageArr;
    if (pageArr.length >= MAX_LABELS + 5) return pageArr;
    const newPage = ((p1 + p2) / 2) | 0;
    pageArr.push(newPage);
    buildChapters(p1, newPage, pageArr);
    buildChapters(newPage, p2, pageArr);
    return pageArr;
  };

  const chapters = useMemo(() => buildChapters(), [totalPages]);

  const trimLabels = (lbs = []) => {
    if (lbs.length > MAX_LABELS) {
      const index = lbs.indexOf(page);
      if (index > lbs.length / 2) {
        lbs = lbs.splice(-MAX_LABELS);
        setHasMoreLeft(true);
        setHasMoreRight(false);
      } else {
        lbs = lbs.splice(0, MAX_LABELS);
        setHasMoreRight(true);
        setHasMoreLeft(false);
      }
    }
    return lbs;
  };

  const getLabels = () => {
    const formattedChapters = [
      ...new Set([
        ...chapters,
        page,
        Math.min(page + 1, totalPages),
        Math.max(page - 1, 1),
      ]),
    ].sort((a, b) => a - b);
    const trimmedChapters = trimLabels(formattedChapters);
    return setLabels(trimmedChapters);
  };

  useEffect(() => {
    getLabels();
  }, [totalPages, page]);

  return {
    labels,
    totalPages,
    hasMoreLeft,
    hasMoreRight,
    page,
    updatePage,
  };
};

export default usePagination;
