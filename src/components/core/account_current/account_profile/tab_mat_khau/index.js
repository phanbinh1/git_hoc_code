import React, { useState, Fragment } from 'react';
import ChangePasswordForm from '../../change_password';

const AccountPassword = () => {
    const [edit, setEdit] = useState(false);

    return <div className="profile-alert">
        <div className="row">
            <div className="col-md-4">Mật khẩu</div>
            <div className="col-md-8">
                <div className="row">
                    <div className="col-md-12">
                        <Fragment>
                            **********
                            <div className="pull-right">
                                {
                                    edit ?
                                        <span className="edit m-l-10" onClick={() => {
                                            setEdit(false)
                                        }}>
                                            <i className="fa fa-times m-r-5" />Hủy
                                        </span> :
                                        <span className="edit m-l-10" onClick={() => {
                                            setEdit(true)
                                        }}>
                                            <i className="fa fa-pencil m-r-5" />Đổi mật khẩu
                                        </span>
                                }

                            </div>
                        </Fragment>
                    </div>
                </div>
                {
                    edit && <div className="row">
                        <div className="col-md-12">

                            {
                                edit ?
                                    <ChangePasswordForm
                                        handleClose={() => setEdit(false)}
                                    /> :
                                    <Fragment>
                                        **********
                                    <div className="pull-right">
                                            <span className="edit m-l-10" onClick={() => {
                                                setEdit(true)
                                            }}>
                                                <i className="fa fa-pencil m-r-5" />Đổi mật khẩu
                                    </span>
                                        </div>
                                    </Fragment>
                            }
                        </div>
                    </div>
                }
            </div>
        </div>
    </div>
}

export default AccountPassword;