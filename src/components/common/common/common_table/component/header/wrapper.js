import React from "react";

const Wrapper = ({ tblId, ...props }) => {
    return <thead
        {...props}
        tbl-id={tblId}
    />
}

export default Wrapper;