const Pagination = ({
  currentPage,
  totalPages,
  setCurrentPage,
}) => {
  return (
    <div className="flex justify-center gap-2 mt-8">

      <button
        disabled={currentPage === 1}
        onClick={() =>
          setCurrentPage(currentPage - 1)
        }
      >
        Prev
      </button>

      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i}
          className={`px-3 py-1 border border-gray-300 ${
            currentPage === i + 1
              ? "bg-blue-500 text-white"
              : ""
          }`}
          onClick={() =>
            setCurrentPage(i + 1)
          }
        >
          {i + 1}
        </button>
      ))}

      <button
        disabled={
          currentPage === totalPages
        }
        onClick={() =>
          setCurrentPage(currentPage + 1)
        }
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;