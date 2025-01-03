import { Button } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="bg-white border-gray-200 text-gray-600 hover:cursor-pointer"
      >
        <ChevronLeftIcon className="h-4 w-4" />
      </Button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
        if (
          page === 1 ||
          page === totalPages ||
          (page >= currentPage - 2 && page <= currentPage + 2)
        ) {
          return (
            <Button
              key={page}
              variant={page === currentPage ? "default" : "outline"}
              size="sm"
              onClick={() => handlePageChange(page)}
              className={`bg-white border-gray-200 text-gray-600 ${
                page === currentPage ? "bg-primary text-white" : ""
              }`}
            >
              {page}
            </Button>
          );
        } else if (page === currentPage - 3 || page === currentPage + 3) {
          return <span key={page}>...</span>;
        }
        return null;
      })}
      <Button
        variant="outline"
        size="sm"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="bg-white border-gray-200 text-gray-600"
      >
        <ChevronRightIcon className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default Pagination;
