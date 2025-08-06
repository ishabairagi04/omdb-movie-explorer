import { motion, AnimatePresence } from "framer-motion";

type Props = {
  currentPage: number;
  totalResults: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({ currentPage, totalResults, onPageChange }: Props) => {
  const totalPages = Math.ceil(totalResults / 10);

  const generatePageNumbers = () => {
    const pages: (number | "left-jump" | "right-jump")[] = [];

    if (totalPages <= 6) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "right-jump", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "left-jump", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "left-jump", currentPage - 1, currentPage, currentPage + 1, "right-jump", totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 mt-10 text-white">
      {/* Prev */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed rounded"
      >
        ◀
      </button>

      {/* Page Buttons with Animation */}
      <AnimatePresence mode="popLayout">
        {generatePageNumbers().map((page, idx) => {
          if (page === "left-jump") {
            return (
              <motion.button
                key="left-jump"
                onClick={() => onPageChange(Math.max(currentPage - 3, 1))}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="px-3 py-2 bg-gray-700 text-gray-200 hover:bg-gray-600 rounded"
              >
                ⇤
              </motion.button>
            );
          }

          if (page === "right-jump") {
            return (
              <motion.button
                key="right-jump"
                onClick={() => onPageChange(Math.min(currentPage + 3, totalPages))}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="px-3 py-2 bg-gray-700 text-gray-200 hover:bg-gray-600 rounded"
              >
                ⇥
              </motion.button>
            );
          }

          return (
            <motion.button
              key={page}
              onClick={() => onPageChange(Number(page))}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className={`px-3 py-2 rounded ${
                currentPage === page
                  ? "bg-white text-black font-bold"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              } transition`}
            >
              {page}
            </motion.button>
          );
        })}
      </AnimatePresence>

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed rounded"
      >
        ▶
      </button>
    </div>
  );
};

export default Pagination;
