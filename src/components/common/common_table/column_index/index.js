import React, { Fragment } from "react";

const ColumnIndex = ({ index, isPagination, currentPage, pageSize }) => {

    return <Fragment>
        {isPagination !== false ? (currentPage - 1) * pageSize + index + 1 : index + 1}
    </Fragment>
}

export default ColumnIndex;