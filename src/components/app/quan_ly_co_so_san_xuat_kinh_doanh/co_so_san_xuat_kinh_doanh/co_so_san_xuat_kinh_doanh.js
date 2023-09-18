import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as act from "./../../../../actions/index";
import * as actID from "./../../../../constants/action_id";
import * as constants from "./../../../../constants/constants";
import * as main from "./../../../../constants/main";
import CoSoSanXuatKinhDoanhList from "./co_so_san_xuat_kinh_doanh_list";
import CoSoSanXuatKinhDoanhForm from "./co_so_san_xuat_kinh_doanh_form";
import HoSoTuCongBoForm from "./../../quan_ly_ho_so_tu_cong_bo/ho_so_tu_cong_bo_form";
import Detail from "./co_so_san_xuat_kinh_doanh_detail";
import { Menu, Tabs } from 'antd';
import ModalCreate from './co_so_du_kien/create';
import ModalList from './co_so_du_kien/list';
import { loaiCongBo } from '../../../../pages/app/quan_ly_ho_so_tu_cong_bo/thong_bao_cong_bo_san_pham';
import { useLocation } from 'react-router';

const CoSoSanXuatKinhDoanh = ({
    handleTCBEdit,
    pageKey,
    handleCreate,
    handleDelete,
    handleSearch,
    handleReport,
    handleBack,
    dataLoading,
    dataSort,
    handleChangeDataSort,
    handleDetail,
    handleEdit,
    onSelectRow,
    quanHuyenQuanLys,
    handleBaoCao
}) => {
    const location = useLocation();
    const qs = main.queryString.parse(location.search);

    const rows_selected = useSelector(state => state.core.rows_selected);
    const coSoSelected = main.getItemSelected(rows_selected, pageKey);
    const dispatch = useDispatch();
    const setAction = (arrAction = []) => dispatch(act.setAction(arrAction));

    const [visibleCreate, setVisibleCreate] = useState(false);
    const [visibleList, setVisibleList] = useState(false);
    const [isUpdateList, setIsUpdateList] = useState(false);

    // componentDidUpdate
    useEffect(() => {
        onSetAction();
    }, [qs.action, coSoSelected])

    const onSetAction = () => {
        let arrAction = [];
        arrAction.push(renderActionBack());
        arrAction.push(renderActionSearch());
        arrAction.push(renderActionDelete());
        arrAction.push(renderActionCreate());
        arrAction.push(renderActionReport());
        arrAction.push(renderActionListDraft());
        arrAction.push(renderActionBaoCao())
        setAction(arrAction);
    }

    const renderActionCreate = () => {
        let result = {};
        result.key = actID.ACT_ID_CO_SO_SAN_XUAT_KINH_DOANH.ACT_CREATE;
        result.disabled = false;
        result.hidden = qs.action !== actID.ACT_ID_CO_SO_SAN_XUAT_KINH_DOANH.ACT_LIST;
        result.handleClick = handleCreate;
        result.type = constants.CONST_TYPE_BTN_CREATE;
        return result;
    }

    const renderActionDelete = () => {
        let result = {};
        const selected = main.getItemSelected(rows_selected, pageKey);
        result.key = actID.ACT_ID_CO_SO_SAN_XUAT_KINH_DOANH.ACT_DELETE;
        result.disabled = selected.length > 0 ? false : true;
        result.hidden = qs.action !== actID.ACT_ID_CO_SO_SAN_XUAT_KINH_DOANH.ACT_LIST && qs.action !== actID.ACT_ID_CO_SO_SAN_XUAT_KINH_DOANH.ACT_SEARCH;
        result.handleClick = handleDelete;
        result.type = constants.CONST_TYPE_BTN_DELETE;
        result.isConfirm = true;
        result.confirmTitle = "Bạn chắc chắn muốn xóa"
        result.confirmOkText = "Đồng ý"
        result.confirmOkType = "danger"
        result.confirmCancelText = "Hủy"
        result.text = `Xóa ${selected.length > 0 ? `(${selected.length})` : ""}`;
        return result;
    }

    const renderActionSearch = () => {
        let result = {};
        result.key = actID.ACT_ID_CO_SO_SAN_XUAT_KINH_DOANH.ACT_SEARCH;
        result.disabled = false;
        result.hidden = qs.action !== actID.ACT_ID_CO_SO_SAN_XUAT_KINH_DOANH.ACT_LIST;
        result.handleClick = handleSearch;
        result.type = constants.CONST_TYPE_BTN_SEARCH;
        return result;
    }

    const renderActionBaoCao = () => {
        let result = {};
        result.key = actID.ACT_ID_CO_SO_SAN_XUAT_KINH_DOANH.ACT_EXPORT;
        result.disabled = false;
        result.hidden = qs.action !== actID.ACT_ID_CO_SO_SAN_XUAT_KINH_DOANH.ACT_LIST;
        result.handleClick = handleBaoCao;
        result.type = constants.CONST_TYPE_BTN_SUCCESS;
        return result;
    }

    const renderActionReport = () => {
        let result = {};
        result.key = actID.ACT_ID_CO_SO_SAN_XUAT_KINH_DOANH.ACT_REPORT;
        result.disabled = false;
        result.hidden = qs.action !== actID.ACT_ID_CO_SO_SAN_XUAT_KINH_DOANH.ACT_LIST || qs.action !== actID.ACT_ID_CO_SO_SAN_XUAT_KINH_DOANH.ACT_SEARCH || qs.action === actID.ACT_ID_CO_SO_SAN_XUAT_KINH_DOANH.ACT_REPORT;
        result.handleClick = handleReport;
        result.type = constants.CONST_TYPE_BTN_SEARCH;
        return result;
    }

    const renderActionBack = () => {
        let result = {};
        result.key = actID.ACT_BACK;
        result.disabled = false;
        result.hidden = qs.action === actID.ACT_ID_CO_SO_SAN_XUAT_KINH_DOANH.ACT_LIST;
        result.handleClick = handleBack;
        result.type = constants.CONST_TYPE_BTN_BACK;
        return result;
    }

    const renderActionListDraft = () => {
        let result = {};
        result.key = actID.ACT_ID_CO_SO_SAN_XUAT_KINH_DOANH.ACT_LIST_DRAFT;
        result.disabled = false;
        result.type = constants.CONST_TYPE_BTN_EDIT;
        result.hidden = qs.action !== actID.ACT_ID_CO_SO_SAN_XUAT_KINH_DOANH.ACT_LIST;
        result.dropdown = {
            overlay: <Menu mode="vertical">
                <Menu.Item onClick={() => setVisibleCreate(true)} disabled={coSoSelected.length === 0}><i className="fa fa-plus m-r-5" />Tạo mới</Menu.Item>
                <Menu.Item disabled={coSoSelected.length === 0}
                    onClick={() => {
                        setVisibleList(true);
                        setIsUpdateList(true)
                    }} >
                    <i className="fa fa-pencil-square-o m-r-5" />Thêm vào danh sách đã có
                </Menu.Item>
                <Menu.Item onClick={() => {
                    setVisibleList(true);
                    setIsUpdateList(false)
                }}> <i className="fa fa-file-text-o m-r-5" />Danh sách</Menu.Item>
            </Menu>,
        }
        return result;
    }

    const getActiveKey = () => {
        if (qs.action === actID.ACT_ID_CO_SO_SAN_XUAT_KINH_DOANH.ACT_LIST || qs.action === actID.ACT_ID_CO_SO_SAN_XUAT_KINH_DOANH.ACT_SEARCH || qs.action === actID.ACT_ID_CO_SO_SAN_XUAT_KINH_DOANH.ACT_EXPORT) {
            return "list";
        }
        if (qs.action === actID.ACT_ID_CO_SO_SAN_XUAT_KINH_DOANH.ACT_CREATE || (qs.action === actID.ACT_ID_CO_SO_SAN_XUAT_KINH_DOANH.ACT_UPDATE && qs.id)) {
            return "form";
        }
        if (qs.action === actID.ACT_ID_CO_SO_SAN_XUAT_KINH_DOANH.ACT_TCB_UPDATE && qs.id) {
            return "form-tcb";
        }
        if (qs.action === actID.ACT_ID_CO_SO_SAN_XUAT_KINH_DOANH.ACT_DETAIL && qs.id) {
            return "detail";
        }
        return "loading"
    }

    return <Fragment>
        <ModalCreate visible={visibleCreate} onCancel={() => setVisibleCreate(false)} coSoSelected={coSoSelected} />
        <ModalList
            visible={visibleList}
            onCancel={() => setVisibleList(false)}
            action={{
                delete: true,
                view: true,
                download: true,
                edit: true,
                share: true
            }}
            isUpdate={isUpdateList}
            coSoSelected={coSoSelected}
        />
        <Tabs activeKey={getActiveKey()} className="tab-none-title" animated={false}>
            <Tabs.TabPane key="loading">
                Loading...
            </Tabs.TabPane>
            <Tabs.TabPane key="form">
                <CoSoSanXuatKinhDoanhForm handleBack={handleBack} />
            </Tabs.TabPane>
            <Tabs.TabPane key="list">
                <CoSoSanXuatKinhDoanhList
                    dataLoading={dataLoading}
                    dataSort={dataSort}
                    handleChangeDataSort={handleChangeDataSort}
                    handleDelete={handleDelete}
                    handleDetail={handleDetail}
                    handleEdit={handleEdit}
                    handleTCBEdit={handleTCBEdit}
                    onSelectRow={onSelectRow}
                    pageKey={pageKey}
                    quanHuyenQuanLys={quanHuyenQuanLys}
                />
            </Tabs.TabPane>
            <Tabs.TabPane key="detail">
                <Detail handleTCBEdit={handleTCBEdit} />
            </Tabs.TabPane>
            <Tabs.TabPane key="form-tcb">
                <HoSoTuCongBoForm handleBack={handleBack} loaiCongBo={loaiCongBo} />
            </Tabs.TabPane>
        </Tabs>
    </Fragment>
}

export default CoSoSanXuatKinhDoanh;