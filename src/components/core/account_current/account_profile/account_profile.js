import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Card, Alert, Tabs, Badge, Progress } from 'antd';
import Avatar from "./avatar";
import TabEmail from './tab_email';
import TabName from "./tab_name";
import TabChucDanh from "./tab_chuc_danh";
import TabDienThoai from './tab_dien_thoai';
import TabMatKhau from './tab_mat_khau';
import * as actAccountCurrent from "./../../../../actions/core/account_current";
import * as main from "./../../../../constants/main";
import { useHistory, useLocation } from 'react-router';

const getTabs = (readOnly = false) => {
    return readOnly ? ["email", "phone", "position"] : ["account", "password", "email", "phone", "position"]
}

const AccountProfile = ({ account, readOnly = false }) => {
    const location = useLocation();
    const history = useHistory();
    const qs = main.queryString.parse(location.search);
    const hash = main.queryString.parse(location.hash, "hash");

    const dispatch = useDispatch();
    const updateAccountCurrentRequest = (value = {}) => dispatch(actAccountCurrent.updateAccountCurrentRequest(value));
    const handleSubmit = (values) => updateAccountCurrentRequest({ data: values })
    const [tab, setTab] = useState("email");

    useEffect(() => {
        const tabs = getTabs(readOnly);
        const _tab = tabs.find(item => item === hash.tab);
        if (_tab) {
            setTab(_tab)
        }
        else {
            history.replace(main.formatUrl({
                pathname: location.pathname,
                objSearch: qs,
                objHash: { tab: tabs[0] }
            }));
        }
    }, [hash, readOnly]);

    useEffect(() => {
        const tabs = getTabs(readOnly);
        history.replace(main.formatUrl({
            pathname: location.pathname,
            objSearch: qs,
            objHash: { tab: tabs[0] }
        }));
    }, [readOnly]);

    return <React.Fragment>
        <div style={{ margin: "20px" }}>
            <div className="row">
                <div className="col-md-3">
                    <Card className="t-center" bordered={false}>
                        <Avatar
                            readOnly={readOnly}
                            account={account}
                            imageUrl={account.avatar}
                            onUpdate={(avatar) => handleSubmit({ ...account, avatar })}
                        />
                        {!readOnly && <Progress percent={account.complete} />}
                    </Card>
                </div>
                <div className="col-md-9">
                    <Card
                        title={<Fragment>
                            <div className="profile-full-name c-pointer">
                                <TabName
                                    readOnly={readOnly}
                                    account={account}
                                    onUpdate={updateAccountCurrentRequest}
                                />
                            </div>
                        </Fragment>}
                    >
                        <Tabs
                            tabPosition="left"
                            className="profile-tab"
                            onChange={key => history.push(main.formatUrl({
                                pathname: location.pathname,
                                objSearch: qs,
                                objHash: { tab: key }
                            }))}
                            activeKey={tab}
                        >
                            {
                                !readOnly && <Tabs.TabPane key="account" tab={<Fragment><i className="fa fa-user m-r-10" />Tài khoản</Fragment>}>
                                    <Alert
                                        className="profile-alert"
                                        description={<Fragment>
                                            <div className="row">
                                                <div className="col-md-4">Tên đăng nhập</div>
                                                <div className="col-md-8">{account.name}</div>
                                            </div>
                                        </Fragment>}
                                    />
                                </Tabs.TabPane>
                            }
                            {
                                !readOnly && <Tabs.TabPane key="password" tab={<Fragment><i className="fa fa-unlock-alt m-r-10" />Mật khẩu</Fragment>}>
                                    <TabMatKhau
                                        account={account}
                                        onUpdate={updateAccountCurrentRequest}
                                    />
                                </Tabs.TabPane>
                            }
                            <Tabs.TabPane key="email" tab={<Fragment><i className="fa fa-envelope m-r-10" />Email</Fragment>}>
                                <TabEmail
                                    readOnly={readOnly}
                                    account={account}
                                    onUpdate={updateAccountCurrentRequest}
                                />
                            </Tabs.TabPane>
                            <Tabs.TabPane key="phone" tab={<Fragment>
                                <i className="fa fa-phone m-r-10" />Điện thoại
                                {!readOnly && (!account.phoneNumber || !account.desktopPhoneNumber) && <Badge dot={true} />}
                            </Fragment>}
                            >
                                <TabDienThoai
                                    readOnly={readOnly}
                                    account={account}
                                    onUpdate={updateAccountCurrentRequest}
                                />
                            </Tabs.TabPane>
                            <Tabs.TabPane key="position" tab={<Fragment><i className="fa fa-id-card m-r-10" />Chức danh</Fragment>}>
                                <TabChucDanh
                                    readOnly={readOnly}
                                    account={account}
                                    onUpdate={updateAccountCurrentRequest}
                                />
                            </Tabs.TabPane>
                        </Tabs>
                    </Card>
                </div>
            </div>
        </div>
    </React.Fragment >;
}

export default AccountProfile;