import React, { } from 'react';
import { useSelector } from 'react-redux';
import { CommonTable, CommonTableAction } from "./../../../common";
import * as actID from "./../../../../constants/action_id";
import * as apiUrl from "./../../../../constants/api";
import * as main from "./../../../../constants/main";
import NhomChuoiThucPhamSearch from "./nhom_chuoi_thuc_pham_search";

const NhomChuoiThucPhamList = (props) => {

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

    const nhom_chuoi_thuc_pham_list = useSelector(state => state.app.quan_ly_chuoi_thuc_pham_an_toan.nhom_chuoi_thuc_pham.list);

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
        let maSort = "asc",
            tenNhomSort = "asc",
            sanPhamSort = "asc";
        dataSort && Array.isArray(dataSort) && dataSort.map((item) => {
            if (item.key === "ma" && !item.value) { maSort = "desc"; }
            if (item.key === "tenNhom" && !item.value) { tenNhomSort = "desc"; }
            if (item.key === "sanPham" && !item.value) { sanPhamSort = "desc"; }
            return item;
        })
        return [
            {
                title: 'STT',
                dataIndex: 'stt'
            },
            {
                title: <div onClick={() => onChangeDataSort("ma")} >
                    <span> Mã  </span>
                    <i className={`fa fa-sort-amount-${maSort}`} />
                </div >,
                dataIndex: 'ma',
                width: 200
            },
            {
                title: <div onClick={() => onChangeDataSort("tenNhom")} >
                    <span> Tên nhóm </span>
                    <i className={`fa fa-sort-amount-${tenNhomSort}`} />
                </div >,
                dataIndex: 'tenNhom',
                width: 200,
            },
            {
                title: <div onClick={() => onChangeDataSort("sanPham")} >
                    <span> Sản phẩm </span>
                    <i className={`fa fa-sort-amount-${sanPhamSort}`} />
                </div >,
                dataIndex: 'sanPham',
                width: 200,
            },

            {
                title: 'Thao tác',
                dataIndex: 'actions',
                align: "center",
                width: 140,
                fixed: "right",
            }
        ];
    };

    const data = () => {
        let result = [];
        nhom_chuoi_thuc_pham_list.map((item) => {
            return result.push({
                ...item,
                key: item.id,
                actions: renderAction(item),
            })
        });
        return result;
    };

    const renderAction = (item) => {
        return <React.Fragment>
            <CommonTableAction
                actions={[
                    {
                        idChucNang: actID.ACT_ID_NHOM_CHUOI_THUC_PHAM.ACT_DELETE,
                        confirm: true,
                        confirmLabel: "Bạn chắc chắn muốn xóa?",
                        onClick: () => handleDelete(false, item.id),
                        type: "danger"
                    },
                    {
                        idChucNang: actID.ACT_ID_NHOM_CHUOI_THUC_PHAM.ACT_UPDATE,
                        onClick: () => handleEdit(item.ma)
                    }
                ]}
            />
        </React.Fragment>
    };

    const handleGetAllRequest = (pagination = {}, data = {}) => {
        handleStartLoadData();
        let requestSuccess = handleEndLoadData;
        const requestError = handleEndLoadData;
        data = { dataSort: main.parseStringDataSort(dataSort), ...data };
        var dataSortStr = "";
        if (data.hasOwnProperty("dataSort") && typeof data.dataSort === "string") {
            dataSortStr = data.dataSort;
        }
        if (data.hasOwnProperty("requestSuccess") && typeof data.requestSuccess === "function") {
            requestSuccess = () => {
                data.requestSuccess();
                handleEndLoadData();
            }
        }
        var value = { ...pagination, searchData: main.parseObjectToParams(dataSearch), sortData: dataSortStr };
        getAllRequest({
            data: value,
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
                controllerKey={main.encode(apiUrl.API_NHOM_CHUOI_THUC_PHAM)}
                search={{
                    show: isVisiableSearch,
                    component: <NhomChuoiThucPhamSearch {...props} />
                }}
            />
        </React.Fragment >
    );
}

export default NhomChuoiThucPhamList;