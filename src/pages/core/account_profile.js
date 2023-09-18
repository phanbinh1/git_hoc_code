import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AccountProfileComponent from "./../../components/core/account_current/account_profile"
import * as actAccountCurrent from "./../../actions/core/account_current";
import * as actAccount from "./../../actions/core/account";
import * as constants from "./../../constants/constants";

const AccountProfile = ({ queryVariable }) => {
    const account_current = useSelector(state => state.core.account_current);
    const dispatch = useDispatch();
    const getAccountCurrentRequest = (obj = {}) => dispatch(actAccountCurrent.getAccountCurrentRequest(obj));
    const getAccountRequest = (obj = {}) => dispatch(actAccount.getOneRequest(obj));

    const [account, setAccount] = useState({});
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const title = "Thông tin cá nhân";

        const notifiCountStr = document.body.getAttribute("_notifi_count");
        const notifiCount = notifiCountStr ? parseInt(notifiCountStr, 0) : 0;
        document.title = `${notifiCount > 0 ? `(${notifiCount})` : ''} ${constants.CONST_TITLE} ${title}`;
        document.body.setAttribute("_title", constants.CONST_TITLE + title);

    }, []);

    useEffect(() => {
        setLoading(true);
        if (queryVariable.account) {
            getAccountRequest({
                data: {
                    username: queryVariable.account,
                    refreshStore: false,
                },
                requestSuccess: (res) => {
                    if (res) {
                        setAccount(res);
                        setLoading(false);
                    }
                    else {
                        setLoading(false);
                    }
                },
                requestError: () => {
                    setLoading(false);
                }
            })
        }
        else {
            setAccount(account_current);
            getAccountCurrentRequest({
                requestSuccess: (res) => {
                    if (res) {
                        setAccount(res);
                        setLoading(false);
                    }
                    else {
                        setLoading(false);
                    }
                },
                requestError: () => {
                    setLoading(false);
                }
            });
        }
    }, [queryVariable.account]);

    return (
        <React.Fragment>
            <AccountProfileComponent
                key={account.id}
                loading={loading}
                account={account.name === account_current.name ? account_current : account}
                readOnly={account_current && account && account_current.name === account.name ? false : true}
            />
        </React.Fragment>
    );
}

export default AccountProfile;