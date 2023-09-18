import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Divider } from "antd";
import ChiTieus from "./../chi_tieu/chi_tieu_list";
import * as actChiTieu from "./../../../../../actions/app/quan_ly_cong_tac_giam_sat_o_nhiem/danh_muc/chi_tieu/chi_tieu";
import * as act from "./../../../../../actions/index";

const ListChiTieu = ({ listChiTieu = [], onChange }) => {
    const [loading, setLoading] = useState(false);
    const [dataSort, setDataSort] = useState([
        { key: "id", value: false, sort: 2 },
        { key: "maChiTieu", value: true, sort: 1 },
        { key: "tenChiTieu", value: true, sort: 0 },
    ])
    const [pageKey] = useState("PAGE_KEY_LOAI_THUC_PHAM_CHI_TIEU");
    const dispatch = useDispatch();
    const onSelectRow = (rows_selected = []) => {
        dispatch(act.selectRow(rows_selected, pageKey));
    };
    const getAllRequest = (object = {}) => {
        dispatch(actChiTieu.getAllRequest({ ...object, pageKey: pageKey }));
    };
    const chi_tieu_list = useSelector(state => state.app.quan_ly_cong_tac_giam_sat_o_nhiem.chi_tieu.list);

    return <div className="form-group">
        <div className="col-md-12">
            <Divider orientation="left">Danh sách chỉ tiêu</Divider>
        </div>
        <div className="col-md-12">
            <ChiTieus
                pageKey={pageKey}
                dataLoading={loading}
                handleStartLoadData={() => setLoading(true)}
                handleEndLoadData={() => setLoading(false)}
                getAllRequest={getAllRequest}
                dataSort={dataSort}
                handleChangeDataSort={(data) => setDataSort(data)}
                dataSearch={{}}
                onSelectRow={(rows) => {
                    let _selectedRowKeys = [];
                    let index = -1;
                    rows.map((id) => {
                        index = listChiTieu.findIndex(item => item.id === id);
                        if (index !== -1 && chi_tieu_list.findIndex(chiTieu => chiTieu.id === id) === -1) {
                            _selectedRowKeys.push(listChiTieu[index]);
                        }
                        index = chi_tieu_list.findIndex(chiTieu => chiTieu.id === id);
                        if (index !== -1) {
                            _selectedRowKeys.push(chi_tieu_list[index]);
                        }
                        return null;
                    })
                    onChange(_selectedRowKeys);
                    onSelectRow(rows)
                }}
                selectedRowKeys={listChiTieu.map(item => item.id)}
                showAction={false}
                hasRowFake={false}
                paginationPlacement="bottom"
            />
        </div>
    </div>
}

export default ListChiTieu;
