import React from 'react'


const Pagination = ({currentPage, handlePaginationClick, totalPages}) => {
  return (
    <div className="d-flex justify-content-end mt-3">
    <nav aria-label="Page navigation example">
      <ul className="pagination gap-2">
        {currentPage > 1 && (
          <li className="page-item">
            <button
              className="page-link btn-primary"
              onClick={() => handlePaginationClick(currentPage - 1)} 
            >
              Previous
            </button>
          </li>
        )}
        {Array.from({ length: totalPages }).map((_, index) => {
          if (
            index === 0 ||
            index === totalPages - 1 ||
            (index >= currentPage - 2 && index <= currentPage)
          ) {
            return (
              <li
                key={index}
                className={`page-item  ${index + 1 === currentPage ? 'active' : ''}`}
              >
                <button
                  className="page-link btn-danger "
                  onClick={() => handlePaginationClick(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            )
          } else if (index === 1 || index === totalPages - 2) {
            return (
              <li key={index} className="page-item disabled">
                <button className="page-link ">...</button>
              </li>
            )
          }
        })}
        {currentPage < totalPages && (
          <li className="page-item">
            <button
              className="page-link btn-primary"
              onClick={() => handlePaginationClick(currentPage + 1)}
            >
              Next
            </button>
          </li>
        )}
      </ul>
    </nav>
  </div>
  )
}

export default Pagination
