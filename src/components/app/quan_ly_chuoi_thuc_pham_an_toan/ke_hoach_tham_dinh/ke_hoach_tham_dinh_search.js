import AbortController from "abort-controller";
import React, { useEffect } from 'react';
import { CommonForm } from "./../../../common";
import * as constants from "./../../../../constants/constants";
import * as main from "./../../../../constants/main";
import * as formName from "./../../../../constants/form_name";

const KeHoachThamDinhSearch = ({
    getAllRequest,
    handleStartLoadData,
    handleChangeDataSearch,
    dataSort,
    handleEndLoadData,
    onSelectRow
}) => {
    useEffect(() => {
        const controller = new AbortController();
        return () => controller.abort();
    }, [])

    const handleSubmit = (values) => {
        handleStartLoadData();
        var data = {};
        if (values.nam) {
            data.nam = values.nam;
        }
        if (values.tenKeHoachThamDinh && values.tenKeHoachThamDinh.trim() !== "") {
            data.tenKeHoachThamDinh = values.tenKeHoachThamDinh;
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
    };

    return (
        <React.Fragment>
            <CommonForm
                data={[
                    [//row
                        {
                            col: 12,
                            label: "Năm",
                            placeholder: "Năm",
                            name: "nam",
                            fieldType: "year"
                        },
                    ],
                    [//row
                        {
                            col: 12,
                            label: "Tên kế hoạch thẩm định",
                            placeholder: "Tên kế hoạch thẩm định",
                            name: "tenKeHoachThamDinh"
                        },
                    ],
                ]}
                actions={[
                    {
                        htmlType: constants.FORM_HTML_TYPE_SUBMIT,
                        label: "Tìm kiếm",
                        icon: "fa fa-search",
                    }
                ]}
                onSubmit={handleSubmit}
                form={formName.FORM_NAME_KE_HOACH_THAM_DINH_CTPAT_SEARCH}
            />
        </React.Fragment>
    );
}
export default KeHoachThamDinhSearch;