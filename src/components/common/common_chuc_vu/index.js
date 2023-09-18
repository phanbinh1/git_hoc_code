import React, { Fragment } from "react";
import { CONST_CHUC_VU } from "../../../constants/constants";

const CommonChucVu = ({ chucVu, pristine = false }) => {
    const cv = CONST_CHUC_VU.render(chucVu);
    return <Fragment>
        {cv ? cv : (pristine ? chucVu : "")}
    </Fragment>
}

export default CommonChucVu;