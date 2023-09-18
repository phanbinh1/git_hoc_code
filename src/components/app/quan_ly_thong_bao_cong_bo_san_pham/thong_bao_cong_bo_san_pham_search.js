import React, { } from 'react';
import { CommonForm } from "./../../common";
import * as constants from "./../../../constants/constants";
import * as main from "./../../../constants/main";
import * as formName from "./../../../constants/form_name";
import { useSelector } from 'react-redux';

const HoSoTuCongBoSearch = ({
    getAllRequest,
    handleStartLoadData,
    handleChangeDataSearch,
    dataSort,
    handleEndLoadData,
    onSelectRow,
}) => {
    const account_current = useSelector(state => state.core.account_current);

    const handleSubmit = (values) => {

        const { regency } = account_current;
        const { CONST_CHUC_VU } = constants;
        const { CHUYENVIEN, PHOTRUONGPHONG, TRUONGPHONG, TRUONGBAN } = CONST_CHUC_VU;
        let listTrangThaiChuyenThongBao = "";
        switch (regency) {
            case CHUYENVIEN:
                listTrangThaiChuyenThongBao = `${CHUYENVIEN},${PHOTRUONGPHONG},${TRUONGPHONG},${TRUONGBAN}`;
                break;
            case PHOTRUONGPHONG:
                listTrangThaiChuyenThongBao = `${PHOTRUONGPHONG},${TRUONGPHONG},${TRUONGBAN}`;
                break;
            case TRUONGPHONG:
                listTrangThaiChuyenThongBao = `${TRUONGPHONG},${TRUONGBAN}`;
                break;
            case TRUONGBAN:
                listTrangThaiChuyenThongBao = `${TRUONGBAN}`;
                break;
            default:
                break;
        }
        handleStartLoadData();
        var data = { listTrangThaiChuyenThongBao };
        if (values.thoiGian) {
            if (values.thoiGian.from) {
                data.tuNgayThongBao = values.thoiGian.from;
            }
            if (values.thoiGian.to) {
                data.denNgayThongBao = values.thoiGian.to;
            }
        }
        if (values.soThongBao && values.soThongBao.trim() !== "") {
            data.soThongBao = values.soThongBao;
        }

        if (values.tieuDe && values.tieuDe.trim() !== "") {
            data.tieuDe = values.tieuDe;
        }
        handleChangeDataSearch(data);
        data = {
            searchData: main.parseObjectToParams(data),
            sortData: main.parseStringDataSort(dataSort),
            currentPage: 1
        };
        getAllRequest({
            data,
            requestSuccess: () => {
                handleEndLoadData();
                onSelectRow();
            },
            requestError: handleEndLoadData
        });
    }
    return (
        <React.Fragment>
            <CommonForm
                data={[
                    [//row
                        {
                            col: 12,
                            label: "Số thông báo",
                            placeholder: "Số thông báo",
                            name: "soThongBao",
                        },
                    ],
                    [//row
                        {
                            col: 12,
                            label: "Tiêu đề",
                            placeholder: "Tiêu đề",
                            name: "tieuDe",
                            fieldType: "textarea",
                            autoSize: true
                        },
                    ],
                    [//row
                        {
                            col: 12,
                            label: "Thời gian",
                            placeholder: "Thời gian",
                            name: "thoiGian",
                            fieldType: "dateRange",
                        }
                    ]
                ]}
                actions={[
                    {
                        htmlType: constants.FORM_HTML_TYPE_SUBMIT,
                        label: "Tìm kiếm",
                        icon: "fa fa-search"
                    }
                ]}
                onSubmit={handleSubmit}
                form={formName.FORM_NAME_THONG_BAO_HO_SO_TU_CONG_BO_SEARCH}
            />
        </React.Fragment >
    );
}

export default HoSoTuCongBoSearch;