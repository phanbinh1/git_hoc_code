import { Button, Table, Popconfirm } from "antd";
import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import CoSoSanXuatKinhDoanhPopupSearch from "../../quan_ly_co_so_san_xuat_kinh_doanh/co_so_san_xuat_kinh_doanh/co_so_popup_search";
import { arrayMove, change } from "redux-form";
import * as formName from "./../../../../constants/form_name";
import ModalChiTieu from "./modal_chi_tieu";
import { CONST_LOAI_CO_SO } from "../../../../constants/constants";

export default ({
    coSoKiemTras = []
}) => {

    const dispatch = useDispatch();
    const [selectCoSo, setSelectCoSo] = useState({
        visible: false,
        onShow: () => setSelectCoSo(slcs => ({ ...slcs, visible: true })),
        onCancel: () => setSelectCoSo(slcs => ({ ...slcs, visible: false }))
    })

    const [chiTieu, setChiTieu] = useState({
        visible: false,
        coSo: null,
        coSoIndex: -1,
        onShow: (coSo, coSoIndex) => setChiTieu(ct => ({ ...ct, visible: true, coSo, coSoIndex })),
        onCancel: () => setChiTieu(ct => ({ ...ct, visible: false })),
        onOk: (chiTieuGiamSats = [], coSoIndex) => {
            dispatch(change(formName.FORM_NAME_QLCTGSON_DOT_KIEM_TRA, `coSoKiemTras[${coSoIndex}].chiTieuGiamSats`, chiTieuGiamSats));
            chiTieu.onCancel();
        }
    })

    return <Fragment>
        <CoSoSanXuatKinhDoanhPopupSearch
            coSoSelected={coSoKiemTras
                .filter(cs => (cs.loaiCoSo === CONST_LOAI_CO_SO.COSO_BANATTP && cs.idCoSo) || true)
                .map(cs => ({ ...cs, _id: cs.id }))
            }
            visible={selectCoSo.visible}
            onCancel={selectCoSo.onCancel}
            loaiCoSos={[CONST_LOAI_CO_SO.COSO_BANATTP, CONST_LOAI_CO_SO.COSO_QUANHUYEN, CONST_LOAI_CO_SO.COSO_CAPGCN, CONST_LOAI_CO_SO.COSO_NGOAI]}
            onSelectCoSo={(coSos) => {
                dispatch(change(
                    formName.FORM_NAME_QLCTGSON_DOT_KIEM_TRA,
                    "coSoKiemTras",
                    [
                        // ...coSoKiemTras.filter(cs => !cs.idCoSo),
                        ...(Array.isArray(coSos) ? coSos : []).map(cs => ({
                            id: cs._id,
                            loaiCoSo: cs.loaiCoSo,
                            idCoSo: cs.idCoSo,
                            tenCoSo: cs.tenCoSo,
                            diaDiem: cs.diaDiemKinhDoanh || cs.diaDiem,
                            tinhThanh: cs.tinhThanh,
                            quanHuyen: cs.quanHuyen,
                            xaPhuong: cs.xaPhuong,
                            idDanhMucCho: cs.idDanhMucCho,
                            tenDanhMucCho: cs.tenDanhMucCho,
                            ghiChu: cs.ghiChu
                        }))
                    ].map((coSo) => {
                        const cskt = coSoKiemTras.find(cskt => cskt.id === coSo.id);
                        return {
                            ...coSo,
                            chiTieuGiamSats: cskt ? (cskt.chiTieuGiamSats || []) : []
                        }
                    })
                ))
            }}
            mode="multiple"
        />
        <ModalChiTieu
            visible={chiTieu.visible}
            onCancel={chiTieu.onCancel}
            coSo={chiTieu.coSo}
            onOk={(chiTieuGiamSats = []) => chiTieu.onOk(chiTieuGiamSats, chiTieu.coSoIndex)}
        />
        <div className="col-md-12">
            <Button onClick={selectCoSo.onShow} type="primary"><i className="fa fa-plus m-r-5" /> Thêm cơ sở</Button>
            <Table
                columns={[
                    { title: "STT", width: 50, className: "c-pointer", align: "center", render: (t, r, i) => i + 1 },
                    { dataIndex: "tenCoSo", title: "Tên cơ sở", width: 200, className: "c-pointer" },
                    { title: "Địa chỉ", className: "c-pointer", render: (t, item) => `${item.diaDiem || ""}${item.xaPhuong && item.xaPhuong.ten ? ` - ${item.xaPhuong.ten}` : ""}${item.quanHuyen && item.quanHuyen.ten ? ` - ${item.quanHuyen.ten}` : ""}${item.tinhThanh && item.tinhThanh.ten ? ` - ${item.tinhThanh.ten}` : ""}` },
                    {
                        dataIndex: "loaiCoSo", title: "Loại cơ sở", width: 150, className: "c-pointer", render: (t, r) => {
                            const v = CONST_LOAI_CO_SO.options.find(item => item.value === r.loaiCoSo);
                            return v && v.label;
                        }
                    },
                    { dataIndex: "ghiChu", title: "Ghi chú", width: 150, className: "c-pointer" },
                    {
                        width: 230, align: "center", render: (t, coSo, i) => <Fragment>
                            <Button type="primary" onClick={() => chiTieu.onShow(coSo, i)} style={{ marginRight: 5 }}>Chỉ tiêu giám sát</Button>
                            <Popconfirm
                                title="Bạn chắc chắn muốn xoá?"
                                onConfirm={() => dispatch(arrayMove(formName.FORM_NAME_QLCTGSON_DOT_KIEM_TRA, "coSoKiemTras", i))}
                                okText="Đồng ý"
                                cancelText="Huỷ"
                            >
                                <Button type="danger">Xoá</Button>
                            </Popconfirm>
                        </Fragment>
                    },
                ]}
                dataSource={coSoKiemTras}
                size="small"
                bordered
                pagination={false}
            />
        </div>
    </Fragment>
}