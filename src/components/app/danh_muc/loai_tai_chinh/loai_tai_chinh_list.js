import React, { } from 'react';
import { useSelector } from 'react-redux';
import { CommonTable, CommonTableAction } from "./../../../common";
import * as actID from "./../../../../constants/action_id";
import * as apiUrl from "./../../../../constants/api";
import * as main from "./../../../../constants/main";
import LoaiTaiChinhSearch from "./loai_tai_chinh_search";

const TaiChinhList = ({
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

    const loai_tai_chinh_list = useSelector(state => state.app.danh_muc.loai_tai_chinh.list);

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
        let maSort = "asc";

        dataSort.map((item) => {
            if (item.key === "ma" && !item.value) { maSort = "desc"; }
            return item;
        })
        return [
            {
                title: 'STT',
                dataIndex: 'stt'
            },
            {
                title: <div onClick={() => onChangeDataSort("ma")} >
                    <span> Mã kinh phí </span>
                    <i className={`fa fa-sort-amount-${maSort}`} />
                </div >,
                dataIndex: 'ma',
                width: 150,
                align: "center"
            },
            {
                title: "Tên kinh phí",
                dataIndex: 'ten',
                width: 150,
                align: "center"
            },
            {
                title: "Ghi chú",
                dataIndex: 'ghiChu',
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
        loai_tai_chinh_list.map((item) => {
            return result.push({
                ...item,
                key: item.id,
                actions: renderAction(item)
            })
        });
        return result;
    };

    const renderAction = (su_kien) => {
        return <React.Fragment>
            <CommonTableAction
                actions={[
                    {
                        idChucNang: actID.ACT_ID_LOAI_TAI_CHINH.ACT_DELETE,
                        confirm: true,
                        confirmLabel: "Bạn chắc chắn muốn xóa?",
                        onClick: () => handleDelete(false, su_kien.id),
                        type: "danger"
                    },
                    {
                        idChucNang: actID.ACT_ID_LOAI_TAI_CHINH.ACT_UPDATE,
                        onClick: () => handleEdit(su_kien.id),
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
                controllerKey={main.encode(apiUrl.API_SU_KIEN)}
                search={{
                    show: isVisibleSearch,
                    component: <LoaiTaiChinhSearch
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

export default TaiChinhList;