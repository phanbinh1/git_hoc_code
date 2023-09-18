import React, { useState, Fragment } from 'react';
import { Select, Divider, Button } from 'antd';
import * as constants from "./../../../../../constants/constants";
const AccountDepartment = ({ account, onUpdate, editing, setEditing, readOnly }) => {
    const [edit, setEdit] = useState(false);
    const [value, setValue] = useState(account.managementDepartment);
    const [loading, setLoading] = useState(false);

    const renderPhongBan = () => {
        const phongBan = constants.CONST_PHONG_BAN.options.find(item => item.value === account.managementDepartment);
        return phongBan ? phongBan.label : account.managementDepartment;
    }
    return <div className={`profile-alert ${editing ? "editing" : ""}`}>
        <div className="row">
            <div className="col-md-4">Phòng ban</div>
            <div className="col-md-8">
                <div className="row">
                    <div className="col-md-12">
                        {edit && !readOnly ?
                            <Fragment>
                                <Select value={value} onChange={value => setValue(value)} style={{ width: "100%" }} disabled={loading}>
                                    {
                                        constants.CONST_PHONG_BAN.options.map((item, i) => {
                                            return <Select.Option value={item.value}>{item.label}</Select.Option>
                                        })
                                    }
                                </Select>
                                <div className="row">
                                    <div className="col-md-12 t-center">
                                        <Divider />
                                        <div className="row">
                                            <div className="col-md-6 m-b-10">
                                                <Button
                                                    type="primary"
                                                    block
                                                    onClick={() => {
                                                        setLoading(true);
                                                        onUpdate({
                                                            data: { ...account, managementDepartment: value },
                                                            requestSuccess: () => {
                                                                setEdit(false);
                                                                setEditing(false);
                                                                setLoading(false);
                                                            },
                                                            requestError: () => {
                                                                setLoading(false);
                                                            }
                                                        })
                                                    }}
                                                    disabled={account.managementDepartment === value}
                                                    children={<Fragment><i className="fa fa-save m-r-10" />Cập nhật</Fragment>}
                                                />
                                            </div>
                                            <div className="col-md-6 m-b-10">
                                                <Button
                                                    block
                                                    onClick={() => {
                                                        setValue(account.managementDepartment)
                                                        setEdit(false);
                                                        setEditing(false);
                                                    }}
                                                    children={<Fragment><i className="fa fa-times m-r-10" />Hủy</Fragment>}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Fragment> :
                            <Fragment>
                                {renderPhongBan()}
                                {
                                    !readOnly && <div className="pull-right">
                                        <span className="edit m-l-10" onClick={() => {
                                            setEdit(true);
                                            setEditing(true);
                                            setLoading(false);
                                        }}>
                                            <i className="fa fa-pencil m-r-5" />Chỉnh sửa
                                    </span>
                                    </div>
                                }
                            </Fragment>
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default AccountDepartment;