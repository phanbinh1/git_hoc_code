import React from "react";

const Row = ({ tblId, children, ...props }) => {
    return <tr
        {...props}
        tbl-id={tblId}
    >
        {children}
    </tr>
}

export default Row;