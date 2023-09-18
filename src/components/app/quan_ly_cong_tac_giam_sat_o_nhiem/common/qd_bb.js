import React, { Fragment, useState, useEffect } from "react";
import { Modal, Drawer, Tabs } from "antd";
import { useDispatch } from "react-redux";
import ListSearch from "./list_search";
import List from "./list";
import * as actBieuMauDiKem from "./../../../../actions/app/quan_ly_bieu_mau/bieu_mau";
import * as main from "./../../../../constants/main";
import { CommonAttachments } from "../../../common";
import View from "./view";
import { CONST_ATTACH_TYPE } from "../../../../constants/constants";
import TaiLieuDaBanHanh from "./list_da_ban_hanh";
import BtnTrinhKy from "./btn_trinh_ky";

const QuyetDinhBienBan = ({
    readOnly,
    bieuMauType,
    entityId,
    attachEntityType = CONST_ATTACH_TYPE.KEHOACHGIAMSATONHIEM,
    allowTrinhKy,
    trinhKyCallback,
    showVanBanTrinhKy,
}) => {
    const [search, setSearch] = useState("");
    const [id] = useState(main.createID());
    const [noiDung, setNoiDung] = useState("");
    const [bieuMau, setBieuMau] = useState(null);
    const [visible, setVisible] = useState(false);
    const [visibleAttachFile, setVisibleAttachFile] = useState(false);
    const [visibleDraw, setVisibleDraw] = useState(false);
    const [listBieuMauDaLap, setListBieuMauDaLap] = useState([]);
    const [daTrinhKy, setDaTrinhKy] = useState(false);

    const dispatch = useDispatch();
    const getByTypeAndIdRequest = object => dispatch(actBieuMauDiKem.getByTypeAndIdRequest(object));

    useEffect(() => {
        if (bieuMauType && entityId) {
            getByTypeAndIdRequest({
                data: {
                    bieuMauType,
                    entityId
                },
                requestSuccess: (res) => {
                    setListBieuMauDaLap(res.result);
                    setDaTrinhKy(res.result.findIndex(item => item.trangThaiKy === "DANGCHOKY" || item.trangThaiKy === "DAKY") > -1)
                }
            })
        }
    }, [bieuMauType, entityId]);

    const onClose = () => {
        if (bieuMau && noiDung !== bieuMau.maHtml) {
            Modal.confirm({
                title: "Xác nhận",
                content: <Fragment>
                    Nội dung thay đổi có thể chưa được lưu.<br />
                    Bạn chắc chắn muốn đóng cửa sổ?
                </Fragment>,
                onOk: () => { setVisibleDraw(false) },
                okText: <Fragment><i className="fa fa-check m-r-10" />Xác nhận</Fragment>,
                cancelText: <Fragment><i className="fa fa-times m-r-10" />Đóng</Fragment>
            })
        }
        else {
            setVisibleDraw(false)
        }
    }

    return <Fragment>
        <Drawer
            width={800}
            visible={visibleAttachFile}
            onClose={() => setVisibleAttachFile(false)}
            title="Tài liệu đi kèm"
        >
            <CommonAttachments
                key={entityId}
                entityId={entityId}
                attachEntityType={attachEntityType}
                addQrCode="1"
            />
        </Drawer>
        <View
            bieuMau={bieuMau}
            bieuMauType={bieuMauType}
            entityId={entityId}
            id={id}
            onClose={onClose}
            setListBieuMauDaLap={setListBieuMauDaLap}
            visibleDraw={visibleDraw}
            setVisibleDraw={setVisibleDraw}
            noiDung={noiDung}
            setNoiDung={setNoiDung}
            trangThaiKy={daTrinhKy}
            onChangeTrangThaiKy={(daTrinhKy) => setDaTrinhKy(daTrinhKy)}
        />
        <ListSearch
            onOk={(bieuMau) => {
                setBieuMau({
                    ...bieuMau,
                    id: undefined
                });
                setNoiDung(bieuMau.maHtml);
                setVisible(false);
                setVisibleDraw(true);
            }}
            visible={visible}
            onCancel={() => { setVisible(false) }}
        />
        <Tabs>
            <Tabs.TabPane tab="Tài liệu dự thảo" key="TLDT">
                {/* {allowTrinhKy && <BtnTrinhKy
                    attachEntityType={attachEntityType}
                    entityId={entityId}
                    key={entityId}
                    trinhKyCallback={trinhKyCallback}
                    className="m-b-10"
                />} */}
                {<BtnTrinhKy
                    attachEntityType={attachEntityType}
                    entityId={entityId}
                    key={entityId}
                    trinhKyCallback={trinhKyCallback}
                    className="m-b-10"
                />}
                <CommonAttachments
                    key={entityId}
                    entityId={entityId}
                    attachEntityType={attachEntityType}
                    addQrCode="1"
                />
            </Tabs.TabPane>
            {bieuMauType && <Tabs.TabPane tab="Mẫu soạn thảo" key="MST">
                <List
                    listBieuMauDaLap={listBieuMauDaLap}
                    readOnly={readOnly}
                    search={search}
                    setBieuMau={setBieuMau}
                    setListBieuMauDaLap={setListBieuMauDaLap}
                    setNoiDung={setNoiDung}
                    setSearch={setSearch}
                    setVisible={setVisible}
                    setVisibleDraw={setVisibleDraw}
                    setVisibleAttachFile={setVisibleAttachFile}
                />
            </Tabs.TabPane>}
            {showVanBanTrinhKy && <Tabs.TabPane tab="Tài liệu đã ban hành" key="TLDBH" disabled={allowTrinhKy}>
                <TaiLieuDaBanHanh
                    key={entityId}
                    entityId={entityId}
                    entityType={attachEntityType}
                    addQrCode="1"
                />
            </Tabs.TabPane>
            }
        </Tabs>
    </Fragment >
}

export default QuyetDinhBienBan;