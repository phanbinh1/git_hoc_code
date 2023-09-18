import React from "react";
import { Tag, Popover, Badge } from "antd";
import { CONST_PHE_DUYET } from "./../../../constants/constants";
import { findFirstScrollParent } from "../../../constants/main";

const CommonTrangThaiPheDuyet = ({
    trangThaiDuyet,
    lyDoKhongPheDuyet,
    options = CONST_PHE_DUYET.options,
    khongPheDuyetKey = CONST_PHE_DUYET.KHONGPHEDUYET,
}) => {
    const trangThai = options.find(item => item.value === trangThaiDuyet);
    if (trangThai && trangThai.value === khongPheDuyetKey) {
        return <Tag color={trangThai.color}>
            {trangThai.label.toLocaleUpperCase()}
            <Popover
                title="Lý do không phê duyệt"
                content={lyDoKhongPheDuyet}
                trigger={"click"}
                overlayClassName="popover-warning"
                getPopupContainer={e => findFirstScrollParent(e)}
            >
                <Badge status="processing" color="red" className="m-l-10 c-pointer" />
            </Popover>
        </Tag>
    }
    else {
        return trangThai ? <Tag color={trangThai.color}>{trangThai.label.toLocaleUpperCase()}</Tag> : null;
    }
}


export default CommonTrangThaiPheDuyet;