import React, { } from 'react';
import { useSelector } from 'react-redux';
import { CommonTable, CommonTableAction } from "./../../../../common";
import * as actID from "./../../../../../constants/action_id";
import * as apiUrl from "./../../../../../constants/api";
import * as main from "./../../../../../constants/main";
import LoaiThucPhamSearch from "./loai_thuc_pham_search";

const LoaiThucPhamList = (props) => {

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

    const loai_thuc_pham_list = useSelector(state => state.app.quan_ly_cong_tac_giam_sat_o_nhiem.loai_thuc_pham.list);

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
            if (item.key === "maLoaiThucPham" && !item.value) { maSort = "desc"; }
            if (item.key === "tenLoaiThucPham" && !item.value) { tenSort = "desc"; }
            return item;
        })
        return [
            {
                title: 'STT',
                dataIndex: 'stt'
            },
            {
                title: <div onClick={() => onChangeDataSort("maLoaiThucPham")} >
                    <span> Mã loại thực phẩm </span>
                    <i className={`fa fa-sort-amount-${maSort}`} />
                </div >,
                dataIndex: "maLoaiThucPham",
                width: 300
            },
            {
                title: <div onClick={() => onChangeDataSort("tenLoaiThucPham")} >
                    <span> Tên loại thực phẩm </span>
                    <i className={`fa fa-sort-amount-${tenSort}`} />
                </div >,
                dataIndex: 'tenLoaiThucPham',
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
        loai_thuc_pham_list.map((item) => {
            return result.push({
                ...item,
                key: item.id,
                actions: renderAction(item)
            })
        });
        return result;
    };

    const renderAction = (loai_thuc_pham) => {
        return <React.Fragment>
            <CommonTableAction
                actions={[
                    {
                        idChucNang: actID.ACT_ID_QLDM_LOAI_THUC_PHAM.ACT_DELETE,
                        confirm: true,
                        confirmLabel: "Bạn chắc chắn muốn xóa?",
                        onClick: () => handleDelete(false, loai_thuc_pham.id),
                        type: "danger"
                    },
                    {
                        idChucNang: actID.ACT_ID_QLDM_LOAI_THUC_PHAM.ACT_UPDATE,
                        onClick: () => handleEdit(loai_thuc_pham.id),
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
                controllerKey={main.encode(apiUrl.API_QL_DM_LOAI_THUC_PHAM)}
                search={{
                    show: isVisiableSearch,
                    component: <LoaiThucPhamSearch {...props} />
                }}
            />
        </React.Fragment >
    );
}

export default LoaiThucPhamList;