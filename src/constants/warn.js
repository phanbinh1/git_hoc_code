import React from "react";
import * as url from "./url";
import * as main from "./main";

export const WARN_PERMISSION_URL_NOT_FOUND = value => {
    return (value && main.convertObjectToArray(url).indexOf(value) === -1) ?
        <React.Fragment key="warn-url">
            <span key="warn-1">Đường dẫn này không được tìm thấy.</span><br />
            <span key="warn-2">Nếu bạn muốn tiếp tục có thể dẫn đến lỗi không tìm thấy trang!</span>
        </React.Fragment> :
        undefined;
}