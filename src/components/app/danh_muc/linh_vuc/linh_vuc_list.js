import React, { } from 'react';
import { useSelector } from 'react-redux';
import { CommonTable, CommonTableAction } from "./../../../common";
import LinhVucSearch from "./linh_vuc_search";
import * as actID from "./../../../../constants/action_id";
import * as apiUrl from "./../../../../constants/api";
import * as main from "./../../../../constants/main";

const LinhVucList = (props) => {

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
        isVisiableSearch
    } = props;

    const linh_vuc_list = useSelector(state => state.app.danh_muc.linh_vuc.list);

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
            if (item.key === "ma" && !item.value) { maSort = "desc"; }
            if (item.key === "ten" && !item.value) { tenSort = "desc"; }
            return item;
        })
        return [
            {
                title: 'STT',
                dataIndex: 'stt'
            },
            {
                title: <div onClick={() => onChangeDataSort("ma")} >
                    <span> Mã lĩnh vực </span>
                    <i className={`fa fa-sort-amount-${maSort}`} />
                </div >,
                dataIndex: "ma",
                width: 300
            },
            {
                title: <div onClick={() => onChangeDataSort("ten")} >
                    <span> Tên lĩnh vực </span>
                    <i className={`fa fa-sort-amount-${tenSort}`} />
                </div >,
                dataIndex: 'ten',
                width: 400
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
        linh_vuc_list.map((item) => {
            return result.push({
                ...item,
                key: item.id,
                actions: renderAction(item)
            })
        });
        return result;
    };

    const renderAction = (linh_vuc) => {
        return <React.Fragment>
            <CommonTableAction
                actions={[
                    {
                        idChucNang: actID.ACT_ID_LINH_VUC.ACT_DELETE,
                        confirm: true,
                        confirmLabel: "Bạn chắc chắn muốn xóa?",
                        onClick: () => handleDelete(false, linh_vuc.id),
                        type: "danger"
                    },
                    {
                        idChucNang: actID.ACT_ID_LINH_VUC.ACT_UPDATE,
                        onClick: () => handleEdit(linh_vuc.id),
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
                controllerKey={main.encode(apiUrl.API_LINH_VUC)}
                search={{
                    show: isVisiableSearch,
                    component: <LinhVucSearch {...props} />
                }}
            />
        </React.Fragment >
    );
}

export default LinhVucList;