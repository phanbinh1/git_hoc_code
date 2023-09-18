import React, { Fragment } from "react";
import { useSelector } from "react-redux";

const CommonPhongBan = ({ maPhongBan, record, pristine = false }) => {
    const phong_bans = useSelector(state => state.core.account.phong_bans);
    const phongBan = phong_bans.find(pb => pb.ma === maPhongBan);
    return <Fragment>
        {phongBan ? phongBan.ten : (pristine ? maPhongBan : "")} {record && record.daTongHop === true && <i className="fa fa-check text-green" />}
    </Fragment>
}

export default CommonPhongBan;
