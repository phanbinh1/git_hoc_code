import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import ThongKeBaoCaoSerch from "../../../../components/app/quan_ly_chuoi_thuc_pham_an_toan/thong_ke_bao_cao/thong_ke_bao_cao_search";
import ThongKeBaoCaoList from "../../../../components/app/quan_ly_chuoi_thuc_pham_an_toan/thong_ke_bao_cao/thong_ke_bao_cao_list";
import * as actThongKeBaoCao from "../../../../actions/app/quan_ly_chuoi_thuc_pham_an_toan/thong_ke_bao_cao/thong_ke_bao_cao";
import * as act from "../../../../actions/index";
import * as pageKeys from "../../../../constants/page_key";

const ThongKeBaoCao = ({ queryVariable, location, history, ...props }) => {
    const dataSortInit = [
        { key: "id", value: false, sort: 10 }
    ];

    const [pageKey] = useState(pageKeys.PAGE_KEY_CHUOI_THUCPHAM_ANTOAN_REPORT);
    const [dataLoading, setDataLoading] = useState(true);
    const [dataSearch, setDataSearch] = useState({});
    const [dataSort, setDataSort] = useState(dataSortInit);

    const dispatch = useDispatch();
    const getAllRequest = (object = {}) => dispatch(actThongKeBaoCao.getAllRequest({ ...object, pageKey }));
    const onSelectRow = (rows_selected = []) => dispatch(act.selectRow(rows_selected, pageKey));

    const handleStartLoadData = () => setDataLoading(true);
    const handleEndLoadData = () => setDataLoading(false);
    const handleChangeDataSearch = (value = {}) => setDataSearch(value);
    const handleChangeDataSort = (dataSort) => setDataSort(dataSort);

    return (
        <React.Fragment>
            <div style={{ margin: 20 }}>
                <ThongKeBaoCaoSerch
                    getAllRequest={getAllRequest}
                    onSelectRow={onSelectRow}
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
                    onSelectRow={onSelectRow}
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