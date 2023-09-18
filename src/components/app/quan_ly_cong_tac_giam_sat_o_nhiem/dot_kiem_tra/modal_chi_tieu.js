import { Button, Descriptions, Modal, Table, Tooltip } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { CONST_TRANG_THAI_CHI_TIEU } from "../../../../constants/constants";
import ModalFomChiTieu from "./modal_form_chi_tieu";

export default ({
    visible,
    onCancel,
    onOk,
    coSo
}) => {
    const [dataSource, setDataSource] = useState(coSo && Array.isArray(coSo.chiTieuGiamSats) ? coSo.chiTieuGiamSats : []);
    useEffect(() => {
        setDataSource(coSo && Array.isArray(coSo.chiTieuGiamSats) ? coSo.chiTieuGiamSats : [])
    }, [coSo])

    return <Modal
        title="Chỉ tiêu giám sát"
        visible={visible}
        onCancel={onCancel}
        destroyOnClose
        onOk={() => { onOk && onOk(dataSource); }}
        width={1000}
        style={{ top: 50 }}
        okText={<Fragment><i className="fa fa-save mr-2" />Lưu</Fragment>}
        cancelText={<Fragment><i className="fa fa-times mr-2" />Huỷ</Fragment>}
    >
        <Content
            coSo={coSo}
            dataSource={dataSource}
            setDataSource={setDataSource}
        />
    </Modal>
}

const Content = ({
    dataSource,
    setDataSource
}) => {

    const [expandedRowKeys, setExpandedRowKeys] = useState([]);
    const [form, setForm] = useState({
        visible: false,
        chiTieu: null,
        index: -1,
        onShow: (chiTieu, index) => setForm(f => ({ ...f, visible: true, chiTieu, index })),
        onCancel: () => setForm(f => ({ ...f, visible: false })),
        onOk: (chiTieu, index) => {
            if (index >= 0) {
                setDataSource(chiTieus => chiTieus.map((item, i) => i === index ? chiTieu : item))
            }
            else {
                setDataSource(chiTieus => [...chiTieus, chiTieu])
            }
            setForm(f => ({ ...f, visible: false }))
        }
    })

    const onDel = (index) => {
        setDataSource(chiTieus => {
            const res = [...chiTieus];
            res.splice(index, 1);
            return res;
        })

    }

    return <Fragment>
        <ModalFomChiTieu
            visible={form.visible}
            onCancel={form.onCancel}
            initValue={form.chiTieu}
            onOk={(values) => form.onOk(values, form.index)}
        />
        <Button onClick={() => form.onShow()} type="primary"><i className="fa fa-plus mr-2" /> Thêm chỉ tiêu</Button>
        <Table
            expandedRowKeys={expandedRowKeys}
            onExpandedRowsChange={(keys) => setExpandedRowKeys(keys)}
            expandedRowRender={(item) => <Fragment>
                <Descriptions column={2} bordered size="small" className="description-detail">
                    <Descriptions.Item span={2} label="Nhóm thực phẩm">{item.loaiThucPham && item.loaiThucPham.tenLoaiThucPham}</Descriptions.Item>

                    <Descriptions.Item label="Số mẫu đã lây">{item.soMauDaLay}</Descriptions.Item>
                    <Descriptions.Item label="Số mẫu chưa lây">{item.soMauChuaLay}</Descriptions.Item>

                    <Descriptions.Item label="Số mẫu vi sinh">
                        <Tooltip
                            title={<Fragment>
                                Tổng số mẫu: {(item.soMauDatChuanViSinh || 0) + (item.soMauChuaDatChuanViSinh || 0)}<br />
                                Số mẫu đạt: {item.soMauDatChuanViSinh || 0}
                            </Fragment>}
                        >
                            <span>{item.soMauDatChuanViSinh || 0}/{(item.soMauDatChuanViSinh || 0) + (item.soMauChuaDatChuanViSinh || 0)}</span>
                        </Tooltip>
                    </Descriptions.Item>
                    <Descriptions.Item label="Số mẫu hoá học">
                        <Tooltip
                            title={<Fragment>
                                Tổng số mẫu: {(item.soMauDatChuanHoaHoc || 0) + (item.soMauChuaDatChuanHoaHoc || 0)}<br />
                                Số mẫu đạt: {item.soMauDatChuanHoaHoc || 0}
                            </Fragment>}
                        >
                            <span>{item.soMauDatChuanHoaHoc || 0}/{(item.soMauDatChuanHoaHoc || 0) + (item.soMauChuaDatChuanHoaHoc || 0)}</span>
                        </Tooltip>
                    </Descriptions.Item>

                    <Descriptions.Item label="Trạng thái">{CONST_TRANG_THAI_CHI_TIEU.render(item.trangThai).label}</Descriptions.Item>
                    <Descriptions.Item label="Kết luận">{item.ketLuan}</Descriptions.Item>

                    <Descriptions.Item span={2} label="Ghi chú">{item.ghiChu}</Descriptions.Item>

                </Descriptions>
            </Fragment>}
            columns={[
                {
                    title: "STT",
                    width: 50,
                    align: "center",
                    render: (t, r, i) => i + 1
                },
                {
                    title: "Nhóm thực phẩm",
                    dataIndex: "loaiThucPham.tenLoaiThucPham",
                    width: 160
                },
                {
                    title: "Trạng thái",
                    width: 160,
                    render: (t, r) => CONST_TRANG_THAI_CHI_TIEU.render(r.trangThai).label
                },
                {
                    title: "Kết luận",
                    dataIndex: "ketLuan",
                    width: 160
                },
                {
                    title: "Thao tác",
                    align: "center",
                    width: 140,
                    render: (t, item, index) => <Fragment>
                        <Button shape="circle" type="primary" className="mr-2" onClick={() => form.onShow(item, index)}><i className="fa fa-pencil-square-o" /></Button>
                        <Button shape="circle" type="danger" onClick={() => onDel(index)}><i className="fa fa-trash" /></Button>
                    </Fragment>
                },
            ]}
            dataSource={dataSource}
            size="small"
            bordered
            pagination={false}
            className="table-custom"
        />
    </Fragment>
}