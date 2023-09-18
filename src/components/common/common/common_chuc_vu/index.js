import React, { Fragment } from "react";
import { CONST_CHUC_VU } from "../../../constants/constants";

const CommonChucVu = ({ chucVu }) => {
    return <Fragment>
        {CONST_CHUC_VU.render(chucVu)}
    </Fragment>
}

export default CommonChucVu;