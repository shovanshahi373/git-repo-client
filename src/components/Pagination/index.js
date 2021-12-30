import React from "react";
import usePagination from "../../hooks/usePagination";

const Pagination = ({ totalItems, initialPage, onPageChange }) => {
  const { labels, page, updatePage } = usePagination(totalItems, initialPage);
  const handlePageChange = (n) => {
    updatePage(n);
    onPageChange(n);
  };
  return (
    <div className="flex justify-center mt-8">
      {labels.map((label) => (
        <span
          key={label}
          onClick={() => handlePageChange(label)}
          className={`${
            page === label ? "bg-gray-400" : "bg-blue-400"
          } m-4 flex-initial text-white p-4 m-2 d-inline-block`}
        >
          {label}
        </span>
      ))}
    </div>
  );
};

export default Pagination;
