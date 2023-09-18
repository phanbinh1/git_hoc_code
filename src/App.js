import React, { useState, useEffect, Fragment, Suspense } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { Progress, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import routes from "./routes/routes";
import { createBrowserHistory } from 'history';
import * as actHistoryDownload from "./actions/core/history_download"
import { logout } from "./actions/core/auth";
import { checkVersion, setAuth, getAuth, getHistoryDownloadLocalStorage } from "./constants/main";
import * as apiUrl from "./constants/api";
import * as type from "./constants/type";
import { getCauHinh, authRequest, get } from "./util/api_call";
import TempRequireAuth from './components/layout/required';
import TempNotRequireAuth from './components/layout/not_required';
import PageError404 from "./pages/core/error_404";
import Socket from './components/core/account_current/notification/socket';
import { AntIcon } from './components/antd';
import { listenerAttributeChange } from "./constants/main";
import Loading from './loading';
import SockJS from 'sockjs-client'; // Note this line
import Stomp from 'stompjs';
import { SOCKET_PORT } from "./constants/api";
// import Pusher from 'pusher-js';

export const cauHinhDefault = "BY_ALL";
export const cauHinhOptions = {
	BY_EGOV: "BY_EGOV",
	BY_ACCOUNT: "BY_ACCOUNT",
	BY_ALL: "BY_ALL",
	options: [
		{ value: "BY_ALL", label: "Đăng nhập tùy chọn" },
		{ value: "BY_EGOV", label: "Đăng nhập bằng egov" },
		{ value: "BY_ACCOUNT", label: "Đăng nhập bằng tài khoản hệ thống" }
	],
	render: (value) => {
		switch (value) {
			case "BY_EGOV": return "Đăng nhập bằng eGov";
			case "BY_ACCOUNT": return "Đăng nhập bằng tài khoản hệ thống";
			case "BY_ALL": return "Đăng nhập tùy chọn";
			default: return value;
		}
	}
};
export const history = createBrowserHistory();

const step = 10;
const reTry = 5;
let countErrorGetAccount = 0, countErrorGetPhongBan = 0;

const App = () => {
	const [loaded, setLoaded] = useState(false);
	const [percent, setPercent] = useState(0);
	const authenticated = useSelector(state => state.core.auth.authenticated);
	const authenticated_checked = useSelector(state => state.core.auth.checked);

	const account_current = useSelector(state => state.core.account_current);
	const screenID = useSelector(state => state.screenID);
	const root_css = useSelector(state => state.root_css);

	const dispatch = useDispatch();
	const historyDownload_getAll = () => dispatch(actHistoryDownload.handleGetAll(getHistoryDownloadLocalStorage()));

	const layDanhSachPhongBan = (currentPage = 1) => {
		const pageSize = 10;
		get({ url: apiUrl.API_PHONG_BAN, data: { currentPage, pageSize }, errorNotifi: false })
			.then(res => {
				if (res.responseStatus !== 401) {
					let pagination = { currentPage, pageSize };
					if (res.status && res.result) {
						dispatch({ type: type.TYPE_PHONG_BAN_ALL, values: res.result });
						pagination = res.pagination;
						countErrorGetPhongBan = 0;
					}
					else {
						countErrorGetPhongBan += 1;
					}

					if (countErrorGetPhongBan === 0) {
						if (((pagination.currentPage || 0) * pageSize) < (pagination.total)) {
							layDanhSachPhongBan(currentPage + 1);
						}
					}
					else if (countErrorGetPhongBan < reTry) {
						layDanhSachPhongBan(currentPage)
					}
				}
			})
	}

	const layDanhSachNguoiDung = (currentPage = 1) => {
		const pageSize = 10;
		get({ url: apiUrl.API_ACCOUNT, data: { currentPage, pageSize }, errorNotifi: false })
			.then(res => {
				if (res.responseStatus !== 401) {
					let pagination = { currentPage, total: 0 };
					if (res.status && res.result) {
						dispatch({ type: type.TYPE_ACCOUNT_PROFILES, values: res.result })
						pagination = res.pagination;
						countErrorGetAccount = 0;
					}
					else {
						countErrorGetAccount += 1;
					}
					if (countErrorGetAccount === 0) {
						if (((pagination.currentPage || 0) * pageSize) < (pagination.total)) {
							layDanhSachNguoiDung(currentPage + 1);
						}
					}
					else if (countErrorGetAccount < reTry) {
						layDanhSachNguoiDung(currentPage)
					}
				}
			})
	}

	useEffect(() => {
		root_css.map(item => item.data.map(_item => document.documentElement.style.setProperty(_item.code, _item.value)));
	}, [root_css])

	useEffect(() => {
		checkVersion()
		getConfig();
		historyDownload_getAll();

		// const pusher = new Pusher("7e49ef4f571070b2aa80", {
		// 	cluster: "ap1",
		// });
		// var channel = pusher.subscribe('my-channel');
		// channel.bind('my-event', function (data) {
		// 	alert(JSON.stringify(data));
		// });
	}, []);

	useEffect(() => {
		const socket = new SockJS(SOCKET_PORT);
		const stompClient = Stomp.over(socket);
		stompClient && stompClient.connected && stompClient.disconnect();
		stompClient.debug = null;
		stompClient.connect({}, () => {
			stompClient.subscribe(`/update`, (message) => {
				try {
					const body = JSON.parse(message.body);
					if (body.screenID !== screenID) {
						switch (body.type) {
							case "ACCOUNT":
								dispatch({ type: type.TYPE_SOCKET_ACCOUNT, payload: body.data });
								break;
							case "ACCOUNT_GROUP":
								dispatch({ type: type.TYPE_SOCKET_ACCOUNT_GROUP, payload: body.data });
								break;
							case "ACCOUNT_GROUP_PERMISSION":
								dispatch({ type: type.TYPE_SOCKET_ACCOUNT_GROUP_PERMISSION, payload: body.data });
								break;
							case "PERMISSION":
								dispatch({ type: type.TYPE_SOCKET_PERMISSION, payload: body.data });
								break;
							case "CONFIG":
								dispatch({ type: type.TYPE_SOCKET_CONFIG, payload: body.data });
								break;
							default:
								break;
						}
					}
				}
				catch (e) { }
			});
		})
		return () => { stompClient && stompClient.connected && stompClient.disconnect(); }
	}, [screenID]);

	useEffect(() => {
		if (authenticated && authenticated_checked) {
			layDanhSachPhongBan();
			layDanhSachNguoiDung();
		}
	}, [authenticated, authenticated_checked]);

	const getConfig = async () => {
		/**
		 * 	Step 1
		 * 	Lấy cấu hình đăng nhập
		 * 		Không cần token
		 */
		const loginConfigRes = await getCauHinh({ ma: "login_setup" });
		if (loginConfigRes && loginConfigRes.status && loginConfigRes.result && cauHinhOptions.options.findIndex(item => item.value === loginConfigRes.result.giaTri) !== -1) {
			localStorage.setItem("login_setup", loginConfigRes.result.giaTri);
		}
		else {
			localStorage.setItem("login_setup", cauHinhDefault);
		}
		// }
		setPercent(p => p + step);
		/**
		 * 	End Step 1
		 */
		const authLocalStorage = getAuth();
		if (!authLocalStorage.access_token) {
			dispatch(logout());
		}
		else {
			/**
			 * 	Step 2
			 */
			const checkTokenRes = await authRequest({ url: apiUrl.API_CHECK_TOKEN, data: `token=${authLocalStorage.access_token}` });
			setPercent(p => p + step);
			/**
			 * 	End step 2
			 */
			/**
			 * 	Step 3
			 */
			if (!checkTokenRes) {
				/**
				 * 	Step 3.1
				 */
				if (authLocalStorage.scope === "ui" || !authLocalStorage.refresh_token) {
					dispatch(logout());
				}
				/**
				 * 	Step 3.2
				 */
				else {
					const reLoginRes = await authRequest({ url: apiUrl.API_LOGIN, data: `grant_type=refresh_token&refresh_token=${authLocalStorage.refresh_token}` })
					setPercent(p => p + step);
					/**
					 * 	Step 3.2.1
					 */
					if (!reLoginRes) {
						Modal.info({
							title: "Thông báo",
							content: <div>Phiên làm việc đã kết thúc.
							<br />Vui lòng đăng nhập lại để tiếp tục sử dụng</div>,
							okText: <Fragment><i className="fa fa-sign-out m-r-10" />Đăng xuất</Fragment>,
							onOk: () => dispatch(logout())
						})
					}
					/**
					 * 	Step 3.2.2
					 */
					else {
						setAuth(reLoginRes);
						/**
						 * 	Step 3.2.2.1
						 * 	Get account current
						 */
						const accountCurrentRes = await get({ url: apiUrl.API_ACCOUNT_CURRENT });
						setPercent(p => p + step);
						if (accountCurrentRes) {
							dispatch({
								type: type.TYPE_GET_ACCOUNT_CURRENT,
								value: accountCurrentRes
							});
							/**
							 * 	Get menu left
							 */

							const menuLeftRes = await get({ url: apiUrl.API_MENU_LEFT, data: { isMobile: document.body.getAttribute("_enviroment") === "app" } });
							if (menuLeftRes.status && menuLeftRes.result) {
								dispatch({
									type: type.TYPE_GET_MENU_LEFT,
									values: menuLeftRes.result
								})
								setPercent(p => p + step);
							}
							else {
								dispatch(logout());
							}
						}
						else {
							dispatch(logout());
						}
					}
				}
			}
			else {
				/**
				 * 	Step 3.2.2.1
				 * 	Get account current
				 */
				dispatch({ type: type.TYPE_AUTHENTICATED_CHECKED });
				const accountCurrentRes = await get({ url: apiUrl.API_ACCOUNT_CURRENT });
				setPercent(p => p + step);
				if (accountCurrentRes) {
					dispatch({
						type: type.TYPE_GET_ACCOUNT_CURRENT,
						value: accountCurrentRes
					});
					dispatch({
						type: type.TYPE_GET_ACCOUNT_CURRENT_CONFIG,
						value: accountCurrentRes
					});
					/**
					 * 	Get menu left
					 */
					const menuLeftRes = await get({ url: apiUrl.API_MENU_LEFT, data: { isMobile: document.body.getAttribute("_enviroment") === "app" } });
					if (menuLeftRes.status && menuLeftRes.result) {
						dispatch({
							type: type.TYPE_GET_MENU_LEFT,
							values: menuLeftRes.result
						})
						setPercent(p => p + step);
					}
					else {
						dispatch(logout());
					}
				}
				else {
					dispatch(logout());
				}
			}
		}
		/**
		 * 	Get cấu hình văn bản điều hành!
		 */
		const vbdhConfigRes = await getCauHinh({ ma: "vanbandieuhanh_info" });
		if (vbdhConfigRes && vbdhConfigRes.status && vbdhConfigRes.result) {
			dispatch({
				type: type.TYPE_CAU_HINH_LOAD_VBDH,
				value: JSON.parse(vbdhConfigRes.result.giaTri)
			})
		}

		setPercent(p => p + step);
		setPercent(100);
		setTimeout(() => {
			setLoaded(true);
		}, 400);
	}

	const templateRoute = () => {
		const routeRequireAuth = routes.filter(route => route.requireAuth);
		const routeNotRequireAuth = routes.filter(route => !route.requireAuth);

		return <Fragment>
			<Suspense fallback={<Loading />}>
				<Router history={history} >
					<Switch>
						<Route path={routeRequireAuth.map(item => item.path)} key="route-1">
							<TempRequireAuth routes={routeRequireAuth} />
						</Route>
						<Route path={routeNotRequireAuth.map(item => item.path)} key="route-2">
							<Switch>
								<TempNotRequireAuth routes={routeNotRequireAuth} />
							</Switch>
						</Route>
						<Route path='' key="route-404">
							<TempRequireAuth routes={[{ path: '', exact: true, main: () => <PageError404 />, extendTemplate: true, }]} />
						</Route>
					</Switch>
				</Router>
			</Suspense >
		</Fragment>
	};

	return <Fragment>
		{account_current && account_current.id && <Socket />}
		<div className="ant-message loading-message">
			<div className="ant-message-notice">
				<div className="ant-message-notice-content">
					<div className="ant-message-custom-content ant-message-loading">
						<span role="img" aria-label="loading" className="anticon anticon-loading"><AntIcon type="loading" style={{ top: "-28px", left: "-17px" }} /></span>
						<span>Loading...</span>
					</div>
				</div>
			</div>
		</div>
		{
			!loaded ? <Fragment>
				<div id="loader-container">
					<span className="_loader">
						<span></span>
						<span></span>
						<span></span>
						<span></span>
					</span>
					<div style={{ width: "300px", margin: "auto" }}>
						<Progress percent={percent} showInfo={false} />
						<p style={{ color: "#fff" }}>
							<span className="pull-left">Đang tải dữ liệu. Vui lòng đợi !!!</span>
							<span className="pull-right">{percent}%</span>
						</p>
					</div>
				</div>
			</Fragment> :
				templateRoute()
		}
	</Fragment >;
}

const AppComponent = () => {
	const [enviroment, setEnviroment] = useState("web");
	useEffect(() => {
		listenerAttributeChange(document.body, (attributes) => {
			const enviromentAttr = attributes["_enviroment"] || { value: "web" };
			setEnviroment(enviromentAttr.value === "app" ? "app" : "web");
		}, { attributeFilter: ["_enviroment"] })
	}, [])
	return <App key={enviroment} />
}

export default AppComponent;