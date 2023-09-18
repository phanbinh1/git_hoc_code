import { Button } from "antd";
import React, { Fragment, useState } from "react";
import ModalThanhPhanHoSoMotCua from "./thanh_phan_ho_so";

const BtnThanhPhanHoSo = ({
    maHoSoMotCua,
    children,
    btnType,
    viewType
}) => {
    const [visible, setVisible] = useState(false);
    return <Fragment>
        <ModalThanhPhanHoSoMotCua
            visible={visible}
            onCancel={() => setVisible(false)}
            maHoSoMotCua={maHoSoMotCua}
            viewType={viewType}
        />
        <Button onClick={() => setVisible(true)} type={btnType || "success"}>
            {
                children ?
                    children :
                    <Fragment>
                        <i className="fa fa-file-text-o m-r-5" />Thành phần hồ sơ
                    </Fragment>
            }
        </Button>
    </Fragment>
}

export default BtnThanhPhanHoSo;