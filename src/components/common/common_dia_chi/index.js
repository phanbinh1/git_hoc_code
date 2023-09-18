import React, { Fragment } from "react";

const CommonDiaChi = ({
    tinhThanh,
    quanHuyen,
    xaPhuong,
    children
}) => {
    return <Fragment>
        {children} {xaPhuong && xaPhuong.ten ? ` - ${xaPhuong.ten}` : ""} {quanHuyen && quanHuyen.ten ? ` - ${quanHuyen.ten}` : ""} {tinhThanh && tinhThanh.ten ? ` - ${tinhThanh.ten}` : ""}
    </Fragment>
}

export default CommonDiaChi;