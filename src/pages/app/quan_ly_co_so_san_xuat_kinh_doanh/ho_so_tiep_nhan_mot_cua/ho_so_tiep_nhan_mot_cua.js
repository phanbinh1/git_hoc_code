import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from "react-router"
import HoSoTiepNhanMotCuaComponent from "./../../../../components/app/quan_ly_co_so_san_xuat_kinh_doanh/ho_so_tiep_nhan_mot_cua/ho_so_tiep_nhan_mot_cua";
import * as actHoSoTiepNhanMotCua from "./../../../../actions/app/quan_ly_co_so_san_xuat_kinh_doanh/ho_so_tiep_nhan_mot_cua/ho_so_tiep_nhan_mot_cua";
import * as main from "./../../../../constants/main";
import * as act from "./../../../../actions/index";
import * as pageKeys from "./../../../../constants/page_key";
import * as actID from "./../../../../constants/action_id";

const HoSoTiepNhanMotCua = ({ trangThaiDefault = null, ...props }) => {
    const {
        queryVariable,
        location,
        history
    } = props;

    const [pageKey] = useState(pageKeys.PAGE_KEY_HO_SO_TIEP_NHAN_MOT_CUA);
    const [isVisiableList, setIsVisiableList] = useState(true);
    const [isVisiableReport, setIsVisiableReport] = useState(false);
    const [dataLoading, setDataLoading] = useState(true);
    const [dataSearch, setDataSearch] = useState({ daXuLy: true });

    const dispatch = useDispatch();
    const onSelectRow = (rows_selected = []) => dispatch(act.selectRow(rows_selected, pageKey))
    const getAllRequest = (object = {}) => {
        dispatch(actHoSoTiepNhanMotCua.getAllRequest({
            ...object,
            pageKey
        }))
    };
    const checkCoSoExistRequest = (object) => dispatch(actHoSoTiepNhanMotCua.checkCoSoExistRequest(object))
    const checkHoSoExistRequest = (object) => dispatch(actHoSoTiepNhanMotCua.checkHoSoExistRequest(object))
    const handleCreate = (hoSoMotCuaId) => dispatch(actHoSoTiepNhanMotCua.handleCreate(hoSoMotCuaId))

    useEffect(() => {
        onSelectRow([]);
    }, []);

    useEffect(() => {
        if (queryVariable.action) {
            if (queryVariable.action === actID.ACT_ID_HO_SO_TIEP_NHAN_MOT_CUA.ACT_REPORT) {
                onReport();
            }
            if (queryVariable.action === actID.ACT_ID_HO_SO_TIEP_NHAN_MOT_CUA.ACT_LIST) {
                onList();
            }
        }
    }, [queryVariable.action])

    const handleReport = () => {
        let url = `${location.pathname}?`;
        let objectQueryVariable = {}
        objectQueryVariable.action = actID.ACT_ID_HO_SO_TIEP_NHAN_MOT_CUA.ACT_REPORT;
        url += main.parseObjectToParams(objectQueryVariable);
        history.push(url);
    };

    const onReport = () => {
        setIsVisiableList(true);
        setIsVisiableReport(true);
    };

    const handleList = () => {
        let url = `${location.pathname}?`;
        let objectQueryVariable = {}
        objectQueryVariable.action = actID.ACT_ID_HO_SO_TIEP_NHAN_MOT_CUA.ACT_LIST;
        url += main.parseObjectToParams(objectQueryVariable);
        history.push(url);
    };

    const onList = () => {
        setIsVisiableList(true);
        setIsVisiableReport(false);
    };
    const handleBack = (handleList);

    const handleStartLoadData = () => setDataLoading(true);
    const handleEndLoadData = () => setDataLoading(false);
    const handleChangeDataSearch = (value = {}) => setDataSearch(value);

    return (
        <React.Fragment>
            {!queryVariable.action && <Redirect to={`${location.pathname}?action=${actID.ACT_ID_HO_SO_TIEP_NHAN_MOT_CUA.ACT_LIST}`} />}
            <HoSoTiepNhanMotCuaComponent
                {...props}
                trangThaiDefault={trangThaiDefault}
                pageKey={pageKey}
                isVisiableList={isVisiableList}
                isVisiableReport={isVisiableReport}
                dataLoading={dataLoading}
                dataSearch={dataSearch}
                checkCoSoExistRequest={checkCoSoExistRequest}
                checkHoSoExistRequest={checkHoSoExistRequest}
                getAllRequest={getAllRequest}
                onSelectRow={onSelectRow}
                handleBack={handleBack}
                handleCreate={handleCreate}
                handleReport={handleReport}
                handleStartLoadData={handleStartLoadData}
                handleEndLoadData={handleEndLoadData}
                handleChangeDataSearch={handleChangeDataSearch}
            />
        </React.Fragment>
    );
}


export default HoSoTiepNhanMotCua;