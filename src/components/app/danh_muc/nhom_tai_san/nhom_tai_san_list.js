import React, { } from 'react';
import { useSelector } from 'react-redux';
import { CommonTable, CommonTableAction } from "./../../../common";
import NhomTaiSanSearch from "./nhom_tai_san_search";
import * as actID from "./../../../../constants/action_id";
import * as apiUrl from "./../../../../constants/api";
import * as main from "./../../../../constants/main";

const NhomTaiSanList = ({
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
    isVisiableSearch,
    handleChangeDataSearch
}) => {

    const nhom_tai_san_list = useSelector(state => state.app.danh_muc.nhom_tai_san.list);

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
        let maNhomSort = "asc", tenNhomSort = "asc", mucTrichKhauHaoToiThieuSort = "asc", mucTrichKhauHaoToiDaSort = "asc";
        dataSort.map((item) => {
            if (item.key === "maNhom" && !item.value) { maNhomSort = "desc"; }
            if (item.key === "tenNhom" && !item.value) { tenNhomSort = "desc"; }
            if (item.key === "mucTrichKhauHaoToiThieu" && !item.value) { mucTrichKhauHaoToiThieuSort = "desc"; }
            if (item.key === "mucTrichKhauHaoToiDa" && !item.value) { mucTrichKhauHaoToiDaSort = "desc"; }
            return item;
        })
        return [
            {
                title: 'STT',
                dataIndex: 'stt'
            },
            {
                title: <div onClick={() => onChangeDataSort("maNhom")} >
                    <span> Mã nhóm </span>
                    <i className={`fa fa-sort-amount-${maNhomSort}`} />
                </div >,
                dataIndex: "maNhom",
                width: 150
            },
            {
                title: <div onClick={() => onChangeDataSort("tenNhom")} >
                    <span> Tên nhóm </span>
                    <i className={`fa fa-sort-amount-${tenNhomSort}`} />
                </div >,
                dataIndex: 'tenNhom',
                width: 200
            },
            {
                title: <div onClick={() => onChangeDataSort("mucTrichKhauHaoToiThieu")} >
                    <span> KH tối thiểu(năm) </span>
                    <i className={`fa fa-sort-amount-${mucTrichKhauHaoToiThieuSort}`} />
                </div >,
                dataIndex: 'mucTrichKhauHaoToiThieu',
                width: 170
            },
            {
                title: <div onClick={() => onChangeDataSort("mucTrichKhauHaoToiDa")} >
                    <span> KH tối đa(năm) </span>
                    <i className={`fa fa-sort-amount-${mucTrichKhauHaoToiDaSort}`} />
                </div >,
                dataIndex: 'mucTrichKhauHaoToiDa',
                width: 150
            },
            {
                title: "Ghi chú",
                dataIndex: 'ghiChu',
                width: 150
            },
            {
                title: 'Thao tác',
                dataIndex: 'actions',
                align: "center",
                fixed: "right",
                width: 140
            }
        ];
    };

    const data = () => {
        let result = [];
        nhom_tai_san_list.map((item) => {
            return result.push({
                ...item,
                key: item.id,
                actions: renderAction(item)
            })
        });
        return result;
    };

    const renderAction = (item) => {
        return <React.Fragment>
            <CommonTableAction
                actions={[
                    {
                        idChucNang: actID.ACT_ID_TAI_SAN_NHOM_TAI_SAN.ACT_DELETE,
                        confirm: true,
                        confirmLabel: "Bạn chắc chắn muốn xóa?",
                        onClick: () => handleDelete(false, item.id),
                        type: "danger"
                    },
                    {
                        idChucNang: actID.ACT_ID_TAI_SAN_NHOM_TAI_SAN.ACT_UPDATE,
                        onClick: () => handleEdit(item.id),
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
                controllerKey={main.encode(apiUrl.API_TCB_NHOM)}
                search={{
                    show: isVisiableSearch,
                    component: <NhomTaiSanSearch
                        getAllRequest={getAllRequest}
                        handleStartLoadData={handleStartLoadData}
                        handleChangeDataSearch={handleChangeDataSearch}
                        dataSort={dataSort}
                        handleEndLoadData={handleEndLoadData}
                        onSelectRow={onSelectRow}
                    />
                }}
            />
        </React.Fragment >
    );
}

export default NhomTaiSanList;