import React, { useState, Fragment } from 'react';
import { Input, Divider, Button } from 'antd';

const AccountEmail = ({ account, onUpdate, readOnly }) => {
    const [edit, setEdit] = useState(false);
    const [value, setValue] = useState(account.email);
    const [loading, setLoading] = useState(false);

    return <div className="profile-alert">
        <div className="row">
            <div className="col-md-4">Email</div>
            <div className="col-md-8">
                <div className="row">
                    <div className="col-md-12">
                        {
                            edit && !readOnly ?
                                <Fragment>
                                    <Input
                                        placeholder="Email"
                                        value={value}
                                        onChange={e => setValue(e.target.value)}
                                        disabled={loading}
                                    />
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
                                                                data: { ...account, email: value },
                                                                requestSuccess: () => {
                                                                    setEdit(false);
                                                                    setLoading(false);
                                                                },
                                                                requestError: () => {
                                                                    setLoading(false);
                                                                }
                                                            })
                                                        }}
                                                        disabled={account.email === value || !value || value.trim() === ""}
                                                        children={<Fragment><i className="fa fa-save m-r-10" />Cập nhật</Fragment>}
                                                    />
                                                </div>
                                                <div className="col-md-6 m-b-10">
                                                    <Button
                                                        block
                                                        onClick={() => {
                                                            setValue(account.email)
                                                            setEdit(false);
                                                        }}
                                                        children={<Fragment><i className="fa fa-times m-r-10" />Hủy</Fragment>}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Fragment> :
                                <Fragment>
                                    {account.email}
                                    {
                                        !readOnly && <div className="pull-right">
                                            <span className="edit m-l-10" onClick={() => {
                                                setEdit(true)
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

export default AccountEmail;