import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { CommonTable } from "../../../common";
import CoSoQuanHuyenSearch from "./quan_huyen_search";
import * as apiUrl from "../../../../constants/api";
import * as main from "../../../../constants/main";
import ListFilter from "./filter"

const CoSoQuanHuyenList = (props) => {
    const {
        pageKey,
        dataLoading,
        dataSort,
        getAllRequest,
        handleEndLoadData,
        handleStartLoadData,
        onSelectRow,
        isVisiableSearch
    } = props;

    const [maQuanHuyen, setMaQuanHuyen] = useState(null);
    const quan_huyen_list = useSelector(state => state.app.quan_ly_co_so_san_xuat_kinh_doanh.quan_huyen.list);

    const columns = () => {
        return [
            {
                title: 'STT',
                dataIndex: 'stt'
            },
            {
                title: "Tên cơ sở",
                dataIndex: "tenCoSo",
                width: 250
            },
            {
                title: "Số giấy phép DKKD",
                dataIndex: 'soGiayPhepDkkd',
                width: 200
            },
            {
                title: "Số chứng nhận ATTP",
                dataIndex: 'soGiayPhepAttp',
                width: 200
            },
            {
                title: "Xã/Phường",
                dataIndex: 'phuong',
                width: 100
            },
            {
                title: "Địa chỉ cơ sở",
                width: 100,
                render: (_, r) => {
                    return `${r.diaChiCoSo}`
                }
            }

        ];
    };

    const data = () => {
        let result = [];
        quan_huyen_list.map((item) => {
            return result.push({
                ...item,
                key: item.id
            })
        });
        return result;
    };

    const handleGetAllRequest = (data = {}, object = {}) => {
        if (maQuanHuyen) {
            handleStartLoadData();
            let requestSuccess = handleEndLoadData;
            const requestError = handleEndLoadData;
            object = { dataSort: main.parseStringDataSort(dataSort), ...object };
            if (object.hasOwnProperty("requestSuccess") && typeof object.requestSuccess === "function") {
                requestSuccess = () => {
                    object.requestSuccess();
                    handleEndLoadData();
                }
            }
            data = { ...data, maQuanHuyen };
            getAllRequest({
                data,
                requestSuccess,
                requestError
            });
        }
    };

    useEffect(() => {
        maQuanHuyen !== null && handleGetAllRequest();
    }, [maQuanHuyen])

    return (
        <React.Fragment>
            <CommonTable
                hasSelectRow={false}
                filter={<ListFilter
                    quanHuyenSelected={maQuanHuyen ? maQuanHuyen : null}
                    onChange={maQuanHuyen => setMaQuanHuyen(m => m === maQuanHuyen ? null : maQuanHuyen)}
                />}
                columns={columns()}
                dataSource={maQuanHuyen ? data() : []}
                loading={dataLoading}
                bordered={true}
                onChange={handleGetAllRequest}
                pageKey={pageKey}
                onSelectRow={onSelectRow}
                controllerKey={main.encode(apiUrl.API_QUAN_LY_BIEU_MAU)}
                search={{
                    show: isVisiableSearch,
                    component: <CoSoQuanHuyenSearch {...props} maQuanHuyen={maQuanHuyen} />
                }}
            />
        </React.Fragment >
    );
}

export default CoSoQuanHuyenList;