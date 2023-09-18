import React, { } from 'react';
import { CommonForm, } from "../../../common";
import * as constants from "../../../../constants/constants";
import * as main from "../../../../constants/main";
import * as formName from "../../../../constants/form_name";
import { message } from 'antd';

const CoSoQuanHuyenSearch = ({
    getAllRequest,
    handleStartLoadData,
    handleChangeDataSearch,
    dataSort,
    handleEndLoadData,
    onSelectRow,
    maQuanHuyen
}) => {
    const handleSubmit = (values) => {
        if (!maQuanHuyen) {
            message.warning("Vui lòng chọn Quận/Huyện");
            return;
        }
        handleStartLoadData();
        var data = {};
        if (values.tenCoSo && values.tenCoSo.trim() !== "") {
            data.tenCoSo = values.tenCoSo;
        }
        if (values.tenChu && values.tenChu.trim() !== "") {
            data.tenChu = values.tenChu;
        }
        if (values.soDienThoai && values.soDienThoai.trim() !== "") {
            data.soDienThoai = values.soDienThoai;
        }
        if (values.soCmndChu && values.soCmndChu.trim() !== "") {
            data.soCmndChu = values.soCmndChu;
        }
        if (values.soGiayPhepDkkd && values.soGiayPhepDkkd.trim() !== "") {
            data.soGiayPhepDkkd = values.soGiayPhepDkkd;
        }
        if (values.soChungNhanVsAttp && values.soChungNhanVsAttp.trim() !== "") {
            data.soChungNhanVsAttp = values.soChungNhanVsAttp;
        }
        if (values.socapchungnhanvsattp && values.socapchungnhanvsattp.trim() !== "") {
            data.socapchungnhanvsattp = values.socapchungnhanvsattp;
        }
        if (values.namcapchungnhanvsattp) {
            data.namcapchungnhanvsattp = values.namcapchungnhanvsattp;
        }

        handleChangeDataSearch(data);
        data = {
            maQuanHuyen,
            searchData: main.parseObjectToParams(data),
            // sortData: main.parseStringDataSort(dataSort),
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
    };

    return (
        <React.Fragment >
            <CommonForm
                data={[
                    [//row 3
                        {
                            col: 12,
                            label: "Tên cơ sở",
                            placeholder: "Tên cơ sở",
                            name: "tenCoSo"
                        },
                        {
                            col: 12,
                            label: "Tên chủ cơ sở",
                            placeholder: "Tên chủ cơ sở",
                            name: "tenChu"
                        },
                        {
                            col: 12,
                            label: "Số điện thoại",
                            placeholder: "Số điện thoại",
                            name: "soDienThoai"
                        },
                        {
                            col: 12,
                            label: "Số CMND",
                            placeholder: "Số CMND",
                            name: "soCmndChu"
                        },
                        {
                            col: 12,
                            label: "Số giấy phép ĐKKD",
                            placeholder: "Số giấy phép ĐKKD",
                            name: "soGiayPhepDkkd"
                        },
                        {
                            col: 12,
                            label: "Số chứng nhận ATTP",
                            placeholder: "Số chứng nhận ATTP",
                            name: "soChungNhanVsAttp"
                        },
                        {
                            col: 12,
                            label: "Số cấp chứng nhận ATTP",
                            placeholder: "Số cấp chứng nhận ATTP",
                            name: "socapchungnhanvsattp"
                        },
                        {
                            col: 12,
                            label: "Năm cấp chứng nhận ATTP",
                            placeholder: "Năm cấp chứng nhận ATTP",
                            name: "namcapchungnhanvsattp",
                            fieldType: "year"
                        },
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
                form={formName.FORM_NAME_QUAN_LY_BIEU_MAU_SEARCH}
            />
        </React.Fragment >
    );
}

export default CoSoQuanHuyenSearch;