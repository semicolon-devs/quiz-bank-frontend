import React, { useState } from "react";

// import { ReactComponent as ChevronLeftArrowIcon } from "../../../assets/icons/chevronLeftArrow.svg"
// import { ReactComponent as ChevronRightArrowIcon } from "../../../assets/icons/chevronRightArrow.svg"

import { ChevronLeftIcon, ChevronRightIcon } from "../icons";

type Props = {
  numberOfPages: number;
  pageNumber: number;
  setPageNumber: (pageNumber: number) => void;
};

const PaginationComponent = ({
  numberOfPages,
  pageNumber,
  setPageNumber,
}: Props) => {
  const next = () => {
    if (pageNumber === numberOfPages) return;

    setPageNumber(pageNumber + 1);
  };

  const prev = () => {
    if (pageNumber === 1) return;

    setPageNumber(pageNumber - 1);
  };

  return (
    <div className="flex items-center gap-4 rounded-xl bg-white p-2 shadow">
      <button
        className="flex items-center gap-2 hover:bg-blue-50 h-8 w-8 justify-center rounded"
        onClick={prev}
        disabled={pageNumber === 1}
      >
        <ChevronLeftIcon classes={"h-6 w-6 text-blue-600"} />
      </button>
      <div className="flex items-center gap-2">
        {Array.from({ length: numberOfPages }, (_, i) => (
          <button
            className={`p-2 w-8 rounded h-8 flex items-center justify-center ${
              pageNumber === i + 1
                ? "bg-blue-600 hover:bg-blue-500"
                : "bg-invisible hover:bg-blue-50"
            }`}
            onClick={() => setPageNumber(i + 1)}
            key={i}
          >
            <p
              className={`text-sm font-medium ${
                pageNumber === i + 1 ? "text-white" : " text-blue-600"
              }`}
            >
              {i + 1}
            </p>
          </button>
        ))}
      </div>

      <button
        className="flex items-center gap-2 hover:bg-blue-50 h-8 w-8 justify-center rounded"
        onClick={next}
        disabled={pageNumber === 5}
      >
        <ChevronRightIcon classes="w-6 h-6 text-blue-600" />
      </button>
    </div>
  );
};

export default PaginationComponent;
