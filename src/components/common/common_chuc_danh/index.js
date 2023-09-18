import React, { Fragment } from "react";
import { CONST_CHUC_DANH_DOAN_THAM_DINH } from "../../../constants/constants";

const CommonChucDanh = ({ chucDanh }) => {
    return <Fragment>
        {CONST_CHUC_DANH_DOAN_THAM_DINH.render(chucDanh)}
    </Fragment>
}

export default CommonChucDanh;