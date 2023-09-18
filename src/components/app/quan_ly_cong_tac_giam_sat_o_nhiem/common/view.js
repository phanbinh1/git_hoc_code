import React, { Fragment } from "react";
import { Button, Drawer } from "antd";
import { useDispatch } from "react-redux";
import { CommonEditor } from "../../../common";
import moment from "moment";
import { CONST_TRANG_THAI } from "./";
import * as actBieuMauDiKem from "./../../../../actions/app/quan_ly_bieu_mau/bieu_mau";
import * as controll from "./../../../../constants/controll";
import TrinhKy from "./trinh_ky";
import ModalSave from "./modal_save";

const View = ({
    bieuMauType,
    entityId,
    setListBieuMauDaLap,
    onClose,
    bieuMau,
    id,
    visibleDraw,
    setVisibleDraw,
    noiDung,
    setNoiDung,
    trangThaiKy,
    onChangeTrangThaiKy
}) => {
    const dispatch = useDispatch();
    const createRequest = (object) => dispatch(actBieuMauDiKem.createRequest(object))
    const updateRequest = (object) => dispatch(actBieuMauDiKem.updateRequest(object))
    return <Fragment>
        <Drawer
            title={<Fragment>
                <i className="fa fa-file-text-o m-r-10" />
                {
                    bieuMau ?
                        bieuMau.tenBieuMau :
                        "Nội dung quyết định/ biên bản"
                }
            </Fragment>}
            width={1000}
            visible={visibleDraw && bieuMau}
            bodyStyle={{ padding: 0 }}
            onClose={onClose}
            destroyOnClose
        >
            {
                bieuMau && <CommonEditor
                    id={id}
                    readOnly={bieuMau.readOnly}
                    content={`${bieuMau.maHtml}${bieuMau.trangThaiBieuMau === CONST_TRANG_THAI.DAHOANTHIEN && bieuMau.readOnly && bieuMau.qrCode ? `<p><center><img src='${bieuMau.qrCode}' /></center></p>` : ''}`}
                    height={bieuMau.readOnly ? "calc(100vh - 104px)" : "calc(100vh - 208px)"}
                    width="calc(100% - 2px)"
                    onChange={data => setNoiDung(data)}
                    plugins={{
                        print: false
                    }}
                    toolbar={{
                        print: false
                    }}
                />
            }
            <div className="row" style={{ height: "50px", lineHeight: "50px", padding: "0 10px", margin: 0 }}>
                <div className="col-md-6">
                    {
                        bieuMau && bieuMau.ngayTao && moment(bieuMau.ngayTao).isValid() &&
                        <Fragment>
                            <i className="fa fa-calendar m-r-10" />{moment(bieuMau.ngayTao).format(controll.dateTimeFormat)}
                        </Fragment>
                    }
                </div>
                <div className="col-md-6 t-right">
                    {
                        bieuMau && bieuMau.readOnly &&
                        <Fragment>
                            {
                                !trangThaiKy && <TrinhKy
                                    bieuMauType={bieuMauType}
                                    entityId={entityId}
                                    bieuMau={bieuMau}
                                    onChangeTrangThaiKy={onChangeTrangThaiKy}
                                />
                            }
                            <Button
                                type="primary"
                                className="m-r-10"
                                onClick={() => {
                                    const elm = document.getElementById(`${id}_ifr`)
                                    if (elm && elm.contentWindow) {
                                        elm.contentWindow.print();
                                    }
                                }}>
                                <i className="fa fa-print m-r-10" />In
                            </Button>
                        </Fragment>
                    }
                    {
                        bieuMau && !bieuMau.readOnly &&
                        <ModalSave
                            onConfirm={() => {
                                if (bieuMau.id) {
                                    updateRequest({
                                        data: {
                                            id: bieuMau.id,
                                            bieuMauType,
                                            entityId,
                                            tenBieuMau: bieuMau.tenBieuMau,
                                            maHtml: noiDung,
                                            trangThaiBieuMau: CONST_TRANG_THAI.DAHOANTHIEN
                                        },
                                        requestSuccess: (res) => {
                                            setListBieuMauDaLap(list => {
                                                let _list = [...list];
                                                const index = list.findIndex(item => item.id === res.result.id);
                                                if (index > -1) {
                                                    _list[index] = res.result;
                                                }
                                                return [..._list];
                                            });
                                            setVisibleDraw(false)
                                        }
                                    })
                                }
                                else {
                                    createRequest({
                                        data: {
                                            bieuMauType,
                                            entityId,
                                            tenBieuMau: bieuMau.tenBieuMau,
                                            maHtml: noiDung,
                                            trangThaiBieuMau: CONST_TRANG_THAI.DAHOANTHIEN
                                        },
                                        requestSuccess: (res) => {
                                            setListBieuMauDaLap(list => [...list, res.result]);
                                            setVisibleDraw(false)
                                        }
                                    })
                                }
                            }}
                            onNotConfirm={() => {
                                if (bieuMau.id) {
                                    updateRequest({
                                        data: {
                                            id: bieuMau.id,
                                            bieuMauType,
                                            entityId,
                                            tenBieuMau: bieuMau.tenBieuMau,
                                            maHtml: noiDung,
                                            trangThaiBieuMau: CONST_TRANG_THAI.DANGHOANTHIEN
                                        },
                                        requestSuccess: (res) => {
                                            setListBieuMauDaLap(list => {
                                                let _list = [...list];
                                                const index = list.findIndex(item => item.id === res.result.id);
                                                if (index > -1) {
                                                    _list[index] = res.result;
                                                }
                                                return [..._list];
                                            });
                                            setVisibleDraw(false)
                                        }
                                    })
                                }
                                else {
                                    createRequest({
                                        data: {
                                            bieuMauType,
                                            entityId,
                                            tenBieuMau: bieuMau.tenBieuMau,
                                            maHtml: noiDung,
                                            trangThaiBieuMau: CONST_TRANG_THAI.DANGHOANTHIEN
                                        },
                                        requestSuccess: (res) => {
                                            setListBieuMauDaLap(list => [...list, res.result]);
                                            setVisibleDraw(false)
                                        }
                                    })
                                }
                            }}
                        />
                    }
                    <Button onClick={onClose} key="cancel" className="m-r-10">
                        <i className="fa fa-times m-r-10" />Đóng
                    </Button>
                </div>
            </div>
        </Drawer>
    </Fragment >
}

export default View;