import React, { useState } from 'react';
import { CommonTable, CommonTableAction } from "../../../common";
import ListChild from "./loai_hinh_co_so_list";
import * as actID from "../../../../constants/action_id";
import * as apiUrl from "../../../../constants/api";
import * as main from "../../../../constants/main";
import LoaiHinhCoSoSearch from "./loai_hinh_co_so_search";

const LoaiHinhCoSoList = (props) => {
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
        maLoaiHinhCha = "0",
        level = 1,
        isVisiableSearch
    } = props;

    const [expandedRowKeys, setExpandedRowKeys] = useState([]);
    const [_data, _setData] = useState([]);

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
    }

    const columns = () => {
        let maSort = "asc",
            tenSort = "asc";
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
                title: maLoaiHinhCha === "0" ? <div onClick={() => onChangeDataSort("ma")} >
                    <span> Mã loại hình cơ sở </span>
                    <i className={`fa fa-sort-amount-${maSort}`} />
                </div > : "Mã loại hình cơ sở",
                dataIndex: 'ma',
                width: 150
            },
            {
                title: maLoaiHinhCha === "0" ? <div onClick={() => onChangeDataSort("ten")} >
                    <span> Tên loại hình cơ sở </span>
                    <i className={`fa fa-sort-amount-${tenSort}`} />
                </div > : "Tên loại hình cơ sở",
                dataIndex: 'ten',
                width: 200
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
        _data.map((item) => {
            return result.push({
                ...item,
                key: item.id,
                actions: renderAction(item),
                expanded: <div style={{ padding: "10px 0" }}>
                    <ListChild
                        pageKey={`${pageKey}-${level + 1}`}
                        dataLoading={dataLoading}
                        dataSort={dataSort}
                        handleChangeDataSort={handleChangeDataSort}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                        getAllRequest={getAllRequest}
                        handleEndLoadData={handleEndLoadData}
                        handleStartLoadData={handleStartLoadData}
                        dataSearch={dataSearch}
                        onSelectRow={(rows = []) => onSelectRow(rows, `${pageKey}-${level + 1}`)}
                        maLoaiHinhCha={item.ma}
                        level={level + 1}
                    />
                </div>
            })
        });
        return result;
    }

    const renderAction = (loai_hinh_co_so) => {
        return <React.Fragment>
            <CommonTableAction
                actions={[
                    {
                        idChucNang: actID.ACT_ID_LOAI_HINH_CO_SO.ACT_DELETE,
                        confirm: true,
                        confirmLabel: "Bạn chắc chắn muốn xóa?",
                        onClick: () => handleDelete(false, loai_hinh_co_so.id),
                        type: "danger"
                    },
                    {
                        idChucNang: actID.ACT_ID_LOAI_HINH_CO_SO.ACT_UPDATE,
                        type: "success",
                        onClick: () => handleEdit(loai_hinh_co_so.id)
                    }
                ]}
            />
        </React.Fragment>
    }

    const handleGetAllRequest = (data = {}, object = {}) => {
        handleStartLoadData();
        let requestSuccess = (res) => {
            res && res.status && res.result && _setData(res.result);
            handleEndLoadData()
        };
        const requestError = handleEndLoadData;
        object = { dataSort: main.parseStringDataSort(dataSort), ...object };
        let dataSortStr = "";
        if (object.hasOwnProperty("dataSort") && typeof object.dataSort === "string") {
            dataSortStr = object.dataSort;
        }
        if (object.hasOwnProperty("requestSuccess") && typeof object.requestSuccess === "function") {
            requestSuccess = (res) => {
                res && res.status && res.result && _setData(res.result);
                object.requestSuccess();
                handleEndLoadData();
            }
        }
        data = {
            ...data,
            searchData: main.parseObjectToParams({ ...dataSearch, maLoaiHinhCha }),
            sortData: dataSortStr
        };
        getAllRequest({
            data,
            requestSuccess,
            requestError,
            isPagination: maLoaiHinhCha === "0"
        });
    }

    return (
        <React.Fragment>
            <CommonTable
                columns={columns()}
                dataSource={data()}
                loading={maLoaiHinhCha === "0" && dataLoading}
                bordered={true}
                onChange={handleGetAllRequest}
                pageKey={pageKey}
                onSelectRow={onSelectRow}
                controllerKey={main.encode(apiUrl.API_LOAI_HINH_CO_SO)}
                expanded
                hasRowFake={maLoaiHinhCha === "0"}
                scrollY={maLoaiHinhCha === "0"}
                isPagination={maLoaiHinhCha === "0"}
                renderEmpty={maLoaiHinhCha === "0"}
                // hasSelectRow={maLoaiHinhCha === "0"}
                hasSelectRow={false}
                search={{
                    show: isVisiableSearch,
                    component: <LoaiHinhCoSoSearch {...props} />
                }}
                expandedRowKeys={expandedRowKeys}
                onExpandedRowsChange={(expandedRowKeys) => setExpandedRowKeys(expandedRowKeys)}
            />
        </React.Fragment >
    );
}

export default LoaiHinhCoSoList;