import React, { useState, Fragment } from 'react';
import { Input, Divider, Button, Badge } from 'antd';

const AccountPhone = ({ account, onUpdate, readOnly }) => {
    const [edit, setEdit] = useState(false);
    const [value, setValue] = useState(account.phoneNumber);
    const [loading, setLoading] = useState(false);

    return <div className="profile-alert">
        <div className="row">
            <div className="col-md-4">
                Di động
                {!readOnly && !account.phoneNumber && <Badge dot={true} />}
            </div>
            <div className="col-md-8">
                <div className="row">
                    <div className="col-md-12">
                        {
                            edit && !readOnly ?
                                <Fragment>
                                    <Input
                                        placeholder="Điện thoại di động"
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
                                                                data: { ...account, phoneNumber: value },
                                                                requestSuccess: () => {
                                                                    setEdit(false);
                                                                    setLoading(false);
                                                                },
                                                                requestError: () => {
                                                                    setLoading(false);
                                                                }
                                                            })
                                                        }}
                                                        disabled={account.phoneNumber === value}
                                                        children={<Fragment><i className="fa fa-save m-r-10" />Cập nhật</Fragment>}
                                                    />
                                                </div>
                                                <div className="col-md-6 m-b-10">
                                                    <Button
                                                        block
                                                        onClick={() => {
                                                            setValue(account.phoneNumber)
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
                                    {account.phoneNumber}
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

export default AccountPhone;