import React from "react";
import PropTypes from "prop-types";

function Pagination({ paginationInfo }) {
    console.log(paginationInfo);
    return (
        <div />
    )
}

Pagination.propTypes= {
    paginationInfo: PropTypes.object.isRequired,
}

export default Pagination;
