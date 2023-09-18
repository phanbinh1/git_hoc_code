import React, { Fragment, useState } from "react";
import { Button } from "antd";
import { ModalTrinhKyBieuMauCongTacThanhKiemTra } from "../../../common/common_modal_trinh_ky_vbdh/thanh_kiem_tra";

const TrinhKy = ({
    bieuMauType,
    entityId,
    bieuMau,
    onChangeTrangThaiKy
}) => {

    const [visible, setVisible] = useState(false);

    return <Fragment>
        <Button
            type="success"
            className="m-r-10"
            onClick={() => setVisible(true)}
        >
            <i className="fa fa-share m-r-10" />Trình ký
        </Button>
        <ModalTrinhKyBieuMauCongTacThanhKiemTra
            visible={visible}
            onCancel={() => setVisible(false)}
            bieuMau={bieuMau}
            bieuMauType={bieuMauType}
            entityId={entityId}
            callback={onChangeTrangThaiKy}
        />
    </Fragment>
}

export default TrinhKy;