import React, { useState, Fragment, useEffect } from 'react';
import { Button, Modal } from 'antd';
import * as url from "./../../../../../constants/url";
import { CommonQrCode } from '../../../../common';

const AccountName = ({ account, onUpdate, readOnly }) => {
    const [edit, setEdit] = useState(false);
    const [value, setValue] = useState(account.fullName);
    const [loading, setLoading] = useState(false);
    const [visibleQrCode, setVisibleQrCode] = useState(false);
    useEffect(() => {
        if (edit) {
            const input = document.getElementById("profile-full-name-input");
            input && input.focus();
        }
    }, [edit])

    return <Fragment>
        <Modal
            visible={visibleQrCode}
            onCancel={() => setVisibleQrCode(false)}
            title={<Fragment><i className="fa fa-qrcode m-r-10" />Mã QRCode</Fragment>}
            footer={null}
            width={200}
        >
            <center>
                <CommonQrCode size={150} location={{ pathname: url.URL_ACCOUNT_PROFILE, search: { account: account.name } }} />
            </center>
        </Modal>
        <div className="row">
            <div className="col-md-8">
                <i className="fa fa-qrcode fa-2x m-r-10 c-pointer" onClick={() => setVisibleQrCode(true)} />
                {edit && !readOnly ?
                    <input
                        id="profile-full-name-input"
                        className="profile-full-name-input"
                        placeholder="Tên người dùng"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        disabled={loading}
                        onKeyDown={(e) => {
                            if (e.keyCode === 13) {
                                if (value === account.fullName) {
                                    setValue(account.fullName)
                                    setEdit(false);
                                }
                                else {
                                    setLoading(true);
                                    onUpdate({
                                        data: { ...account, fullName: value },
                                        requestSuccess: () => {
                                            setEdit(false);
                                            setLoading(false);
                                        },
                                        requestError: () => {
                                            setLoading(false);
                                        }
                                    })
                                }
                            }
                            if (e.keyCode === 27) {
                                setValue(account.fullName)
                                setEdit(false);
                            }
                        }}
                    /> :
                    <Fragment>
                        <span
                            onClick={() => {
                                setEdit(true)
                                setLoading(false);
                            }}
                            style={{ marginLeft: 10 }}
                        >
                            <span className="profile-full-name-label">{account.fullName}</span>
                            {
                                !readOnly && <span className="edit m-l-10" >
                                    <i className="fa fa-pencil m-r-5" />
                                </span>
                            }
                        </span>
                    </Fragment>
                }
            </div>
            {
                edit && !readOnly && <div className="col-md-4" >
                    <Button
                        size="small"
                        disabled={!value || value.trim() === "" || value === account.fullName}
                        type="primary"
                        className="m-r-10"
                        onClick={() => {
                            setLoading(true);
                            onUpdate({
                                data: { ...account, fullName: value },
                                requestSuccess: () => {
                                    setEdit(false);
                                    setLoading(false);
                                },
                                requestError: () => {
                                    setLoading(false);
                                }
                            })
                        }}>
                        <i className="fa fa-save m-r-10" />Cập nhật
                    </Button>
                    <Button
                        size="small"
                        onClick={() => {
                            setValue(account.fullName)
                            setEdit(false);
                        }}
                    >
                        <i className="fa fa-times m-r-10" />Hủy
                    </Button>
                </div>
            }
        </div>
    </Fragment>
}

export default AccountName;