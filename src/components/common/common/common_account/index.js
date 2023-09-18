import React, { useState, Fragment, useEffect } from 'react';
import { Skeleton, Popover, Avatar, Card, Alert } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import * as actAccount from "./../../../actions/core/account";
import * as constants from "./../../../constants/constants";
import * as url from "./../../../constants/url";
import * as types from "./../../../constants/type";
import { Link } from 'react-router-dom';
import CommonQrCode from '../common_qr_code';
import { findFirstScrollParent } from '../../../constants/main';
let timeout = null;

const CommonAccount = ({
    username,
    children,
    getPopupContainer
}) => {
    const profiles = useSelector(state => state.core.account.profiles);
    const phongBans = useSelector(state => state.core.account.phong_bans);

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [account, setAccount] = useState(profiles.find(item => item.name === username));
    const [visible, setVisible] = useState(false);
    const [_children, _setChildren] = useState(children);

    useEffect(() => {
        if (!children) {
            if (!account) { loadAccount(); }
            else { _setChildren(account.fullName); }
        }
        else {
            _setChildren(children)
        }
        return () => { timeout && clearTimeout(timeout); }
    }, [username, children]);

    useEffect(() => {
        const _account = profiles.find(item => item.name === username);
        if (_account) {
            setAccount(_account);
            setLoading(false);
        }
    }, [username, profiles]);

    const parsePhongBan = (maPhongBan) => {
        const pb = phongBans.find(item => item.ma === maPhongBan);
        return pb ? pb.ten : maPhongBan;
    }

    const parseChucVu = (chucVu) => {
        const cv = constants.CONST_CHUC_VU.options.find(item => item.value === chucVu);
        return cv ? cv.label : chucVu;
    }

    const loadAccount = () => {
        !account && username ? dispatch(actAccount.getOneRequest({
            data: {
                username,
                refreshStore: false,
            },
            errorNotifi: false,
            requestSuccess: (res) => {
                if (res) {
                    const _account = res;
                    setAccount(_account);
                    !children && _setChildren(_account.fullName);
                    dispatch({
                        type: types.TYPE_ACCOUNT_PROFILE,
                        value: _account
                    })
                    setLoading(false);
                }
                else {
                    setLoading(false);
                }
            },
            requestError: () => {
                setLoading(false);
            }
        })) : setLoading(false);
    };

    const content = <Fragment>
        <Card
            style={{
                width: 350,
                margin: "-12px",
                border: "none"
            }}
            bodyStyle={{ padding: 15 }}
        >
            <Skeleton
                loading={loading}
                active
                avatar
                paragraph={{ rows: 3 }}
            >
                {
                    account && account.id ? <Card.Meta
                        avatar={<Fragment>
                            <p><Avatar size={60} src={account.avatar || constants.CONST_AVATAR_DEFAULT}>{(account.hasOwnProperty("fullName") && account.fullName.length > 0) ? account.fullName.substring(0, 1) : "A"}</Avatar></p>
                            <p><CommonQrCode location={{ pathname: url.URL_ACCOUNT_PROFILE, search: { account: username } }} /></p>
                        </Fragment>}
                        title={<Fragment>
                            {
                                account && account.id ?
                                    <Link
                                        to={{
                                            pathname: `${url.URL_ACCOUNT_PROFILE}`,
                                            search: `account=${account.name}`
                                        }}
                                    >
                                        {account.fullName}
                                    </Link> :
                                    account.fullName
                            }
                        </Fragment>}
                        description={<Fragment>
                            <div className="description-account-popover">
                                <div>Phòng ban: <b>{parsePhongBan(account.managementDepartment)}</b> </div>
                                <div>Chức vụ: <b>{parseChucVu(account.regency)}</b> </div>
                                <div>Email: <b>{account.email}</b> </div>
                                <div>Điện thoại: <b>{account.phoneNumber}</b> </div>
                            </div>
                        </Fragment>}
                    /> : <Alert type="error" showIcon message="Không tìm thấy tài khoản" />
                }
            </Skeleton>
        </Card>
    </Fragment >;

    return <Fragment>
        <Popover
            content={content}
            className="account-popover"
            overlayClassName="account-popover-overlay"
            visible={(!loading && (!account || !account.id)) ? false : visible}
            mouseEnterDelay={0.5}
            onVisibleChange={visible => setVisible(visible)}
            getPopupContainer={(e) => getPopupContainer && typeof getPopupContainer === "function" && getPopupContainer(e) ? getPopupContainer(e) : (findFirstScrollParent(e) || document.body)}
        >
            <span onMouseEnter={loadAccount} onMouseLeave={() => timeout && clearTimeout(timeout)} className="c-pointer" style={{ color: "var(--nav-bg-color)" }}>
                {
                    account && account.id ?
                        <Link to={`${url.URL_ACCOUNT_PROFILE}?account=${account.name}`}>
                            {_children}
                        </Link> :
                        _children
                }
            </span>
        </Popover>
    </Fragment>
}
export default CommonAccount