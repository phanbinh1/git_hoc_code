import React, { Fragment, useState } from "react";
import { Button } from "antd";
import {
    ModalTrinhKy,
    // ModalTrinhKyTaiLieuDinhKemCuocThanhKiemTra,
    ModalTrinhKyTaiLieuDinhKemQuyetDinhThanhLapDoanGiamSat,
    // ModalTrinhKyTaiLieuDinhKemKeHoachThucHienCuocThanhTra,
    // ModalTrinhKyTaiLieuDinhKemKetLuanCuocThanhKiemTra
} from "../../../common/common_modal_trinh_ky_vbdh/ke_hoach_giam_sat_o_nhiem";
import { CONST_ATTACH_TYPE } from "../../../../constants/constants";

const BtnTrinhKy = ({
    className = "",
    entityId,
    attachEntityType,
    trinhKyCallback
}) => {
    const [visible, setVisible] = useState(false);
    const [daTrinhKy, setDaTrinhKy] = useState(false);

    const onTrinhKyCallback = (trinhKySuccess) => {
        if (trinhKySuccess) {
            setDaTrinhKy(true);
        }
        trinhKyCallback && trinhKyCallback(trinhKySuccess);
    }
    if (!daTrinhKy) {
        switch (attachEntityType) {
            case CONST_ATTACH_TYPE.KEHOACHGIAMSATONHIEM:
                return <Fragment>
                    <ModalTrinhKy
                        entityId={entityId}
                        attachEntityType={attachEntityType}
                        visible={visible}
                        onCancel={() => setVisible(false)}
                        callback={onTrinhKyCallback}
                    />
                    <Button type="success" className={className} onClick={() => setVisible(true)}><i className="fa fa-reply-all m-r-5" />Trình ký</Button>
                </Fragment>

            case CONST_ATTACH_TYPE.QUYETDINHTHANHLAPDOANGIAMSAT:
                return <Fragment>
                    <ModalTrinhKyTaiLieuDinhKemQuyetDinhThanhLapDoanGiamSat
                        entityId={entityId}
                        attachEntityType={attachEntityType}
                        visible={visible}
                        onCancel={() => setVisible(false)}
                        callback={onTrinhKyCallback}
                    />
                    <Button type="success" className={className} onClick={() => setVisible(true)}><i className="fa fa-reply-all m-r-5" />Trình ký</Button>
                </Fragment>
            // case CONST_ATTACH_TYPE.KEHOACHTHANHKIEMTRA:
            //     return <Fragment>
            //         <ModalTrinhKyTaiLieuDinhKemKeHoachThanhKiemTra
            //             entityId={entityId}
            //             attachEntityType={attachEntityType}
            //             visible={visible}
            //             onCancel={() => setVisible(false)}
            //             callback={onTrinhKyCallback}
            //         />
            //         <Button type="success" className={className} onClick={() => setVisible(true)}><i className="fa fa-reply-all m-r-5" />Trình ký</Button>
            //     </Fragment>
            // case CONST_ATTACH_TYPE.CUOCTHANHKIEMTRA:
            //     return <Fragment>
            //         <ModalTrinhKyTaiLieuDinhKemCuocThanhKiemTra
            //             entityId={entityId}
            //             attachEntityType={attachEntityType}
            //             visible={visible}
            //             onCancel={() => setVisible(false)}
            //             callback={onTrinhKyCallback}
            //         />
            //         <Button type="success" className={className} onClick={() => setVisible(true)}><i className="fa fa-reply-all m-r-5" />Trình ký</Button>
            //     </Fragment>
            // case CONST_ATTACH_TYPE.KEHOACHTIENHANHTHANHTRA:
            //     return <Fragment>
            //         <ModalTrinhKyTaiLieuDinhKemKeHoachThucHienCuocThanhTra
            //             entityId={entityId}
            //             attachEntityType={attachEntityType}
            //             visible={visible}
            //             onCancel={() => setVisible(false)}
            //             callback={onTrinhKyCallback}
            //         />
            //         <Button type="success" className={className} onClick={() => setVisible(true)}><i className="fa fa-reply-all m-r-5" />Trình ký</Button>
            //     </Fragment>
            // case CONST_ATTACH_TYPE.KETLUANCUOCTHANHTRA:
            //     return <Fragment>
            //         <ModalTrinhKyTaiLieuDinhKemKetLuanCuocThanhKiemTra
            //             entityId={entityId}
            //             attachEntityType={attachEntityType}
            //             visible={visible}
            //             onCancel={() => setVisible(false)}
            //             callback={onTrinhKyCallback}
            //         />
            //         <Button type="success" className={className} onClick={() => setVisible(true)}><i className="fa fa-reply-all m-r-5" />Trình ký</Button>
            //     </Fragment>
            default: return null;
        }
    }
    else {
        return null;
    }
}

export default BtnTrinhKy;