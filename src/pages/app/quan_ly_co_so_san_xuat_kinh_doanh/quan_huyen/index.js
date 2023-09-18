import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from "react-router";
import CoSoQuanHuyenComponent from "./../../../../components/app/quan_ly_co_so_san_xuat_kinh_doanh/quan_huyen";
import * as actCoSoSXKDQuanHuyen from "./../../../../actions/app/quan_ly_co_so_san_xuat_kinh_doanh/quan_huyen";
import * as main from "./../../../../constants/main";
import * as act from "./../../../../actions/index";
import * as actID from "./../../../../constants/action_id";

const CoSoQuanHuyen = ({ queryVariable, location, history, ...props }) => {
    const dataSortInit = [
        { key: "stt", value: true, sort: 1 },
    ]

    const [pageKey] = useState("PAGE_KEY_CO_SO_QUAN_QUAN_LY");
    const [isVisiableList, setIsVisiableList] = useState(false);
    const [isVisiableSearch, setIsVisiableSearch] = useState(false);
    const [dataLoading, setDataLoading] = useState(false);
    const [dataSearch, setDataSearch] = useState({});
    const [dataSort, setDataSort] = useState(dataSortInit);


    const dispatch = useDispatch();
    const onSelectRow = (rows_selected = []) => dispatch(act.selectRow(rows_selected, pageKey));
    const getAllRequest = (object = {}) => dispatch(actCoSoSXKDQuanHuyen.getAllRequest({ ...object, pageKey }));

    useEffect(() => {
        if (queryVariable.action) {
            if (queryVariable.action === actID.ACT_ID_CSSXKD_QUAN_HUYEN.ACT_SEARCH) {
                onSearch();
            }
            if (queryVariable.action === actID.ACT_ID_CSSXKD_QUAN_HUYEN.ACT_LIST) {
                onList();
            }
        }
    }, [queryVariable.action, queryVariable.id])

    const handleSearch = () => {
        let url = `${location.pathname}?`;
        let objectQueryVariable = {};
        objectQueryVariable.action = actID.ACT_ID_CSSXKD_QUAN_HUYEN.ACT_SEARCH;
        url += main.parseObjectToParams(objectQueryVariable);
        history.push(url);
    };

    const onSearch = () => {
        setIsVisiableList(true);
        setIsVisiableSearch(true);
    };
    const handleList = () => {
        let url = `${location.pathname}?`;
        let objectQueryVariable = {};
        objectQueryVariable.action = actID.ACT_ID_CSSXKD_QUAN_HUYEN.ACT_LIST;
        url += main.parseObjectToParams(objectQueryVariable);
        history.push(url);
    };

    const onList = () => {
        setIsVisiableList(true);
        setIsVisiableSearch(false);
    };

    const handleBack = (handleList);

    const handleStartLoadData = () => setDataLoading(true);
    const handleEndLoadData = () => setDataLoading(false);
    const handleChangeDataSearch = (value = {}) => setDataSearch(value);
    const handleChangeDataSort = (dataSort) => setDataSort(dataSort);

    return (
        <React.Fragment>
            {!queryVariable.action && <Redirect to={`${location.pathname}?action=${actID.ACT_ID_CSSXKD_QUAN_HUYEN.ACT_LIST}`} />}
            <CoSoQuanHuyenComponent
                pageKey={pageKey}
                isVisiableList={isVisiableList}
                isVisiableSearch={isVisiableSearch}
                dataLoading={dataLoading}
                dataSearch={dataSearch}
                getAllRequest={getAllRequest}
                onSelectRow={onSelectRow}
                handleBack={handleBack}
                handleSearch={handleSearch}
                handleStartLoadData={handleStartLoadData}
                handleEndLoadData={handleEndLoadData}
                handleChangeDataSearch={handleChangeDataSearch}
                dataSort={dataSort}
                handleChangeDataSort={handleChangeDataSort}
            />
        </React.Fragment>
    );
}

export default CoSoQuanHuyen;