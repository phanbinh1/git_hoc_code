import React, { useState, useEffect } from 'react';
import { Modal, Button, Badge, Popover } from "antd";
import ListCoSo from "./list";
import { CONST_LOAI_CO_SO } from '../../../../../constants/constants';

const CoSoSanXuatKinhDoanhPopupSearch = ({
    visible = false,
    onCancel,
    onSelectCoSo,
    coSoSelected = [],
    coSoDisabled = [],
    mode = "default" || "multiple",
    searchText = ""
}) => {
    const [_rowSelected, _setRowSelected] = useState([]);
    useEffect(() => {
        _setRowSelected((coSoSelected && Array.isArray(coSoSelected) ? coSoSelected : []).filter(item => !item.loaiCoSo || item.loaiCoSo === CONST_LOAI_CO_SO.COSO_BANATTP));
    }, [coSoSelected])

    return (
        <React.Fragment >
            <Modal
                destroyOnClose
                title={<React.Fragment>
                    Danh sách cơ sở
                    <Popover
                        overlayClassName="popover-tutorial-overlay danger"
                        content="Nhấp đúp vào dòng bất kì để chọn cơ sở."
                    >
                        <Badge color="red" status="processing" className="m-l-10 c-pointer" />
                    </Popover>
                </React.Fragment>}
                visible={visible}
                onCancel={typeof onCancel === "function" ? onCancel : null}
                width={1200}
                style={{ top: 50 }}
                footer={[
                    <Button onClick={typeof onCancel === "function" ? onCancel : null} key="default">
                        <i className="fa fa-times m-r-5" />Đóng
                    </Button>,
                    <Button
                        onClick={() => {
                            const _coSoSelected = _rowSelected.map(item => ({ ...item, loaiCoSo: CONST_LOAI_CO_SO.COSO_BANATTP }))
                            if (mode === "multiple") {
                                typeof onSelectCoSo === "function" && onSelectCoSo(_rowSelected);
                            }
                            else {
                                _rowSelected.length === 1 && typeof onSelectCoSo === "function" && onSelectCoSo(_rowSelected[0]);
                            }
                            typeof onCancel === "function" && onCancel();
                        }}
                        key="primary"
                        type="primary"
                    // disabled={mode === "multiple" ? false : !_rowSelected.length === 1}
                    >
                        <i className="fa fa-save m-r-5" />Chọn
                    </Button>
                ]}
            >
                <ListCoSo
                    onClick={(item) => {
                        typeof onSelectCoSo === "function" && onSelectCoSo({ ...item, loaiCoSo: CONST_LOAI_CO_SO.COSO_BANATTP });
                        typeof onCancel === "function" && onCancel();
                    }}
                    searchText={searchText}
                    coSoSelected={(coSoSelected && Array.isArray(coSoSelected) ? coSoSelected : []).filter(item => !item.loaiCoSo || item.loaiCoSo === CONST_LOAI_CO_SO.COSO_BANATTP)}
                    coSoDisabled={coSoDisabled}
                    mode={mode}
                    _rowSelected={_rowSelected}
                    _setRowSelected={_setRowSelected}
                />
            </Modal>
        </React.Fragment >
    );
}

export default CoSoSanXuatKinhDoanhPopupSearch;