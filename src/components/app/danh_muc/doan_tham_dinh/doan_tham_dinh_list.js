import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { CommonTable, CommonTableAction } from "./../../../common";
import * as actID from "./../../../../constants/action_id";
import * as apiUrl from "./../../../../constants/api";
import * as main from "./../../../../constants/main";
import { Modal, Button } from 'antd';
import LichSuThayDoi from './lich_su_thay_doi';

const DoanThamDinhList = ({
    pageKey,
    dataLoading,
    handleEdit,
    handleDelete,
    getAllRequest,
    handleEndLoadData,
    handleStartLoadData,
    dataSearch,
    onSelectRow
}) => {

    const [lichSuThayDoi, setLichSuThayDoi] = useState({
        visible: false,
        item: null,
        onShow: (item) => setLichSuThayDoi(l => ({ ...l, visible: true, item })),
        oncancel: () => setLichSuThayDoi(l => ({ ...l, visible: false }))
    })
    const doan_tham_dinh_list = useSelector(state => state.app.danh_muc.doan_tham_dinh.list);
    const columns = () => {
        return [
            {
                title: 'STT',
                dataIndex: 'stt'
            },
            {
                title: "Tên đoàn",
                width: 300,
                render: (text, record) => `Đoàn số ${record.soThuTu}`
            },
            {
                title: "Số thành viên",
                render: (text, record) => `${(record.danhSachThanhVien || []).length} thành viên`,
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
        doan_tham_dinh_list.map((item) => {
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
                        idChucNang: actID.ACT_ID_DOAN_THAM_DINH.ACT_DELETE,
                        confirm: true,
                        confirmLabel: "Bạn chắc chắn muốn xóa?",
                        onClick: () => handleDelete(false, item.id),
                        type: "danger"
                    },
                    {
                        idChucNang: actID.ACT_ID_DOAN_THAM_DINH.ACT_UPDATE,
                        onClick: () => handleEdit(item.id),
                        type: "success"
                    },
                    {
                        label: "Lịch sử thay đổi",
                        icon: "fa fa-history",
                        onClick: () => lichSuThayDoi.onShow(item)
                    }
                ]}
            />
        </React.Fragment>
    };

    const handleGetAllRequest = (data = {}, object = {}) => {
        handleStartLoadData();
        let requestSuccess = handleEndLoadData;
        const requestError = handleEndLoadData;
        if (object.hasOwnProperty("requestSuccess") && typeof object.requestSuccess === "function") {
            requestSuccess = () => {
                object.requestSuccess();
                handleEndLoadData();
            }
        }
        data = { ...data, searchData: main.parseObjectToParams(dataSearch) };
        getAllRequest({
            data,
            requestSuccess,
            requestError
        });
    };

    return (
        <React.Fragment>
            <Modal
                width={1000}
                visible={lichSuThayDoi.visible}
                title="Lịch sử thay đổi"
                onCancel={lichSuThayDoi.oncancel}
                style={{ top: 50 }}
                destroyOnClose
                footer={[
                    <Button onClick={lichSuThayDoi.oncancel}><i className="fa fa-times mr-2" /> Đóng</Button>
                ]}
            >
                <LichSuThayDoi
                    danhSachThanhVien={lichSuThayDoi.item ? lichSuThayDoi.item.danhSachThanhVien : []}
                    lichSuThayDoi={lichSuThayDoi.item ? lichSuThayDoi.item.lichSuThayDoi : []}
                />
            </Modal>
            <CommonTable
                columns={columns()}
                dataSource={data()}
                loading={dataLoading}
                bordered={true}
                onChange={handleGetAllRequest}
                pageKey={pageKey}
                onSelectRow={onSelectRow}
                controllerKey={main.encode(apiUrl.API_DOAN_THAM_DINH)}
            />
        </React.Fragment >
    );
}

export default DoanThamDinhList;