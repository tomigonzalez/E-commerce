import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const PaginationComponent: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <>
      {totalPages > 0 && (
        <Pagination className="mt-6 sm:mt-8">
          <PaginationContent>
            <PaginationItem
              className={`cursor-pointer ${currentPage === 1 ? "opacity-50 pointer-events-none" : ""}`}
            >
              <PaginationPrevious
                onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
              />
            </PaginationItem>
            <PaginationItem>
              <span className="px-3 sm:px-4 py-2 text-sm sm:text-base">
                Página {currentPage} de {totalPages}
              </span>
            </PaginationItem>
            <PaginationItem
              className={`cursor-pointer ${currentPage === totalPages ? "opacity-50 pointer-events-none" : ""}`}
            >
              <PaginationNext
                onClick={() =>
                  onPageChange(Math.min(currentPage + 1, totalPages))
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
};

export default PaginationComponent;
