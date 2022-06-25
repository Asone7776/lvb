import React, { useState,useEffect } from "react";
import ReactPaginate from 'react-paginate';
const OrdersPagination = ({items,last_page}) => {
    const itemsPerPage = 1;
    const [currentItems, setCurrentItems] = useState(null);
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        // Fetch items from another resources.
        const endOffset = itemOffset + itemsPerPage;
        // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        console.log(endOffset);
    }, [itemOffset, itemsPerPage]);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };

    return (
        <ReactPaginate
            breakLabel="..."
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={last_page}
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