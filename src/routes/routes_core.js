
import React, { useCallback, lazy } from "react";
import * as url from "./../constants/url";
import * as main from "./../constants/main";

const Service = lazy(() => import("./../pages/core/service"));
const Permission = lazy(() => import("./../pages/core/permission"));
const Login = lazy(() => import("./../pages/core/login"));
const Home = lazy(() => import("./../pages/core/home"));
const Search = lazy(() => import("./../pages/core/search"));
const HistoryDownload = lazy(() => import("./../pages/core/history_download"));
const Notification = lazy(() => import("./../pages/core/notification"));
const ForgotPassword = lazy(() => import("./../pages/core/forgot_password"));
const AccountProfile = lazy(() => import("./../pages/core/account_profile"));
const NghiPhepCaNhan = lazy(() => import("../pages/core/ca_nhan_nghi_phep"));
const Account = lazy(() => import("./../pages/core/account"));
const AccountGroup = lazy(() => import("./../pages/core/account_group"));
const CauHinh = lazy(() => import("./../pages/core/cau_hinh"));
const Dashboard = lazy(() => import("../pages/core/dashboard"));
const Register = lazy(() => import("../pages/core/register"));
const Policy = lazy(() => import("../pages/core/policy"));

const getQueryVariable = (location) => useCallback(main.queryString.parse(location.search), [location]);

const routes_home = [
    {
        path: url.URL_LOGIN,
        exact: true,
        main: ({ match, history, location }) => <Login
            match={match}
            history={history}
            location={location}
            queryVariable={getQueryVariable(location)}
        />,
        requireAuth: true,
        extendTemplate: false,
    },
    {
        path: url.URL_POLICY,
        exact: true,
        main: () => <Policy />,
        requireAuth: false,
        extendTemplate: false,
    },
    {
        path: url.URL_REGISTER,
        exact: true,
        main: () => <Register />,
        requireAuth: false,
        extendTemplate: false,
    },
    {
        path: url.URL_HISTORY_DOWNLOAD,
        exact: true,
        main: ({ match, history, location }) => <HistoryDownload
            match={match}
            history={history}
            location={location}
            queryVariable={getQueryVariable(location)}
        />,
        requireAuth: true,
        extendTemplate: true,
        isCheckPermission: false,
        titlePage: "Lịch sử tải file"
    },
    {
        path: url.URL_NOTIFICATION,
        exact: true,
        main: ({ match, history, location }) => <Notification
            match={match}
            history={history}
            location={location}
            queryVariable={getQueryVariable(location)}
        />,
        requireAuth: true,
        extendTemplate: true,
        isCheckPermission: false,
        titlePage: "Thông báo"
    },
    {
        path: url.URL_FORGOT_PASSWORD,
        exact: true,
        main: ({ match, history, location }) => <ForgotPassword
            match={match}
            history={history}
            location={location}
            queryVariable={getQueryVariable(location)}
        />,
        requireAuth: false,
        isCheckPermission: false,
        extendTemplate: false,
    },
    {
        path: url.URL_HOME,
        exact: true,
        main: ({ match, history, location }) => <Home
            match={match}
            history={history}
            location={location}
            queryVariable={getQueryVariable(location)}
        />,
        requireAuth: true,
        extendTemplate: true,
        isHiddenTitle: true,
        isCheckPermission: false,
        titlePage: "Trang chủ",
    },
    {
        path: url.URL_DASHHBOARD,
        exact: true,
        main: ({ match, history, location }) => <Dashboard
            match={match}
            history={history}
            location={location}
            queryVariable={getQueryVariable(location)}
        />,
        requireAuth: true,
        extendTemplate: true,
        isHiddenTitle: true,
        isCheckPermission: false,
        titlePage: "Biểu đồ",
        miniMenu: true
    },
    {
        path: url.URL_SEARCH,
        exact: true,
        main: ({ match, history, location }) => <Search
            match={match}
            history={history}
            location={location}
            queryVariable={getQueryVariable(location)}
        />,
        requireAuth: true,
        extendTemplate: true,
        isHiddenTitle: true,
    }
];

const routes_account = [
    {
        path: url.URL_ACCOUNT_PROFILE,
        exact: true,
        main: ({ match, history, location }) => <AccountProfile
            match={match}
            history={history}
            location={location}
            queryVariable={getQueryVariable(location)}
        />,
        requireAuth: true,
        extendTemplate: true,
        isCheckPermission: false,
        titlePage: "Thông tin cá nhân",
        bodyClassName: "page-profile"
    },
    {
        path: url.URL_ACCOUNT,
        exact: true,
        main: ({ match, history, location }) => <Account
            match={match}
            history={history}
            location={location}
            queryVariable={getQueryVariable(location)}
        />,
        requireAuth: true,
        extendTemplate: true,
    },

    {
        path: url.URL_THONG_TIN_NGHI_PHEP,
        exact: true,
        main: ({ match, history, location }) => <NghiPhepCaNhan
            match={match}
            history={history}
            location={location}
            queryVariable={getQueryVariable(location)}
        />,
        requireAuth: true,
        extendTemplate: true,
        isCheckPermission: false,
        titlePage: "Thông tin nghỉ phép cá nhân",
        bodyClassName: "page-profile"
    },
];

const routes_account_group = [
    {
        path: url.URL_ACCOUNT_GROUP,
        exact: true,
        main: ({ match, history, location }) => <AccountGroup
            match={match}
            history={history}
            location={location}
            queryVariable={getQueryVariable(location)}
        />,
        requireAuth: true,
        extendTemplate: true
    },
];

const routes_permission = [
    {
        path: url.URL_PERMISSION,
        exact: true,
        main: ({ match, history, location }) => <Permission
            match={match}
            history={history}
            location={location}
            queryVariable={getQueryVariable(location)}
        />,
        requireAuth: true,
        extendTemplate: true
    }
];

const routes_service = [
    {
        path: url.URL_SERVICE,
        exact: true,
        main: ({ match, history, location }) => <Service
            match={match}
            history={history}
            location={location}
            queryVariable={getQueryVariable(location)}
        />,
        requireAuth: true,
        extendTemplate: true
    },
];

const routes_cau_hinh = [
    {
        path: url.URL_CAU_HINH,
        exact: true,
        main: ({ match, history, location }) => <CauHinh
            match={match}
            history={history}
            location={location}
            queryVariable={getQueryVariable(location)}
        />,
        requireAuth: true,
        extendTemplate: true
    },
]
const routes_core = [
    ...routes_home,
    ...routes_account,
    ...routes_account_group,
    ...routes_permission,
    ...routes_service,
    ...routes_cau_hinh
];

export default routes_core;
