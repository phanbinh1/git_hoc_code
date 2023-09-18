import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ThongKeBaoCaoSerch from "../../../components/app/quan_ly_ho_so_tu_cong_bo/thong_ke_bao_cao_search";
import ThongKeBaoCaoList from "../../../components/app/quan_ly_ho_so_tu_cong_bo/thong_ke_bao_cao_list";
import * as actThongKeBaoCao from "../../../actions/app/quan_ly_ho_so_tu_cong_bo/thongke_baocao";
import * as act from "../../../actions/index";
import * as pageKeys from "../../../constants/page_key";
import * as actID from "./../../../constants/action_id";

const ThongKeBaoCao = ({ queryVariable, location, history, ...props }) => {
    const dataSortInit = []

    const [pageKey] = useState(pageKeys.PAGE_KEY_CONG_TAC_THONGKE_BAOCAO);
    const [dataLoading, setDataLoading] = useState(true);
    const [dataSearch, setDataSearch] = useState({});
    const [dataSort, setDataSort] = useState(dataSortInit);

    const dispatch = useDispatch();
    const getAllRequest = (object = {}) => dispatch(actThongKeBaoCao.getAllRequest({ ...object, pageKey }));

    const handleStartLoadData = () => setDataLoading(true);
    const handleEndLoadData = () => setDataLoading(false);
    const handleChangeDataSearch = (value = {}) => setDataSearch(value);
    const handleChangeDataSort = (dataSort) => setDataSort(dataSort);

    const setAction = (arrAction = []) => {
        dispatch(act.setAction(arrAction))
    };
    useEffect(() => {
        setAction([
            { key: actID.ACT_ID_HO_SO_TU_CONG_BO.ACT_SEARCH, hidden: true },
            { key: actID.ACT_ID_HO_SO_TU_CONG_BO.ACT_CREATE, hidden: true },
            { key: actID.ACT_ID_HO_SO_TU_CONG_BO.ACT_DELETE, hidden: true },
            { key: actID.ACT_ID_HO_SO_TU_CONG_BO.ACT_THONGBAOCONGBO, hidden: true },
            { key: actID.ACT_BACK, hidden: true }
        ])
    }, []);

    return (
        <React.Fragment>
            <div style={{ margin: 20 }}>
                <ThongKeBaoCaoSerch
                    getAllRequest={getAllRequest}
                    handleStartLoadData={handleStartLoadData}
                    handleEndLoadData={handleEndLoadData}
                    handleChangeDataSearch={handleChangeDataSearch}
                    handleChangeDataSort={handleChangeDataSort}
                />
            </div>
            <div>
                <ThongKeBaoCaoList
                    {...props}
                    getAllRequest={getAllRequest}
                    pageKey={pageKey}
                    dataLoading={dataLoading}
                    dataSearch={dataSearch}
                    dataSort={dataSort}
                    handleStartLoadData={handleStartLoadData}
                    handleEndLoadData={handleEndLoadData}
                    handleChangeDataSearch={handleChangeDataSearch}
                    handleChangeDataSort={handleChangeDataSort}
                />
            </div>
        </React.Fragment>
    );
}

export default ThongKeBaoCao;