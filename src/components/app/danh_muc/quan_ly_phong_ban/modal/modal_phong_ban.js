import React, { useState, useEffect } from "react";
import { Fragment } from "react";
import { Modal, Table } from "antd";
import { getCauHinh } from "../../../../../util/api_call";
import { useSelector } from "react-redux";

const ModalPhongBan = ({
    visible,
    onCancel,
    selected = [],
    disabled = [],
    rowKey = "ma",
    onOk,
    title = <Fragment><i className="fa fa-share-alt m-r-10" />Phòng ban</Fragment>,
    multipe = true,
    okText = <Fragment><i className="fa fa-check m-r-10" />Chọn</Fragment>,
    cancelText = <Fragment><i className="fa fa-times m-r-10" />Đóng</Fragment>
}) => {
    const [loading, setLoading] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);

    const _phongBans = useSelector(state => state.core.account.phong_bans);

    const [phongBans, setPhongBans] = useState([]);

    const getCauHinhPhongBanPhoiHop = async () => {
        setLoading(true);
        const res = await getCauHinh({ ma: "cau_hinh_phong_ban_phoi_hop_nghiep_vu_thanh_tra" });
        let __phongBans = _phongBans;
        if (res && res.status && res.result && res.result.giaTri) {
            try {
                const result = JSON.parse(res.result.giaTri || "");
                __phongBans = result && Array.isArray(result.phongBans) ? result.phongBans : [];
            }
            catch (e) {
                __phongBans = [];
            }
        }
        setPhongBans(__phongBans)
        setLoading(false);
    }

    useEffect(() => {
        setSelectedRows(selected);
    }, [selected])

    useEffect(() => {
        visible && getCauHinhPhongBanPhoiHop();
    }, [visible])

    return <Fragment>
        <Modal
            title={title}
            visible={visible}
            onCancel={onCancel}
            onOk={() => {
                setLoading(true);
                onOk(selectedRows, () => setLoading(false));
            }}
            style={{ top: 50 }}
            width={400}
            okText={okText}
            cancelText={cancelText}
            okButtonProps={{ loading }}
        >
            <Table
                dataSource={phongBans}
                rowSelection={{
                    columnWidth: 50,
                    selectedRowKeys: selectedRows.map(item => item[rowKey]),
                    onChange: (_, _selectedRows) => {
                        const __selectedRows = [
                            ...(selectedRows.filter(item => phongBans.findIndex(_item => _item[rowKey] === item[rowKey]) === -1)),
                            ..._selectedRows
                        ]
                        setSelectedRows(__selectedRows);
                    },
                    type: multipe ? "checkbox" : "radio",
                    getCheckboxProps: (item) => {
                        return {
                            disabled: disabled.findIndex(_item => _item[rowKey] === item[rowKey]) > -1
                        }
                    }
                }}
                rowKey={rowKey}
                columns={[
                    {
                        title: "STT",
                        dataIndex: "stt",
                        width: 50,
                        render: (t, r, i) => i + 1
                    },
                    {
                        title: "Tên phòng ban",
                        dataIndex: "ten"
                    }
                ]}
                size="small"
                pagination={false}
            />
        </Modal>
    </Fragment>
}

export default ModalPhongBan;
