import React, { Fragment } from "react";
import { useSelector } from "react-redux";

const CommonPhongBan = ({ maPhongBan }) => {
    const phong_bans = useSelector(state => state.core.account.phong_bans);
    const phongBan = phong_bans.find(pb => pb.ma === maPhongBan);
    return <Fragment>
        {phongBan && phongBan.ten}
    </Fragment>
}

export default CommonPhongBan;