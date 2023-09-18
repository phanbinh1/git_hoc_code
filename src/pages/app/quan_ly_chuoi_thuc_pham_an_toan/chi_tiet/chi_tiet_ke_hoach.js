import React from 'react';
import ChuoiThucPhamantoanChiTietKeHoach from "./../../../../components/app/quan_ly_chuoi_thuc_pham_an_toan/ke_hoach_tham_dinh/ke_hoach_tham_dinh_chi_tiet";

const HoSoChiTiet = ({ queryVariable, location, history }) => {
    return (
        <React.Fragment>
            <ChuoiThucPhamantoanChiTietKeHoach {...{ queryVariable, location, history }} />
        </React.Fragment>
    );
}

export default HoSoChiTiet;