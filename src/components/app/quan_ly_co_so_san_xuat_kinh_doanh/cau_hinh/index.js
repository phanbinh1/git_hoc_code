import React, { useEffect, useState } from 'react';
import { CommonFormContent, CommonForm } from "./../../../common";
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'antd';
import { formValueSelector } from 'redux-form';
import { get, getCauHinh } from './../../../../util/api_call';
import { API_LOCALITY_GET_CHILDREN } from './../../../../constants/api';
import { CONST_DEFAULT_TINHTHANH } from './../../../../constants/constants';
import * as actCauHinh from "./../../../../actions/core/cau_hinh";
import QuanHuyenQuanLy from "./quan_huyen_list";

const CauHinhCoSoQuanLyTheoQuanHuyen = () => {
    const form = "FORM_QLCSSXKD_CAUHINH";
    const phongBans = useSelector(state => state.core.account.phong_bans);
    const phongBanStores = useSelector(state => formValueSelector(form)(state, "phongBans"))

    const [initialValues, setInitialValues] = useState({});
    const [quanHuyens, setQuanHuyens] = useState([]);

    const dispatch = useDispatch();
    const createRequest = (object = {}) => dispatch(actCauHinh.createRequest(object));
    const updateRequest = (object = {}) => dispatch(actCauHinh.updateRequest(object));

    useEffect(() => {
        const quanHuyens = async () => {
            const res = await get({
                url: API_LOCALITY_GET_CHILDREN(CONST_DEFAULT_TINHTHANH.ma)
            })
            if (res && res.status && Array.isArray(res.result)) {
                setQuanHuyens(res.result);
            }
        }
        quanHuyens();

        const getData = async () => {
            const res = await getCauHinh({ ma: "cau_hinh_phong_ban_quan_ly_co_so_theo_dia_ban" });
            if (res && res.status) {
                let initialValues = res.result;
                let data = {};
                let phongBans = [];
                try {
                    data = JSON.parse(initialValues.giaTri || "");
                    const _res = JSON.parse(initialValues.giaTri || "");
                    phongBans = _res && Array.isArray(_res.phongBans) ? _res.phongBans : [];
                }
                catch (e) { data = {}; }

                initialValues = { ...initialValues, ...data, phongBans };
                setInitialValues(initialValues)
            }
        }
        getData();
    }, [])

    const requestSuccess = (res) => {
        if (res && res.status) {
            let initialValues = res.result;
            let data = {};
            let phongBans = [];
            try {
                data = JSON.parse(initialValues.giaTri || "");
                const _res = JSON.parse(initialValues.giaTri || "");
                phongBans = _res && Array.isArray(_res.phongBans) ? _res.phongBans : [];
            }
            catch (e) { data = {}; }

            initialValues = { ...initialValues, ...data, phongBans };
            setInitialValues(initialValues)
        }
    }
    const onSubmit = (values) => {
        try {
            const data = {
                id: values.id,
                ten: values.ten,
                ma: values.ma,
                sapXep: values.sapXep,
                giaTri: JSON.stringify({ phongBans: values.phongBans || [] }, null, "\t")
            };
            if (values.hasOwnProperty("id")) {
                updateRequest({
                    data,
                    requestSuccess
                });
            }
            else {
                createRequest({
                    data,
                    requestSuccess
                });
            }
        }
        catch (e) { }
    }

    return <CommonForm
        style={{ paddingTop: 0 }}
        onSubmit={onSubmit}
        form={form}
        initialValues={initialValues}
        data={[
            [
                {
                    type: "custom",
                    renderCustom: <CommonFormContent
                        data={[
                            [
                                {
                                    type: "custom",
                                    renderCustom: <Table
                                        rowKey="ma"
                                        pagination={false}
                                        columns={[
                                            {
                                                title: "STT",
                                                align: "center",
                                                width: 50,
                                                render: (_, r, index) => index + 1
                                            },
                                            {
                                                title: "Mã phòng ban",
                                                dataIndex: "ma"
                                            },
                                            {
                                                title: "Tên phòng ban",
                                                dataIndex: "ten"
                                            }
                                        ]}
                                        expanded
                                        expandedRowRender={(pb, i) => <QuanHuyenQuanLy
                                            key={i}
                                            phongBan={pb}
                                            quanHuyens={quanHuyens}
                                            form={form}
                                            phongBanStores={phongBanStores || []}
                                        />}
                                        dataSource={phongBans}
                                        bordered
                                        size="small"
                                    />
                                }
                            ],
                        ]}
                    />
                }
            ]
        ]}
    />
}

export default CauHinhCoSoQuanLyTheoQuanHuyen;