import React, { Fragment, useState } from "react";
import AccountDepartment from "./department";
import AccountRegency from "./regency";

const TabChucDanh = ({ account, onUpdate, readOnly }) => {
    const [editing, setEditing] = useState(false);
    return <Fragment>
        <AccountDepartment
            readOnly
            account={account}
            onUpdate={onUpdate}
            editing={editing}
            setEditing={setEditing}
        />
        <AccountRegency
            readOnly
            account={account}
            onUpdate={onUpdate}
            editing={editing}
            setEditing={setEditing}
        />
    </Fragment>
}
export default TabChucDanh;