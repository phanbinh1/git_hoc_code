import AbortController from "abort-controller"
import { getAuth, encode, convertObjectToQueryVariable } from './../constants/main';
import * as type from './../constants/type';
import { store } from "./../index";
import * as act from "./../actions/index";
import * as apiUrl from "./../constants/api";

const timeout = 200000;

const objectInit = {
	url: "",
	data: {},
	errorNotifi: true,
	requestSuccess: () => { },
	requestError: () => { },
	controller: new AbortController(),
	isConfirm: true,
	isUpload: false
}

const checkValidObject = (object) => {
	if (object) {
		if (!object.url) { object.url = ""; }
		if (!object.data) { object.data = {}; }
		if (!object.controller) { object.controller = new AbortController(); }
		if (!object.requestSuccess || object.requestSuccess instanceof Function) { object.requestSuccess = () => { }; }
		if (!object.requestError || object.requestError instanceof Function) { object.requestError = () => { }; }
		if (!object.errorNotifi || typeof (object.errorNotifi) !== "boolean") { object.errorNotifi = false; }
		return object;
	}
	else {
		return objectInit;
	}
}

const createController = (key, controller) => {
	return store && store.dispatch({
		type: type.TYPE_CONTROLLERS,
		value: { key, controller, create: true }
	});
}

const deleteController = (key, controller) => {
	return store && store.dispatch({
		type: type.TYPE_CONTROLLERS,
		value: { key, controller, create: false }
	});
}

export const startLoading = () => {
	const loadingAttribute = document.body.getAttribute("loading");
	const loading = (loadingAttribute && !isNaN(parseInt(loadingAttribute, 0)) ? parseInt(loadingAttribute, 0) : 0) + 1;
	document.body.setAttribute("_loading", loading);
}

export const endLoading = () => {
	const loadingAttribute = document.body.getAttribute("loading");
	const loading = (loadingAttribute && !isNaN(parseInt(loadingAttribute, 0)) ? parseInt(loadingAttribute, 0) : 0) - 1;
	document.body.setAttribute("_loading", loading > 0 ? loading : 0);
}

export const get = async (_object = objectInit) => {
	const object = { ...objectInit, ..._object };
	const { url, data, controller, errorNotifi, isConfirm } = checkValidObject(object);
	errorNotifi && startLoading();
	const signal = controller.signal;
	const keyController = encode(url);
	createController(keyController, controller);
	const headers = new Headers();
	headers.append('Content-Type', 'application/json; charset=utf-8')
	if (isConfirm) {
		headers.append('Authorization', getAuth().token)
	}
	const defaults = { headers: headers, timeout };
	const option = { method: 'GET', signal };
	const options = Object.assign({}, defaults, option);
	let responseStatus = 200;
	const _url = convertObjectToQueryVariable(url, data)
	const res = await fetch(_url, options)
		.then(resp => {
			responseStatus = resp.status;
			switch (resp.status) {
				case 200:// thanh cong
					if (resp.headers.get("content-type") !== null && resp.headers.get("content-type").indexOf("application/json") !== -1) {// checking response header
						return resp.json();
					} else {
						throw new TypeError('Response from "' + url + '" has unexpected "content-type"');
					}
				default:
					return false;
			}
		})
		.catch(error => {
			console.error(error);
			return false;
		});
	deleteController(keyController, controller);
	if (errorNotifi) {
		endLoading();
		if (!res && responseStatus !== 200) {
			store.dispatch({
				type: type[`TYPE_ERROR_${responseStatus}`],
				value: true
			})
			// responseStatus !== 401 && messages.warning({
			// 	key: Base64.encode(_url),
			// 	placement: "bottomLeft",
			// 	content: <Fragment>
			// 		Xử lý lỗi.Vui lòng
			// 		<span className="link" onClick={() => notification.destroy(Base64.encode(_url))}> thử lại!</span>
			// 	</Fragment>
			// })
		}
	}
	return res ? { ...res, responseStatus } : { responseStatus };
}

export const post = async (object = objectInit) => {
	object = { ...objectInit, ...object };
	const { url, data, controller, errorNotifi, isUpload } = checkValidObject(object);
	errorNotifi && startLoading();
	const signal = controller.signal;
	const headers = new Headers();
	!isUpload && headers.append('Content-Type', 'application/json; charset=utf-8');
	headers.append('Authorization', getAuth().token)
	const defaults = { headers: headers, timeout };
	const option = { method: 'POST', body: isUpload ? data : JSON.stringify(data), signal }
	const options = Object.assign({}, defaults, option);
	let responseStatus = 200;
	const res = await fetch(url, options)
		.then(resp => {
			responseStatus = resp.status;
			switch (resp.status) {
				case 200:// thanh cong
					if (resp.headers.get("content-type") !== null && resp.headers.get("content-type").indexOf("application/json") !== -1) {// checking response header
						return resp.json();
					} else {
						throw new TypeError('Response from "' + url + '" has unexpected "content-type"');
					}
				default:
					return false;
			}
		})
		.catch(error => {
			console.error(error);
			return false;
		});
	if (errorNotifi) {
		endLoading();
		if (!res && responseStatus !== 200) {
			store.dispatch({
				type: type[`TYPE_ERROR_${responseStatus}`],
				value: true
			})
			// responseStatus !== 401 && messages.warning({
			// 	key: Base64.encode(url),
			// 	placement: "bottomLeft",
			// 	content: <Fragment>
			// 		Xử lý lỗi.Vui lòng
			// 		<span
			// 			className="link"
			// 			onClick={() => {
			// 				notification.destroy(Base64.encode(url));
			// 			}}
			// 		>
			// 			thử lại!
			// 		</span>
			// 	</Fragment>
			// })
		}
	}
	return res;
}

export const put = async (object = objectInit) => {
	object = { ...objectInit, ...object };
	const { url, data, controller, errorNotifi } = checkValidObject(object);
	errorNotifi && startLoading();
	const signal = controller.signal;
	const headers = new Headers();
	headers.append('Content-Type', 'application/json; charset=utf-8')
	headers.append('Authorization', getAuth().token)
	const defaults = { headers: headers, timeout };
	const option = { method: 'PUT', body: JSON.stringify(data), signal }
	const options = Object.assign({}, defaults, option);
	let responseStatus = 200;
	const res = await fetch(url, options)
		.then(resp => {
			responseStatus = resp.status;
			switch (resp.status) {
				case 200:// thanh cong
					return resp.json();
				default:
					return false;
			}
		})
		.catch(error => {
			return false;
		});
	if (errorNotifi) {
		endLoading();
		if (!res && responseStatus !== 200) {
			store.dispatch({
				type: type[`TYPE_ERROR_${responseStatus}`],
				value: true
			})
			// responseStatus !== 401 && messages.warning({
			// 	key: Base64.encode(url),
			// 	placement: "bottomLeft",
			// 	content: <Fragment>
			// 		Xử lý lỗi.Vui lòng
			// 			<span
			// 			className="link"
			// 			onClick={() => {
			// 				notification.destroy(Base64.encode(url));
			// 			}}
			// 		>
			// 			thử lại!
			// 			</span>
			// 	</Fragment>
			// })
		}
	}
	return res;
}

export const del = async (object = objectInit) => {
	object = { ...objectInit, ...object };
	const { url, data, controller, errorNotifi } = checkValidObject(object);
	errorNotifi && startLoading();
	const signal = controller.signal;
	const headers = new Headers();
	headers.append('Content-Type', 'application/json; charset=utf-8')
	headers.append('Authorization', getAuth().token)
	const defaults = { headers: headers, timeout };
	const option = { method: 'DELETE', body: JSON.stringify(data), signal }
	const options = Object.assign({}, defaults, option);
	let responseStatus = 200;
	const res = await fetch(url, options)
		.then(resp => {
			responseStatus = resp.status;
			switch (resp.status) {
				case 200:// thanh cong
					if (resp.headers.get("content-type") !== null && resp.headers.get("content-type").indexOf("application/json") !== -1) {// checking response header
						return resp.json();
					} else {
						throw new TypeError('Response from "' + url + '" has unexpected "content-type"');
					}
				default:
					return false;
			}
		})
		.catch(error => {
			return false;
		});
	if (errorNotifi) {
		endLoading();
		if (!res && responseStatus !== 200) {
			store.dispatch({
				type: type[`TYPE_ERROR_${responseStatus}`],
				value: true
			})
			// responseStatus !== 401 && messages.warning({
			// 	key: Base64.encode(url),
			// 	placement: "bottomLeft",
			// 	content: <Fragment>
			// 		Xử lý lỗi.Vui lòng
			// 				<span
			// 			className="link"
			// 			onClick={() => {
			// 				notification.destroy(Base64.encode(url));
			// 			}}
			// 		>
			// 			thử lại!
			// 				</span>
			// 	</Fragment>
			// })
		}
	}
	return res;
}

export const download = async (object = objectInit) => {
	startLoading();
	object = { ...objectInit, ...object };
	const { url, controller, errorNotifi } = checkValidObject(object);
	const signal = controller.signal;
	var strFileName = ""
	const res = await fetch(url, {
		method: 'GET',
		headers: new Headers({
			"Authorization": getAuth().token
		}),
		signal
	})
		.then(resp => {
			switch (resp.status) {
				case 200:// thanh cong
					var arr = resp.headers.get("Content-Disposition").split("filename=")
					strFileName = arr[1];
					return resp.blob();
				default:
					errorNotifi && store.dispatch(act.requestError(resp.status, true));
					console.error("ERROR: " + resp.status);
					return false;
			}
		})
		.then(blob => {
			var url = window.URL.createObjectURL(blob);
			var a = document.createElement('a');
			a.href = url;
			a.download = strFileName;
			document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
			a.click();
			a.remove();  //afterwards we remove the element again    
			return true;
		})
		.catch(error => {
			console.error(error);
			return false;
		});
	endLoading();
	return res;
};

export const getCauHinh = async ({ ma }) => {
	const option = { method: 'GET' };
	const options = Object.assign({}, {}, option);
	const res = await fetch(`${apiUrl.API_CAU_HINH}/ma/${ma}`, options)
		.then(resp => {
			switch (resp.status) {
				case 200:// thanh cong
					return resp.json();
				default:
					console.error("ERROR: " + resp.status);
					return false;
			}
		})
		.catch(error => {
			return false;
		});
	return res;
}

export const register = async (object = objectInit) => {
	startLoading();
	object = { ...objectInit, ...object };
	const { url, data, controller } = checkValidObject(object);
	const signal = controller.signal;
	const headers = new Headers();
	// headers.append('Content-Type', 'application/x-www-form-urlencoded');
	headers.append('Content-Type', 'application/json; charset=utf-8');
	// headers.append('Authorization', 'Basic YnJvd3Nlcjo=')
	const defaults = { headers: headers, timeout };
	// const option = { method: 'POST', body: JSON.stringify(data), signal };
	// const options = Object.assign({}, defaults, option);
	const option = { method: 'POST', body: JSON.stringify(data), signal }
	const options = Object.assign({}, defaults, option);
	const res = await fetch(url, options)
		.then(resp => {
			switch (resp.status) {
				case 200:// thanh cong
					return resp.json();
				default:
					console.error("ERROR: " + resp.status);
					return false;
			}
		})
		.catch(error => {
			console.error(error);
			return false;
		});
	endLoading();
	return res;
}

export const authRequest = async (object = objectInit) => {
	startLoading();
	object = { ...objectInit, ...object };
	const { url, data, controller } = checkValidObject(object);
	const signal = controller.signal;
	const headers = new Headers();
	headers.append('Content-Type', 'application/x-www-form-urlencoded');
	headers.append('Authorization', 'Basic YnJvd3Nlcjo=')
	const defaults = { headers: headers, timeout };
	const option = { method: 'POST', body: data, signal };
	const options = Object.assign({}, defaults, option);
	let statusCode = 0;
	const res = await fetch(url, options)
		.then(resp => {
			statusCode = resp.status;
			switch (resp.status) {
				case 200:// thanh cong
					return resp.json();
				default:
					console.error("ERROR: " + resp.status);
					return resp.json();
			}
		})
		.catch(error => {
			console.error(error);
			return false;
		});
	endLoading();
	return {
		...res,
		statusCode
	};
}

export const destroyToken = async (object = objectInit) => {
	startLoading();
	object = { ...objectInit, ...object };
	const { url, data, controller } = checkValidObject(object);
	const signal = controller.signal;
	const headers = new Headers();
	headers.append('Content-Type', 'application/json; charset=utf-8')
	headers.append('Authorization', getAuth().token)
	const defaults = { headers: headers, timeout };
	const option = { method: 'GET', signal }
	const options = Object.assign({}, defaults, option);
	const res = await fetch(convertObjectToQueryVariable(url, data), options)
		.then(resp => {
			switch (resp.status) {
				case 200:// thanh cong
					return true;
				default:
					console.error("ERROR: " + resp.status);
					return false;
			}
		})
		.catch(error => {
			return false;
		});
	endLoading();
	return res;
}