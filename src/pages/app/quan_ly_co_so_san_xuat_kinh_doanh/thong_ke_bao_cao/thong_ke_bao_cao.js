import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from "react-router";
import ThongKeBaoCaoComponent from "./../../../../components/app/quan_ly_co_so_san_xuat_kinh_doanh/thong_ke_bao_cao/thong_ke_bao_cao";
import * as actCoSoSanXuatKinhDoanhThongKeBaoCao from "./../../../../actions/app/quan_ly_co_so_san_xuat_kinh_doanh/thong_ke_bao_cao/thong_ke_bao_cao";
import * as pageKeys from "./../../../../constants/page_key";
import * as actID from "./../../../../constants/action_id";

const ThongKeBaoCao = ({ queryVariable, location, history, ...props }) => {
    const dataSortInit = [
        { key: "id", value: false, sort: 12 },
        { key: "tenDangKyKinhDoanh", value: true, sort: 11 },
        { key: "tenCoSo", value: true, sort: 10 },
        { key: "diaDiemKinhDoanh", value: true, sort: 9 },
        // { key: "loaiHinhCoSo.ten", value: true, sort: 8 },
        { key: "soChungNhanAttp", value: true, sort: 5 },
        { key: "ngayCapChungNhanAttp", value: true, sort: 4 },
        { key: "ngayHetHanChungNhanAttp", value: true, sort: 3 }
    ]

    const [pageKey] = useState(pageKeys.PAGE_KEY_CO_SO_SAN_XUAT_KINH_DOANH_THONG_KE_BAO_CAO);
    const [isVisiableList, setIsVisiableList] = useState(false);
    const [dataLoading, setDataLoading] = useState(true);
    const [dataSearch, setDataSearch] = useState({});
    const [dataSort, setDataSort] = useState(dataSortInit);

    const dispatch = useDispatch();
    const getAllRequest = (object = {}) => dispatch(actCoSoSanXuatKinhDoanhThongKeBaoCao.getAllRequest({ ...object, pageKey }));

    useEffect(() => {
        if (queryVariable.action) {
            if (queryVariable.action === actID.ACT_ID_CO_SO_SAN_XUAT_KINH_DOANH_THONG_KE_BAO_CAO.ACT_LIST) {
                setIsVisiableList(true);
            }
            else {
                setIsVisiableList(false);
            }
        }
    }, [queryVariable.action]);

    const handleStartLoadData = () => setDataLoading(true);
    const handleEndLoadData = () => setDataLoading(false);
    const handleChangeDataSearch = (value = {}) => setDataSearch(value);
    const handleChangeDataSort = (dataSort) => setDataSort(dataSort);

    return (
        <React.Fragment>
            {!queryVariable.action && <Redirect to={`${location.pathname}?action=${actID.ACT_ID_CO_SO_SAN_XUAT_KINH_DOANH_THONG_KE_BAO_CAO.ACT_LIST}`} />}
            <ThongKeBaoCaoComponent
                {...props}
                pageKey={pageKey}
                isVisiableList={isVisiableList}
                dataLoading={dataLoading}
                dataSearch={dataSearch}
                dataSort={dataSort}
                getAllRequest={getAllRequest}
                handleStartLoadData={handleStartLoadData}
                handleEndLoadData={handleEndLoadData}
                handleChangeDataSearch={handleChangeDataSearch}
                handleChangeDataSort={handleChangeDataSort}
            />
        </React.Fragment>
    );
}


export default ThongKeBaoCao;