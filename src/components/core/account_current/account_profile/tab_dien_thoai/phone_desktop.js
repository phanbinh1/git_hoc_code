import React, { useState, Fragment } from 'react';
import { Input, Divider, Button, Badge } from 'antd';

const AccountPhoneDesktop = ({ account, onUpdate, readOnly }) => {
    const [edit, setEdit] = useState(false);
    const [value, setValue] = useState(account.desktopPhoneNumber);
    const [loading, setLoading] = useState(false);

    return <div className="profile-alert">
        <div className="row">
            <div className="col-md-4">
                Điện thoại cố định
                {!readOnly && !account.desktopPhoneNumber && <Badge dot={true} />}
            </div>
            <div className="col-md-8">
                <div className="row">
                    <div className="col-md-12">
                        {
                            edit && !readOnly ?
                                <Fragment>
                                    <Input
                                        placeholder="Điện thoại cố định"
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
                                                        block
                                                        type="primary"
                                                        onClick={() => {
                                                            setLoading(true);
                                                            onUpdate({
                                                                data: { ...account, desktopPhoneNumber: value },
                                                                requestSuccess: () => {
                                                                    setEdit(false);
                                                                    setLoading(false);
                                                                },
                                                                requestError: () => {
                                                                    setLoading(false);
                                                                }
                                                            })
                                                        }}
                                                        disabled={account.desktopPhoneNumber === value}
                                                        children={<Fragment><i className="fa fa-save m-r-10" />Cập nhật</Fragment>}
                                                    />
                                                </div>
                                                <div className="col-md-6 m-b-10">
                                                    <Button
                                                        block
                                                        onClick={() => {
                                                            setValue(account.desktopPhoneNumber)
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
                                    {account.desktopPhoneNumber}
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

export default AccountPhoneDesktop;