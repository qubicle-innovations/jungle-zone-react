import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import PropTypes from 'prop-types';

const CustomPagination = ({ currentPage, totalPages, onPageChange }) => {
  // Generate an array of page numbers based on totalPages
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <Pagination className="pagination-div">
      {pages.map((page) => (
        <PaginationItem key={page} active={page === currentPage}>
          <PaginationLink onClick={() => onPageChange(page)} href="#">
            {page}
          </PaginationLink>
        </PaginationItem>
      ))}
    </Pagination>
  );
};

CustomPagination.propTypes = {
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  onPageChange: PropTypes.func,
};

export default CustomPagination;
