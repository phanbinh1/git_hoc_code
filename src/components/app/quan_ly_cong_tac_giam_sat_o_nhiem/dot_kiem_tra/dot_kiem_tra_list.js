import React, { } from 'react';
import { useSelector } from 'react-redux';
import { CommonTable, CommonTableAction } from "../../../common";
import * as actID from "../../../../constants/action_id";
import * as apiUrl from "../../../../constants/api";
import * as main from "../../../../constants/main";
import DotKiemTraSearch from './dot_kiem_tra_search';

const DotKiemTraList = (props) => {

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
        onGetChiTietMau,
        isVisiableSearch
    } = props;

    const dot_kiem_tra_list = useSelector(state => state.app.quan_ly_cong_tac_giam_sat_o_nhiem.dot_kiem_tra.list);

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
        let maSort = "asc", tenSort = "asc", diaDiemSort = "desc";
        dataSort.map((item) => {
            if (item.key === "maDotKiemTra" && !item.value) { maSort = "desc"; }
            if (item.key === "tenDotKiemTra" && !item.value) { tenSort = "desc"; }
            return item;
        })
        return [
            {
                title: 'STT',
                dataIndex: 'stt'
            },
            {
                title: <div onClick={() => onChangeDataSort("maDotKiemTra")} >
                    <span> Mã đợt kiểm tra </span>
                    <i className={`fa fa-sort-amount-${maSort}`} />
                </div >,
                dataIndex: "maDotKiemTra",
                width: 150
            },
            {
                title: <div onClick={() => onChangeDataSort("tenDotKiemTra")} >
                    <span> Tên đợt kiểm tra </span>
                    <i className={`fa fa-sort-amount-${tenSort}`} />
                </div >,
                dataIndex: 'tenDotKiemTra',
                width: 200
            },
            {
                title: 'Thao tác',
                dataIndex: 'actions',
                fixed: "right",
                align: "center",
                width: 140
            }
        ];
    };

    const renderDiaChi = (item) => {
        return `${item.diaDiem} 
        ${item.xaPhuong && item.xaPhuong.ten ? ` - ${item.xaPhuong.ten}` : ""}
        ${item.quanHuyen && item.quanHuyen.ten ? ` - ${item.quanHuyen.ten}` : ""}
        ${item.tinhThanh && item.tinhThanh.ten ? ` - ${item.tinhThanh.ten}` : ""}
        `
    }


    const data = () => {
        let result = [];
        dot_kiem_tra_list.map((item) => {
            return result.push({
                ...item,
                key: item.id,
                actions: renderAction(item),
                diaChi: renderDiaChi(item),
            })
        });
        return result;
    };

    const renderAction = (dot_kiem_tra) => {
        return <React.Fragment>
            <CommonTableAction
                actions={[
                    {
                        idChucNang: actID.ACT_ID_DOT_KIEM_TRA.ACT_DELETE,
                        confirm: true,
                        confirmLabel: "Bạn chắc chắn muốn xóa?",
                        onClick: () => handleDelete(false, dot_kiem_tra.id),
                        type: "danger"
                    },
                    {
                        idChucNang: actID.ACT_ID_DOT_KIEM_TRA.ACT_UPDATE,
                        onClick: () => handleEdit(dot_kiem_tra.id),
                        type: "success"
                    },
                    {
                        idChucNang: actID.ACT_ID_DOT_KIEM_TRA.ACT_CHI_TIET_MAU,
                        onClick: () => onGetChiTietMau(dot_kiem_tra.id),
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
                controllerKey={main.encode(apiUrl.API_DOT_KIEM_TRA)}
                search={{
                    component: <DotKiemTraSearch {...props} />,
                    show: isVisiableSearch
                }}
            />
        </React.Fragment >
    );
}

export default DotKiemTraList;