import React, { } from 'react';
import { useSelector } from 'react-redux';
import { CommonTable, CommonTableAction } from "./../../../common";
import * as actID from "./../../../../constants/action_id";
import * as apiUrl from "./../../../../constants/api";
import * as url from "./../../../../constants/url";
import * as main from "./../../../../constants/main";

const CoSoSanXuatKinhDoanhList = ({ ...props }) => {
    const {
        pageKey,
        dataLoading,
        getAllRequest,
        handleEndLoadData,
        handleStartLoadData,
        dataSearch,
        onSelectRow,
        checkCoSoExistRequest,
        checkHoSoExistRequest,
        history
    } = props;

    const ho_so_tiep_nhan_mot_cua_list = useSelector(state => state.app.quan_ly_co_so_san_xuat_kinh_doanh.ho_so_tiep_nhan_mot_cua.list);

    const columns = () => {
        return [
            {
                title: 'STT',
                dataIndex: 'stt',
            },
            {
                title: "Mã số hồ sơ",
                dataIndex: 'maHoSoMotCua',
                width: 200,
            },
            {
                title: "Tên doanh nghiệp",
                dataIndex: 'tenDangKyKinhDoanh',
                width: 200,
            },
            {
                title: "Tên cơ sở",
                dataIndex: 'tenCoSo',
                width: 150
            },
            {
                title: "Địa chỉ trụ sở",
                dataIndex: 'diaChiTruSo',
                width: 200
            },
            {
                title: "Trạng thái hồ sơ",
                dataIndex: 'trangThaiHoSo',
                width: 150,
                align: "center"
            },
            {
                title: "Địa điểm kinh doanh",
                dataIndex: 'diaDiemKinhDoanh',
                width: 200
            },
            {
                title: <span> Số điện thoại </span>,
                dataIndex: 'soDienThoai',
                width: 120
            },
            {
                title: "Giấy phép ĐKKD",
                dataIndex: 'soGiayPhepDkkd',
                width: 170
            },
            {
                title: "Ngày cấp",
                dataIndex: 'ngayCapGiayPhepDkkd',
                width: 120,
                align: "center"
            },
            {
                title: "Kết quả thẩm định",
                dataIndex: 'ketQuaThamDinh',
                width: 150,
                align: "center"
            },
            {
                title: <span> Ghi chú </span>,
                dataIndex: 'ghiChu',
                width: 150
            },
            {
                title: 'Thao tác',
                dataIndex: 'actions',
                align: "center",
                width: 140,
                fixed: "right"
            }
        ];
    }
    const data = () => {
        let result = [];
        ho_so_tiep_nhan_mot_cua_list.map((item) => {
            return result.push({
                ...item,
                key: item._id,
                actions: renderAction(item)
            })
        });
        return result;
    }

    const onCreate = ({ id, to }) => {
        let href = "";
        let objectQueryVariable = {}
        switch (to) {
            case actID.ACT_ID_HO_SO_TIEP_NHAN_MOT_CUA.ACT_ADD_TO_CSSXKD:
                checkCoSoExistRequest({
                    data: { _id: id },
                    requestSuccess: (res) => {
                        if (res && res.result) {
                            if (res.result.id) {
                                // Cập nhật
                                objectQueryVariable.action = actID.ACT_ID_CO_SO_SAN_XUAT_KINH_DOANH.ACT_UPDATE;
                                objectQueryVariable.id = res.result.id;
                                objectQueryVariable.hoSoMotCuaId = res.result.hoSoMotCuaId;
                            }
                            else {
                                // Thêm mới
                                objectQueryVariable.action = actID.ACT_ID_CO_SO_SAN_XUAT_KINH_DOANH.ACT_CREATE;
                                objectQueryVariable.hoSoMotCuaId = res.result.hoSoMotCuaId;

                            }
                            href = `${url.URL_CO_SO_SAN_XUAT_KINH_DOANH}?`;
                            href += main.parseObjectToParams(objectQueryVariable);
                            history.push(href);
                        }
                    }
                });
                break;
            case actID.ACT_ID_HO_SO_TIEP_NHAN_MOT_CUA.ACT_ADD_TO_HSCGCN:
                checkHoSoExistRequest({
                    data: { _id: id },
                    requestSuccess: (res) => {
                        if (res && res.result) {
                            if (res.result.id) {
                                // Cập nhật
                                objectQueryVariable.action = actID.ACT_ID_HO_SO_CAP_GIAY_CHUNG_NHAN.ACT_UPDATE;
                                objectQueryVariable.id = res.result.id;
                                objectQueryVariable.hoSoMotCuaId = res.result.hoSoMotCuaId;
                            }
                            else {
                                // Thêm mới
                                objectQueryVariable.action = actID.ACT_ID_HO_SO_CAP_GIAY_CHUNG_NHAN.ACT_CREATE;
                                objectQueryVariable.hoSoMotCuaId = res.result.hoSoMotCuaId;

                            }
                            href = `${url.URL_HO_SO_CAP_GIAY_CHUNG_NHAN_ATTP}?`;
                            href += main.parseObjectToParams(objectQueryVariable);
                            history.push(href);
                        }
                    }
                });
                break;
            default: break;
        }

    };

    const renderAction = (ho_so_tiep_nhan_mot_cua) => {
        return <React.Fragment>
            <CommonTableAction
                actions={[
                    {
                        idChucNang: actID.ACT_ID_HO_SO_TIEP_NHAN_MOT_CUA.ACT_ADD_TO_CSSXKD,
                        onClick: () => onCreate({ id: ho_so_tiep_nhan_mot_cua._id, to: actID.ACT_ID_HO_SO_TIEP_NHAN_MOT_CUA.ACT_ADD_TO_CSSXKD }),
                        type: "success"
                    },
                    {
                        idChucNang: actID.ACT_ID_HO_SO_TIEP_NHAN_MOT_CUA.ACT_ADD_TO_HSCGCN,
                        onClick: () => onCreate({ id: ho_so_tiep_nhan_mot_cua._id, to: actID.ACT_ID_HO_SO_TIEP_NHAN_MOT_CUA.ACT_ADD_TO_HSCGCN }),
                        type: "success"
                    },
                ]}
            />
        </React.Fragment>
    }

    const handleGetAllRequest = (pagination = {}, data = {}) => {
        handleStartLoadData();
        let requestSuccess = handleEndLoadData;
        const requestError = handleEndLoadData;
        if (data.hasOwnProperty("requestSuccess") && typeof data.requestSuccess === "function") {
            requestSuccess = () => {
                data.requestSuccess();
                handleEndLoadData();
            }
        }
        var value = {
            ...pagination,
            ...dataSearch
        };
        getAllRequest({
            data: value,
            requestSuccess,
            requestError
        });

    }

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
                controllerKey={main.encode(apiUrl.API_HO_SO_TIEP_NHAN_MOT_CUA)}
            />
        </React.Fragment >
    );
}

export default CoSoSanXuatKinhDoanhList;