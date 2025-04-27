import React from "react";
import "./Pagination.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Hàm tạo mảng các số trang để hiển thị
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5; // Số trang tối đa hiển thị

    // Nếu tổng số trang nhỏ hơn hoặc bằng số trang tối đa hiển thị
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Nếu trang hiện tại gần đầu
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
      // Nếu trang hiện tại gần cuối
      else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      }
      // Nếu trang hiện tại ở giữa
      else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="pagination">
      {/* Nút trang trước */}
      <button
        className={`paginationButton ${currentPage === 1 ? "disabled" : ""}`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Trước
      </button>

      {/* Danh sách các trang */}
      {getPageNumbers().map((page, index) => (
        <button
          key={index}
          className={`paginationButton ${
            page === currentPage ? "active" : ""
          } ${page === "..." ? "ellipsis" : ""}`}
          onClick={() => typeof page === "number" && onPageChange(page)}
          disabled={page === "..."}
        >
          {page}
        </button>
      ))}

      {/* Nút trang sau */}
      <button
        className={`paginationButton ${
          currentPage === totalPages ? "disabled" : ""
        }`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Sau
      </button>
    </div>
  );
};

export default Pagination; 