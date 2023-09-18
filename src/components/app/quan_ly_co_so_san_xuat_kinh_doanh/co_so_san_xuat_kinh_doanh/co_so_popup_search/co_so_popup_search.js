import React, { useState, useEffect } from 'react';
import { Modal, Button, Badge, Popover, Tabs } from "antd";
import CoSoBan from "./cosoban";
import { CONST_LOAI_CO_SO } from '../../../../../constants/constants';
import ListCoSoNgoai from './cosongoai';
import CoSoQuanHuyen from './cosoquanhuyen';
import CoSoCapGCN from './cosocapgcn';

import { createID } from '../../../../../constants/main';

const CoSoSanXuatKinhDoanhPopupSearch = ({
    visible = false,
    onCancel,
    onSelectCoSo,
    coSoSelected = [],
    coSoDisabled = [],
    mode = "default" || "multiple",
    searchText = "",
    loaiCoSos = [CONST_LOAI_CO_SO.COSO_BANATTP],
    idKeHoachThanhTra
}) => {
    const [coSoBanSelected, setCoSoBanSelected] = useState([]);
    const [coSoNgoaiSelected, setCoSoNgoaiSelected] = useState([]);
    const [coQuanHuyenSelected, setCoQuanHuyenSelected] = useState([]);
    const [coBanNgoaiKeHoachSelected, setCoBanNgoaiKeHoachSelected] = useState([]);
    useEffect(() => {
        setCoSoBanSelected((coSoSelected && Array.isArray(coSoSelected) ? coSoSelected : []).filter(item => !item.loaiCoSo || item.loaiCoSo === CONST_LOAI_CO_SO.COSO_BANATTP));
        setCoSoNgoaiSelected((coSoSelected && Array.isArray(coSoSelected) ? coSoSelected : []).filter(item => item.loaiCoSo === CONST_LOAI_CO_SO.COSO_NGOAI));
        setCoQuanHuyenSelected((coSoSelected && Array.isArray(coSoSelected) ? coSoSelected : []).filter(item => item.loaiCoSo === CONST_LOAI_CO_SO.COSO_QUANHUYEN));
        setCoBanNgoaiKeHoachSelected((coSoSelected && Array.isArray(coSoSelected) ? coSoSelected : []).filter(item => item.loaiCoSo === CONST_LOAI_CO_SO.COSO_CAPGCN));
    }, [coSoSelected])
    return (
        <React.Fragment >
            <Modal
                destroyOnClose
                title={<React.Fragment>
                    Danh sách cơ sở
                    {/* <Popover
                        overlayClassName="popover-tutorial-overlay danger"
                        content="Nhấp đúp vào dòng bất kì để chọn cơ sở."
                    >
                        <Badge color="red" status="processing" className="m-l-10 c-pointer" />
                    </Popover> */}
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
                            const coSoSelected = [
                                ...coSoBanSelected.map(item => ({ ...item, loaiCoSo: CONST_LOAI_CO_SO.COSO_BANATTP })),
                                ...coSoNgoaiSelected.map(item => ({ ...item, loaiCoSo: CONST_LOAI_CO_SO.COSO_NGOAI })),
                                ...coQuanHuyenSelected.map(item => ({
                                    diaDiem: item.diaChiCoSo,
                                    loaiCoSo: CONST_LOAI_CO_SO.COSO_QUANHUYEN,
                                    tinhThanh: { ma: item.maTinhThanh },
                                    quanHuyen: { ma: item.maQuanHuyen },
                                    xaPhuong: { ma: item.maPhuong, ten: item.phuong },
                                    ...item,
                                })),
                            ];
                            if (mode === "multiple") {
                                typeof onSelectCoSo === "function" && onSelectCoSo(coSoSelected);
                            }
                            else {
                                coSoSelected.length === 1 && typeof onSelectCoSo === "function" && onSelectCoSo(coSoSelected[0]);
                            }
                            typeof onCancel === "function" && onCancel();
                        }}
                        key="primary"
                        type="primary"
                    >
                        <i className="fa fa-save m-r-5" />Chọn
                    </Button>
                ]}
                bodyStyle={{ padding: 0 }}
            >
                <Tabs>
                    {loaiCoSos.includes(CONST_LOAI_CO_SO.COSO_BANATTP) && <Tabs.TabPane tab="Cơ sở ban quản lý" key={CONST_LOAI_CO_SO.COSO_BANATTP} style={{ padding: 20 }}>
                        <CoSoBan
                            onClick={(item) => {
                                typeof onSelectCoSo === "function" && onSelectCoSo(item.map(cs => ({ ...cs, loaiCoSo: CONST_LOAI_CO_SO.COSO_BANATTP })));
                                typeof onCancel === "function" && onCancel();
                            }}
                            searchText={searchText}
                            coSoSelected={(coSoSelected && Array.isArray(coSoSelected) ? coSoSelected : []).filter(item => !item.loaiCoSo || item.loaiCoSo === CONST_LOAI_CO_SO.COSO_BANATTP)}
                            coSoDisabled={coSoDisabled}
                            mode={mode}
                            _rowSelected={coSoBanSelected}
                            _setRowSelected={setCoSoBanSelected}
                        />
                    </Tabs.TabPane>}
                    {loaiCoSos.includes(CONST_LOAI_CO_SO.COSO_QUANHUYEN) && <Tabs.TabPane tab="Cơ sở đồng bộ quận huyện" key={CONST_LOAI_CO_SO.COSO_QUANHUYEN} style={{ padding: 20 }}>
                        <CoSoQuanHuyen
                            onClick={(item) => {
                                typeof onSelectCoSo === "function" && onSelectCoSo(item.map(cs => ({ ...cs, loaiCoSo: CONST_LOAI_CO_SO.COSO_QUANHUYEN })));
                                typeof onCancel === "function" && onCancel();
                            }}
                            searchText={searchText}
                            coSoSelected={(coSoSelected && Array.isArray(coSoSelected) ? coQuanHuyenSelected : []).filter(item => item.loaiCoSo === CONST_LOAI_CO_SO.COSO_QUANHUYEN)}
                            coSoDisabled={coSoDisabled}
                            mode={mode}
                            _rowSelected={coQuanHuyenSelected}
                            _setRowSelected={setCoQuanHuyenSelected}
                        />
                    </Tabs.TabPane>}
                    {loaiCoSos.includes(CONST_LOAI_CO_SO.COSO_CAPGCN) && idKeHoachThanhTra && <Tabs.TabPane tab="Cơ sở cấp GCN" key={CONST_LOAI_CO_SO.COSO_CAPGCN} style={{ padding: 20 }}>
                        <CoSoCapGCN
                            onClick={(item) => {
                                typeof onSelectCoSo === "function" && onSelectCoSo(item.map(cs => ({ ...cs, loaiCoSo: CONST_LOAI_CO_SO.COSO_CAPGCN })));
                                typeof onCancel === "function" && onCancel();
                            }}
                            searchText={searchText}
                            coSoSelected={(coSoSelected && Array.isArray(coSoSelected) ? coSoSelected : []).filter(item => item.loaiCoSo === CONST_LOAI_CO_SO.COSO_CAPGCN)}
                            coSoDisabled={coSoDisabled}
                            mode={mode}
                            _rowSelected={coBanNgoaiKeHoachSelected}
                            _setRowSelected={setCoBanNgoaiKeHoachSelected}
                            idKeHoachThanhTra={idKeHoachThanhTra}

                        />
                    </Tabs.TabPane>}
                    {loaiCoSos.includes(CONST_LOAI_CO_SO.COSO_NGOAI) && <Tabs.TabPane tab="Cơ sở ngoài" key={CONST_LOAI_CO_SO.COSO_NGOAI} style={{ padding: 20 }}>
                        <ListCoSoNgoai
                            coSoNgoaiSelected={coSoNgoaiSelected.map((item, i) => ({ ...item, uuid: i }))}
                            setCoSoNgoaiSelected={setCoSoNgoaiSelected}
                        />
                    </Tabs.TabPane>}
                </Tabs>
            </Modal>
        </React.Fragment >
    );
}

export default CoSoSanXuatKinhDoanhPopupSearch;