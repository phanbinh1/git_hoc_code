import React, { Fragment } from "react";

/**
 * 
 * @param {*} param0 
 * viewType = "NAM/NU" | "ONG/BA"
 */
const gioiTinhDefined = {
    "NAM": {
        "ONG/BA": "Ông",
        "NAM/NU": "Nam"
    },
    "NU": {
        "ONG/BA": "Bà",
        "NAM/NU": "Nữ"
    },
}
const CommonGioiTinh = ({ gioiTinh, viewType = "NAM/NU" }) => {
    return <Fragment>{(gioiTinhDefined[gioiTinh] && (gioiTinhDefined[gioiTinh][viewType] || gioiTinhDefined[gioiTinh]["NAM/NU"])) || "Khác"}</Fragment>
}

export default CommonGioiTinh;