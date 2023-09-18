import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, Input } from "antd";
import * as actThongBaoCongBoSanPham from "./../../../../actions/app/quan_ly_ho_so_tu_cong_bo/thong_bao_cong_bo_san_pham";
import { CONST_LUAN_CHUYEN } from '../../../../constants/constants';
import { dateTimeFormat } from '../../../../constants/controll';
import moment from "moment";

const ModalYeuCauBoSung = ({ thongBaoCongBo, setRowSelecteds, listHoSoCongBo = [], visible, onCancel }) => {
    const dispatch = useDispatch();
    const yeuCauBoSungHoSoRequest = (data = {}) => dispatch(actThongBaoCongBoSanPham.yeuCauBoSungHoSoRequest(data))
    const account_current = useSelector(state => state.core.account_current);
    const [ghiChu, setGhiChu] = useState("");

    useEffect(() => {
        setGhiChu("");
    }, [visible]);

    return <Fragment>
        <Modal
            key="modalNotConfirm"
            title={null}
            footer={null}
            closable={false}
            visible={visible}
            onCancel={onCancel}
            className="ant-modal-confirm ant-modal-confirm-confirm"
            style={{ top: 50 }}
            destroyOnClose
        >
            <div className="ant-modal-confirm-body-wrapper">
                <div className="ant-modal-confirm-body">
                    <span className="anticon anticon-question-circle "><i className="fa fa-question-circle-o" /></span>
                    <span className="ant-modal-confirm-title">Xác nhận</span>
                    <div className="ant-modal-confirm-content">
                        <p>
                            Bạn chắc chắn muốn thực hiện?<br />
                            Nếu <b>Xác nhận</b> thì các hồ sơ này sẽ được xóa khỏi danh sách thông báo công bố sản phẩm này!
                        </p>
                        <p>
                            <Input.TextArea
                                placeholder="Ghi chú"
                                value={ghiChu}
                                onChange={e => setGhiChu(e.target.value)}
                            />
                        </p>
                    </div>
                </div>
                <div className="ant-modal-confirm-btns">
                    <Button onClick={onCancel}>
                        <i className="fa fa-times m-r-10" />Hủy
                    </Button>
                    <Button type="primary" onClick={() => {
                        yeuCauBoSungHoSoRequest({
                            data: {
                                thongBaoCongBo,
                                listHoSoCongBo: listHoSoCongBo.map((item) => {
                                    let lichSuLuanChuyen = [];
                                    try {
                                        lichSuLuanChuyen = JSON.parse(item.lichSuLuanChuyen);
                                        if (!Array.isArray(lichSuLuanChuyen)) {
                                            lichSuLuanChuyen = [];
                                        }
                                    }
                                    catch (e) {
                                        lichSuLuanChuyen = [];
                                    }
                                    lichSuLuanChuyen.unshift({
                                        maXuLy: CONST_LUAN_CHUYEN.BACK,
                                        nguoiXyLy: account_current.fullName,
                                        username: account_current.name,
                                        lyDo: ghiChu,
                                        thongBaoCongBoSanPham: {
                                            id: thongBaoCongBo.id,
                                            tieuDe: thongBaoCongBo.tieuDe
                                        },
                                        thoiGian: moment().format(dateTimeFormat)
                                    })
                                    return {
                                        id: item.id,
                                        lichSuLuanChuyen: JSON.stringify(lichSuLuanChuyen),
                                    }
                                }),
                                ghiChu
                            },
                            requestSuccess: () => {
                                setRowSelecteds(rowSelecteds => rowSelecteds.filter(item => listHoSoCongBo.findIndex(hs => hs.id === item.id) > -1))
                                onCancel()
                            }
                        })
                    }}>
                        <i className="fa fa-check m-r-10" />Xác nhận
                    </Button>
                </div>
            </div>
        </Modal>
    </Fragment>

}

export default ModalYeuCauBoSung;