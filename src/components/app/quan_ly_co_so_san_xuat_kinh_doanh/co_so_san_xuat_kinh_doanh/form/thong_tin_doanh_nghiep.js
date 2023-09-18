import React from 'react';
import { CommonFormContent, CommonFieldset } from "./../../../../common";

const ThongTinDoanhNghiep = () => {
    return (
        <React.Fragment >
            <CommonFieldset title="Thông tin doanh nghiệp">
                <CommonFormContent
                    data={[
                        [ // row 3
                            {
                                col: 6,
                                label: "Tên doanh nghiệp",
                                placeholder: "Tên doanh nghiệp",
                                name: "tenDangKyKinhDoanh"
                            },
                            {
                                col: 3,
                                label: "Số giấy phép ĐKKD",
                                placeholder: "Số giấy phép ĐKKD",
                                name: "soGiayPhepDkkd"
                            },
                            {
                                col: 3,
                                fieldType: "date",
                                label: "Ngày cấp giấy phép ĐKKD",
                                placeholder: "Ngày cấp giấy phép ĐKKD",
                                name: "ngayCapGiayPhepDkkd"
                            },
                        ],
                        [
                            {
                                col: 4,
                                fieldType: "date",
                                label: "Ngày thành lập",
                                placeholder: "Ngày thành lập",
                                name: "ngayThanhLap"
                            },
                            {
                                col: 8,
                                fieldType: "textarea",
                                label: "Địa chỉ",
                                placeholder: "Địa chỉ",
                                name: "diaChiTruSo",
                                autoSize: true
                            },
                        ],
                    ]}
                />
            </CommonFieldset>
        </React.Fragment >
    );
}

export default ThongTinDoanhNghiep;