import React, { } from 'react';
import { useSelector } from 'react-redux';
import { CommonTable, CommonTableAction } from "./../../../common";
import * as actID from "./../../../../constants/action_id";
import * as apiUrl from "./../../../../constants/api";
import * as main from "./../../../../constants/main";
import QuanLyQuocGiaSearch from "./quan_ly_quoc_gia_search";

const QuocGiaList = (props) => {

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

    const quoc_gia_list = useSelector(state => state.app.danh_muc.quan_ly_quoc_gia.list);

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
        let maQuocGiaSort = "asc", tenQuocGiaSort = "asc";
        dataSort.map((item) => {
            if (item.key === "maQuocGia" && !item.value) { maQuocGiaSort = "desc"; }
            if (item.key === "tenQuocGia" && !item.value) { tenQuocGiaSort = "desc"; }
            return item;
        })
        return [
            {
                title: 'STT',
                dataIndex: 'stt'
            },
            {
                title: <div onClick={() => onChangeDataSort("maQuocGia")} >
                    <span> Mã quốc gia </span>
                    <i className={`fa fa-sort-amount-${maQuocGiaSort}`} />
                </div >,
                dataIndex: "maQuocGia",
                width: 200
            },
            {
                title: <div onClick={() => onChangeDataSort("tenQuocGia")} >
                    <span> Tên quốc gia </span>
                    <i className={`fa fa-sort-amount-${tenQuocGiaSort}`} />
                </div >,
                dataIndex: 'tenQuocGia',
                width: 200
            },
            {
                title: <div>
                    <span> Ngôn ngữ </span>
                </div >,
                dataIndex: 'ngonNgu',
                width: 150
            },
            {
                title: <div>
                    <span> Khu vực </span>
                </div >,
                dataIndex: 'khuVuc',
                width: 200
            },
            {
                title: <div>
                    <span> Dân số </span>
                </div >,
                dataIndex: 'danSo',
                width: 100
            },
            {
                title: <div>
                    <span> Diện tích </span>
                </div >,
                dataIndex: 'dienTich',
                width: 100
            },
            {
                title: <div>
                    <span> Ghi chú </span>
                </div >,
                dataIndex: 'ghiChu',
                width: 250
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
        quoc_gia_list.map((item) => {
            return result.push({
                ...item,
                key: item.id,
                actions: renderAction(item)
            })
        });
        return result;
    };

    const renderAction = (phong_ban) => {
        return <React.Fragment>
            <CommonTableAction
                actions={[
                    {
                        idChucNang: actID.ACT_ID_QUAN_LY_QUOC_GIA.ACT_DELETE,
                        confirm: true,
                        confirmLabel: "Bạn chắc chắn muốn xóa?",
                        onClick: () => handleDelete(false, phong_ban.id),
                        type: "danger"
                    },
                    {
                        idChucNang: actID.ACT_ID_QUAN_LY_QUOC_GIA.ACT_UPDATE,
                        onClick: () => handleEdit(phong_ban.id),
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
                controllerKey={main.encode(apiUrl.API_QUOC_GIA)}
                search={{
                    show: isVisiableSearch,
                    component: <QuanLyQuocGiaSearch {...props} />
                }}
            />
        </React.Fragment >
    );
}

export default QuocGiaList;