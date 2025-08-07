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
    <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 mt-10 text-white">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:brightness-110 disabled:opacity-30 disabled:cursor-not-allowed transition"
      >
        ◀
      </button>

      {/* Page Buttons */}
      <AnimatePresence mode="popLayout">
        {generatePageNumbers().map((page, idx) => {
          const isJump = page === "left-jump" || page === "right-jump";
          const jumpLabel = page === "left-jump" ? "⇤" : "⇥";
          const handleJump = () =>
            onPageChange(
              page === "left-jump" ? Math.max(currentPage - 3, 1) : Math.min(currentPage + 3, totalPages)
            );

          return (
            <motion.button
              key={String(page)}
              onClick={isJump ? handleJump : () => onPageChange(Number(page))}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className={`px-3 py-2 rounded-full transition ${
                isJump
                  ? "bg-[#1f1f1f] text-gray-300 hover:bg-gray-700"
                  : currentPage === page
                  ? "bg-white text-black font-bold"
                  : "bg-[#2a2a2a] text-gray-300 hover:bg-gray-700"
              }`}
            >
              {isJump ? jumpLabel : page}
            </motion.button>
          );
        })}
      </AnimatePresence>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:brightness-110 disabled:opacity-30 disabled:cursor-not-allowed transition"
      >
        ▶
      </button>
    </div>
  );
};

export default Pagination;
