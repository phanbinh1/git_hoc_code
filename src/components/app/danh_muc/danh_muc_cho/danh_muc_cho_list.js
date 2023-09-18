import React, { } from 'react';
import { useSelector } from 'react-redux';
import { CommonTable, CommonTableAction } from "./../../../common";
import * as actID from "./../../../../constants/action_id";
import * as apiUrl from "./../../../../constants/api";
import * as main from "./../../../../constants/main";
import DanhMucChoSearch from "./danh_muc_cho_search";

const DanhMucChoList = ({
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
    isVisibleSearch,
    handleChangeDataSearch,
}) => {

    const danh_muc_cho_list = useSelector(state => state.app.danh_muc.danh_muc_cho.list);

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
        let tenSort = "asc", tinhThanhSort = "asc", quanHuyenSort = "asc", xaPhuongSort = "asc", diaChiSort = "asc";

        dataSort.map((item) => {
            if (item.key === "ten" && !item.value) { tenSort = "desc"; }
            if (item.key === "tinhThanh.ma" && !item.value) { tinhThanhSort = "desc"; }
            if (item.key === "quanHuyen.ma" && !item.value) { quanHuyenSort = "desc"; }
            if (item.key === "xaPhuong.ma" && !item.value) { xaPhuongSort = "desc"; }
            if (item.key === "diaChi" && !item.value) { diaChiSort = "desc"; }
            return item;
        })
        return [
            {
                title: 'STT',
                dataIndex: 'stt'
            },
            {
                title: <div onClick={() => onChangeDataSort("ten")} >
                    <span> Tên chợ </span>
                    <i className={`fa fa-sort-amount-${tenSort}`} />
                </div >,
                dataIndex: 'ten',
                width: 150,
                align: "center"
            },
            {
                title: <div onClick={() => onChangeDataSort("tinhThanh.ma")} >
                    <span> Tỉnh thành </span>
                    <i className={`fa fa-sort-amount-${tinhThanhSort}`} />
                </div >,
                dataIndex: 'tinhThanh.ten',
                width: 150,
                align: "center"
            },
            {
                title: <div onClick={() => onChangeDataSort("quanHuyen.ma")} >
                    <span> Quận huyện</span>
                    <i className={`fa fa-sort-amount-${quanHuyenSort}`} />
                </div >,
                dataIndex: 'quanHuyen.ten',
                width: 150,
                align: "center"
            },
            {
                title: <div onClick={() => onChangeDataSort("xaPhuong.ma")} >
                    <span> Xã phường </span>
                    <i className={`fa fa-sort-amount-${xaPhuongSort}`} />
                </div >,
                dataIndex: 'xaPhuong.ten',
                width: 150,
                align: "center"
            },
            {
                title: <div onClick={() => onChangeDataSort("diaChi")} >
                    <span> Địa chỉ </span>
                    <i className={`fa fa-sort-amount-${diaChiSort}`} />
                </div >,
                dataIndex: 'diaChi',
                width: 150,
                align: "center"
            },
            {
                title: 'Thao tác',
                dataIndex: 'actions',
                align: "center",
                fixed: "right",
                width: 140
            }
        ];
    }

    const data = () => {
        let result = [];
        danh_muc_cho_list.map((item) => {
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
                        idChucNang: actID.ACT_ID_DANH_MUC_CHO.ACT_DELETE,
                        confirm: true,
                        confirmLabel: "Bạn chắc chắn muốn xóa?",
                        onClick: () => handleDelete(false, item.id),
                        type: "danger"
                    },
                    {
                        idChucNang: actID.ACT_ID_DANH_MUC_CHO.ACT_UPDATE,
                        onClick: () => handleEdit(item.id),
                        type: "success"
                    },
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
                controllerKey={main.encode(apiUrl.API_DANH_MUC_CHO)}
                search={{
                    show: isVisibleSearch,
                    component: <DanhMucChoSearch
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

export default DanhMucChoList;