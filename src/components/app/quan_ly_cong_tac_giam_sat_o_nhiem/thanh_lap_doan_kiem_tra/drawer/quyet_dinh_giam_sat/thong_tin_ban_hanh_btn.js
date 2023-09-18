import React, { Fragment, useState } from "react";
import { Button } from "antd";
import { CommonBanHanh } from "../../../../../common";
import { FieldInput, FieldDate } from "./../../../../../../constants/controll";
import { ACT_ID_THANH_LAP_DOAN_KIEM_TRA } from "../../../../../../constants/action_id";
import { useDispatch, useSelector } from "react-redux";
import { updateQuyetDinhThanhLapDoan, createQuyetDinhThanhLapDoan } from "./../../../../../../actions/app/quan_ly_cong_tac_giam_sat_o_nhiem/cuoc_giam_sat/cuoc_giam_sat";
import { VALIDATE_QTNVTT_KEHOACHTHANHTRA_NGAY_KY_REQUIRED, VALIDATE_QTNVTT_KEHOACHTHANHTRA_NGAY_LAPQD_REQUIRED, VALIDATE_QTNVTT_KEHOACHTHANHTRA_NGUOI_KY_REQUIRED, VALIDATE_QTNVTT_KEHOACHTHANHTRA_SO_QUYET_DINH_REQUIRED } from "../../../../../../constants/validate";
const ThongTinBanHanhBtn = ({
    item,
    id,
    soQuyetDinh,
    ngayKyQuyetDinh,
    ngayLapQuyetDinh,
    nguoiKyQuyetDinh,
    trangThaiQuyetDinhThanhLapGiamSat,
    cuocGiamSat
}) => {
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);
    const permission_priviliged = useSelector(state => state.core.permission.priviliged);
    const allowBanHanh = permission_priviliged.findIndex(item => item.idChucNang === ACT_ID_THANH_LAP_DOAN_KIEM_TRA.ACT_BAN_HANH_QDTLDGS) >= 0;

    const onBanHanh = ({
        data,
        requestSuccess,
        requestError
    }) => {
        const submitData = {
            ...data,
            idCuocGiamSat: cuocGiamSat.id,
        }

        if (id) {
            dispatch(updateQuyetDinhThanhLapDoan({
                data: {
                    ...submitData,
                    id
                },
                requestSuccess,
                requestError
            }))
        } else {
            dispatch(createQuyetDinhThanhLapDoan({
                data: submitData,
                requestSuccess,
                requestError
            }))
        }

    }
    return <Fragment>
        <CommonBanHanh
            key={id || "bh-not-id"}
            visible={visible}
            onCancel={() => setVisible(false)}
            initialValues={id ? {
                soQuyetDinh,
                nguoiKyQuyetDinh,
                ngayKyQuyetDinh,
                ngayLapQuyetDinh,
                id,
                trangThaiQuyetDinhThanhLapGiamSat
            } : {}}
            onBanHanh={onBanHanh}
            trangThaiName="trangThaiQuyetDinhThanhLapGiamSat"
            permission={ACT_ID_THANH_LAP_DOAN_KIEM_TRA.ACT_BAN_HANH_QDTLDGS}
            fields={[
                {
                    label: "Số quyết định",
                    placeholder: "Số quyết định",
                    name: "soQuyetDinh",
                    component: FieldInput,
                    checkValid: true,
                    validate: [VALIDATE_QTNVTT_KEHOACHTHANHTRA_SO_QUYET_DINH_REQUIRED]
                },
                {
                    label: "Ngày lập Quyết định",
                    placeholder: "Ngày lập Quyết định",
                    name: "ngayLapQuyetDinh",
                    component: FieldDate,
                    checkValid: true,
                    validate: [VALIDATE_QTNVTT_KEHOACHTHANHTRA_NGAY_LAPQD_REQUIRED]
                },
                {
                    label: "Người ký",
                    placeholder: "Người ký",
                    name: "nguoiKyQuyetDinh",
                    component: FieldInput,
                    checkValid: true,
                    validate: [VALIDATE_QTNVTT_KEHOACHTHANHTRA_NGUOI_KY_REQUIRED]
                },
                {
                    label: "Ngày ký",
                    placeholder: "Ngày ký",
                    name: "ngayKyQuyetDinh",
                    component: FieldDate,
                    checkValid: true,
                    validate: [VALIDATE_QTNVTT_KEHOACHTHANHTRA_NGAY_KY_REQUIRED]
                },
            ]}
        />
        <Button type="success" onClick={() => setVisible(true)} className="m-r-5">
            <i className="fa fa-pencil-square-o m-r-5" />{allowBanHanh ? "Ban hành" : "Thông tin ban hành"}
        </Button>
    </Fragment>
}

export default ThongTinBanHanhBtn;