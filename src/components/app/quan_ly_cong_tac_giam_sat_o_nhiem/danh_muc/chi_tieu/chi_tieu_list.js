import React, { } from 'react';
import { useSelector } from 'react-redux';
import { CommonTable, CommonTableAction } from "../../../../common";
import * as actID from "../../../../../constants/action_id";
import * as apiUrl from "../../../../../constants/api";
import * as main from "../../../../../constants/main";
import ChiTieuSearch from "./chi_tieu_search";
const ChiTieuList = (props) => {

    const {
        pageKey,
        dataLoading,
        dataSort,
        handleChangeDataSort,
        handleEdit,
        handleDelete,
        getAllRequest,
        handleEndLoadData,
        handleStartLoadData,
        dataSearch,
        onSelectRow,
        showAction,
        hasRowFake,
        selectedRowKeys,
        paginationPlacement,
        isVisiableSearch
    } = props;

    const chi_tieu_list = useSelector(state => state.app.quan_ly_cong_tac_giam_sat_o_nhiem.chi_tieu.list);

    const onChangeDataSort = (key) => {
        let dataSortChange = [];
        let sortMax = Math.max.apply(Math, dataSort.map((val) => { return val.sort; }));
        dataSort.map((item) => {
            if (item.key === key) {
                item.value = !item.value;
                item.sort = sortMax === item.sort ? sortMax : sortMax + 1;
            }
            return dataSortChange.push(item);
        })
        handleGetAllRequest({}, {
            dataSort: main.parseStringDataSort(dataSortChange),
            requestSuccess: () => { handleChangeDataSort(dataSortChange) }
        });
    };

    const columns = () => {
        let maSort = "asc", tenSort = "asc";
        dataSort.map((item) => {
            if (item.key === "maChiTieu" && !item.value) { maSort = "desc"; }
            if (item.key === "tenChiTieu" && !item.value) { tenSort = "desc"; }
            return item;
        })
        return [
            {
                title: 'STT',
                dataIndex: 'stt'
            },
            {
                title: <div onClick={() => onChangeDataSort("maChiTieu")} >
                    <span> Mã chỉ tiêu </span>
                    <i className={`fa fa-sort-amount-${maSort}`} />
                </div >,
                dataIndex: "maChiTieu",
                width: 300
            },
            {
                title: <div onClick={() => onChangeDataSort("tenChiTieu")} >
                    <span> Tên chỉ tiêu </span>
                    <i className={`fa fa-sort-amount-${tenSort}`} />
                </div >,
                dataIndex: 'tenChiTieu',
                width: 400
            },
            ...(showAction !== false ? [{
                title: 'Thao tác',
                dataIndex: 'actions',
                align: "center",
                fixed: "right",
                width: 140
            }] : [])
        ];
    };

    const data = () => {
        let result = [];
        chi_tieu_list.map((item) => {
            return result.push({
                ...item,
                key: item.id,
                actions: renderAction(item)
            })
        });
        return result;
    };

    const renderAction = (chi_tieu) => {
        return <React.Fragment>
            <CommonTableAction
                actions={[
                    {
                        idChucNang: actID.ACT_ID_QLDM_CHI_TIEU.ACT_DELETE,
                        confirm: true,
                        confirmLabel: "Bạn chắc chắn muốn xóa?",
                        onClick: () => handleDelete(false, chi_tieu.id),
                        type: "danger"
                    },
                    {
                        idChucNang: actID.ACT_ID_QLDM_CHI_TIEU.ACT_UPDATE,
                        onClick: () => handleEdit(chi_tieu.id),
                        type: "success"
                    }
                ]}
            />
        </React.Fragment>
    };

    const handleGetAllRequest = (data = {}, object = {}) => {
        handleStartLoadData();
        let requestSuccess = handleEndLoadData;
        const requestError = handleEndLoadData;
        object = { dataSort: main.parseStringDataSort(dataSort), ...object };
        let dataSortStr = "";
        if (object.hasOwnProperty("dataSort") && typeof object.dataSort === "string") {
            dataSortStr = object.dataSort;
        }
        if (object.hasOwnProperty("requestSuccess") && typeof object.requestSuccess === "function") {
            requestSuccess = () => {
                object.requestSuccess();
                handleEndLoadData();
            }
        }
        data = { ...data, searchData: main.parseObjectToParams(dataSearch), sortData: dataSortStr };
        getAllRequest({
            data,
            requestSuccess,
            requestError
        });
    };

    return (
        <React.Fragment>
            <CommonTable
                columns={columns()}
                dataSource={data()}
                loading={dataLoading}
                bordered={true}
                onChange={handleGetAllRequest}
                pageKey={pageKey}
                onSelectRow={onSelectRow}
                selectedRowKeys={selectedRowKeys}
                controllerKey={main.encode(apiUrl.API_QL_DM_CHI_TIEU)}
                hasRowFake={hasRowFake !== false}
                paginationPlacement={paginationPlacement}
                search={{
                    show: isVisiableSearch,
                    component: <ChiTieuSearch {...props} />
                }}
            />
        </React.Fragment >
    );
}

export default ChiTieuList;