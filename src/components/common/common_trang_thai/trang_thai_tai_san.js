import React from "react";
import { Tag } from "antd";
import { CONST_TRANG_THAI_TAI_SAN, CONST_TRANG_THAI_THANH_LY_TAI_SAN } from "./../../../constants/constants";

const CommonTrangThaiTaiSan = ({ trangThai, thanhLy }) => {
    const _trangThai = thanhLy ? CONST_TRANG_THAI_THANH_LY_TAI_SAN.render(trangThai) : CONST_TRANG_THAI_TAI_SAN.render(trangThai);
    return _trangThai ? <Tag color={_trangThai.color}>{_trangThai.label.toLocaleUpperCase()}</Tag> : null;
}


export default CommonTrangThaiTaiSan;