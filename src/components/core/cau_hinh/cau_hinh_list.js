import React, { useState, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { CommonTable, CommonTableAction } from "./../../common";
import { orderBy } from "lodash";
import * as actID from "./../../../constants/action_id";
import * as apiUrl from "./../../../constants/api";
import * as main from "./../../../constants/main";
import * as messages from "./../../../constants/message";
import { cauHinhOptions } from '../../../App';
import { get } from '../../../util/api_call';
import { API_VBDH_DONG_BO } from "./../../../constants/api";
import ReactJson from "react-json-view";
import { Drawer, Modal } from 'antd';
import DongBoMotCuaForm from './dong_bo_mot_cua_form';

const mas = [
    "login_setup",
    "vanbandieuhanh_info",
    "ma_tthc_thamdinh_giaycnattp",
    "version_info",
    "cauhinh_guimail"
]

const GiaTri = ({ giaTri }) => {
    const config = useSelector(state => state.constants.CONST_REACT_JSON_CONFIG);
    try {
        const src = JSON.parse(`${giaTri}`);
        return typeof src === "number" ? src : <ReactJson {...config} src={src} />
    }
    catch (e) { }
    return giaTri;
}

const CauHinhList = ({
    handleEdit,
    handleDelete,
    getAllRequest,
    handleEndLoadData,
    handleStartLoadData,
    dataLoading,
    pageKey,
    onSelectRow
}) => {
    const cau_hinh_list = useSelector(state => state.core.cau_hinh.list);
    const [detail, setDetail] = useState({
        visible: false,
        item: null,
        onShow: (item) => setDetail(detail => ({ ...detail, visible: true, item })),
        onCancel: () => setDetail(detail => ({ ...detail, visible: false })),
    })
    const [motcua, setMotCua] = useState(false);
    const renderAction = (item) => {
        return <React.Fragment>
            <CommonTableAction
                actions={[
                    {
                        idChucNang: actID.ACT_ID_CAU_HINH.ACT_DELETE,
                        hidden: mas.includes(item.ma),
                        confirm: true,
                        confirmLabel: "Bạn chắc chắn muốn xóa?",
                        type: "danger",
                        onClick: () => handleDelete(false, item.id)
                    },
                    {
                        idChucNang: actID.ACT_ID_CAU_HINH.ACT_UPDATE,
                        onClick: () => handleEdit(item.id),
                        type: "success"
                    },
                    {
                        hidden: item.ma !== "vanbandieuhanh_info",
                        label: "Đồng bộ văn bản",
                        icon: "fa fa-download",
                        onClick: () => {
                            get({
                                url: API_VBDH_DONG_BO,
                                requestSuccess: () => {
                                    messages.success({ content: "Đã đồng bộ văn bản!" });
                                },
                                requestError: () => {
                                    messages.error({ content: "Đồng bộ văn bản thất bại!" });
                                }
                            })
                        }
                    },
                    {
                        hidden: item.ma !== "dong_bo_mot_cua",
                        label: "Đồng bộ một cửa",
                        icon: "fa fa-refresh",
                        onClick: () => {
                            setMotCua(true);
                        }
                    }
                ]}
            />
        </React.Fragment>
    };

    const handleGetAllRequest = (value = {}) => {
        handleStartLoadData();
        getAllRequest({
            data: value,
            requestSuccess: () => {
                handleEndLoadData();
            },
            requestError: () => {
                handleEndLoadData();
            }
        });

    };

    const columns = [
        {
            title: 'STT',
            dataIndex: 'stt',
        },
        {
            title: 'Mã',
            dataIndex: 'ma',
            width: 150
        },
        {
            title: "Tên",
            dataIndex: "ten",
            width: 150,
            render: (text, item, i) => <Fragment>
                <span className="link" onClick={() => detail.onShow(item)}>{text}</span>
            </Fragment>
        },
        {
            title: 'Sắp xếp',
            dataIndex: 'sapXep',
            align: "center",
            width: 70
        },
        {
            title: "Thao tác",
            dataIndex: 'actions',
            align: "center",
            width: 140,
            fixed: "right"
        }
    ];
    const data = orderBy(cau_hinh_list, ['sapXep'], ['asc']).map((item, index) => ({
        key: item.id,
        stt: index + 1,
        ...item,
        disabled: mas.includes(item.ma),
        actions: renderAction(item)
    }));

    return (
        <React.Fragment>
            <Modal title="Đồng bộ hồ sơ một cửa" visible={motcua} onCancel={() => { setMotCua(false) }} footer={null}>
                <DongBoMotCuaForm />
            </Modal>
            <Drawer visible={detail.visible} onClose={detail.onCancel} title="Giá trị" width={500}>
                <GiaTri giaTri={detail.item && detail.item.giaTri ? (detail.item.ma === "login_setup" ? cauHinhOptions.render(detail.item.giaTri) : detail.item.giaTri) : undefined} />
            </Drawer>
            <CommonTable
                columns={columns}
                dataSource={data}
                loading={dataLoading}
                bordered={true}
                isPagination={false}
                onChange={handleGetAllRequest}
                pageKey={pageKey}
                onSelectRow={onSelectRow}
                controllerKey={main.encode(apiUrl.API_CAU_HINH)}
            />
        </React.Fragment >
    );
}

export default CauHinhList;