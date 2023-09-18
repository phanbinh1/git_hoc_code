import React, { Fragment } from "react";
import AccountPhoneDesktop from "./phone_desktop";
import AccountPhone from "./phone";

const TabDienThoai = ({ account, onUpdate, readOnly }) => {
    return <Fragment>
        <AccountPhone
            readOnly={readOnly}
            account={account}
            onUpdate={onUpdate}
        />
        <AccountPhoneDesktop
            readOnly={readOnly}
            account={account}
            onUpdate={onUpdate}
        />
    </Fragment>
}
export default TabDienThoai;