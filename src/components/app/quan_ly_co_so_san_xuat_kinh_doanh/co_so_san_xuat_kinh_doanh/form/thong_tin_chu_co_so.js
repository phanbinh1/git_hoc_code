import React from 'react';
import { CommonFormContent, CommonFieldset } from "./../../../../common";
import { CONST_GIOI_TINH } from "./../../../../../constants/constants";

const ThongTinChuCoSo = () => {
    return (
        <React.Fragment >
            <CommonFieldset title="Thông tin chủ cơ sở">
                <CommonFormContent
                    data={[
                        [ // row 3
                            {
                                col: 4,
                                label: "Tên chủ cơ sở",
                                placeholder: "Tên chủ cơ sở",
                                name: "chuCoSo"
                            },
                            {
                                col: 4,
                                label: "Số CMND / Hộ chiếu",
                                placeholder: "Số CMND / Hộ chiếu",
                                name: "cmnd"
                            },
                            {
                                col: 4,
                                fieldType: "date",
                                label: "Ngày sinh",
                                placeholder: "Ngày sinh",
                                name: "ngaySinh"
                            },
                        ],
                        [
                            {
                                col: 3,
                                fieldType: "select",
                                label: "Giới tính",
                                placeholder: "Giới tính",
                                name: "gioiTinh",
                                options: CONST_GIOI_TINH
                            },
                            {
                                col: 3,
                                label: "Số điện thoại",
                                placeholder: "Số điện thoại",
                                name: "dienThoaiChuCoSo"
                            },
                            {
                                col: 6,
                                fieldType: "textarea",
                                label: "Địa chỉ thường trú",
                                placeholder: "Địa chỉ thường trú",
                                name: "diaChiThuongTru",
                                autoSize: true
                            },
                        ],

                    ]}
                />
            </CommonFieldset>
        </React.Fragment >
    );
}

export default ThongTinChuCoSo;