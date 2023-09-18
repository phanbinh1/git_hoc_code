import React, { Fragment, useState } from "react";
import { Modal as AntModal, Button } from "antd";
import ModalCreate from "./create";
import { useSelector } from "react-redux";
import { getItemSelected } from "../../../../../constants/main";
import ModalList from "./list";

const ModalTaoDanhSachDuKien = ({ visible, onCancel, pageKey }) => {

    const [visibleCreate, setVisibleCreate] = useState(false);
    const [visibleList, setVisibleList] = useState(false);
    const rows_selected = useSelector(state => state.core.rows_selected);
    const coSoSelected = getItemSelected(rows_selected, pageKey);

    return <Fragment>
        <ModalCreate visible={visibleCreate} onCancel={() => setVisibleCreate(false)} coSoSelected={coSoSelected || []} />
        <ModalList
            visible={visibleList}
            onCancel={() => setVisibleList(false)}
        />
        <AntModal
            key="modalNotConfirm"
            title={null}
            footer={null}
            closable={false}
            visible={visible}
            onCancel={onCancel}
            className="ant-modal-confirm ant-modal-confirm-confirm"
            style={{ top: 50 }}
            width={400}
            destroyOnClose
        >
            <div className="ant-modal-confirm-body-wrapper">
                <div className="ant-modal-confirm-body">
                    <span className="anticon anticon-question-circle "><i className="fa fa-file-text-o fa-2x" /></span>
                    <span className="ant-modal-confirm-title">Danh sách dự kiến thanh tra</span>
                    <div className="ant-modal-confirm-content"></div>
                </div>
                <div className="ant-modal-confirm-btns">
                    <Button type="primary" onClick={() => { setVisibleCreate(true); onCancel(); }} disabled={coSoSelected.length === 0}><i className="fa fa-plus m-r-10" />Tạo mới</Button>
                    <Button type="success" onClick={() => { setVisibleList(true); onCancel(); }} ><i className="fa fa-file-text-o m-r-10" /> Danh sách</Button>
                    <Button onClick={onCancel}><i className="fa fa-times m-r-10" /> Đóng</Button>
                </div>
            </div>
        </AntModal>
    </Fragment>
}
export default ModalTaoDanhSachDuKien;