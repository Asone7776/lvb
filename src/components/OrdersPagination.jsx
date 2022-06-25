import React from "react";
import ReactPaginate from 'react-paginate';
const OrdersPagination = ({ last_page, onFilterChange, initialPage }) => {

    const handlePageClick = (event) => {
        onFilterChange('page', event.selected + 1)
    };

    return (
        <ReactPaginate
            breakLabel="..."
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            forcePage={initialPage - 1}
            pageCount={last_page ? last_page : 0}
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousLinkClassName="page-link"
            nextLinkClassName="page-link"
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            previousClassName='d-none'
            nextClassName='d-none'
            renderOnZeroPageCount={null}
        />
    );
}

export default OrdersPagination;