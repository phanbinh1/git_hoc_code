import * as type from './../../constants/type';
import * as formName from "./../../constants/form_name";
import { Base64, deduplicate } from '../../constants/main';

const configLocalStorageString = localStorage.getItem("config");
let configLocalStorage = {};
try { configLocalStorage = JSON.parse(Base64.decode(configLocalStorageString)); }
catch (e) { configLocalStorage = {}; }

const init = {
	menu_left: {
		mode: "inline",
		width: 300,
		hidden: false,
		fixed: true,
		resize: true,
		autoZoomOut: false,
		fullText: false,
	},
	menu_right: {
		width: 300,
		hidden: true,
		content: null,
	},
	table: {
		fullText: false,
		allowCopy: false
	},
	form: {
		[formName.FORM_NAME_DEFAULT]: {
			type: "horizontal"
		}
	},
	notification: {
		url: "/static/media/sound-notifi-default.mp3",
		mute: false,
		disabled: false,
		startDisabledTime: null,
		disabledOption: null
	},
	history: {
		search: [],
		download: []
	}
}

const dataInit = {
	menu_left: { ...init.menu_left, ...(configLocalStorage.menu_left || {}) },
	menu_right: { ...init.menu_right, ...(configLocalStorage.menu_right || {}) },
	table: { ...init.table, ...(configLocalStorage.table || {}) },
	form: { ...init.form, ...(configLocalStorage.form || {}) },
	notification: { ...init.notification, ...(configLocalStorage.notification || {}) },
	history: { search: [], download: [] }
}

export default (state = dataInit, action) => {
	let _state = { ...state };
	const searchKey = action.payload || null;
	switch (action.type) {
		case type.TYPE_GET_ACCOUNT_CURRENT_CONFIG:
			try {
				const _config = action.value && action.value.config ? JSON.parse(Base64.decode(action.value.config)) : {};
				_state = {
					menu_left: { ...state.menu_left, ...(_config.menu_left || {}) },
					menu_right: { ...state.menu_right, ...(_config.menu_right || {}) },
					table: { ...state.table, ...(_config.table || {}) },
					form: { ...state.form, ...(_config.form || {}) },
					notification: {
						...state.notification,
						...(_config.notification || {})
					},
					auth: true,
					history: _config.history || {
						search: _config.history ? _config.history.search || [] : [],
						download: _config.history ? _config.history.download || [] : []
					}
				}
			}
			catch (e) {
				_state = { ...state, auth: true };
			}
			break;
		case type.TYPE_UNAUTHENTICATED:
			state = { ...state, auth: false }
			break;
		case type.TYPE_LAYOUT_MENU_LEFT:
			_state = {
				...state,
				menu_left: {
					...state.menu_left,
					...action.value.menu_left
				}
			};
			break;
		case type.TYPE_LAYOUT_MENU_RIGHT:
			_state = {
				...state,
				menu_right: {
					...state.menu_right,
					...action.value.menu_right
				}
			};
			break;
		case type.TYPE_LAYOUT_TABLE:
			_state = {
				...state,
				table: {
					...state.table,
					...action.value.table
				}
			};
			break;
		case type.TYPE_LAYOUT_FORM:
			const _formName = action.value.form ? action.value.form : formName.FORM_NAME_DEFAULT;
			state.form[_formName] = action.value.style ? action.value.style : {};
			_state = {
				...state,
				form: {
					...state.form
				}
			};
			break;
		case type.TYPE_CONFIG_NOTIFICATION:
			const _notification = action.notification || {};
			_state = {
				...state,
				notification: {
					...state.notification,
					..._notification
				}
			};
			break;
		case type.TYPE_CONFIG_HISTORY_SEARCH:
			_state = searchKey ? {
				...state,
				history: {
					...state.history,
					search: deduplicate([searchKey, ...state.history.search])
				},
			} : state;
			break;
		case type.TYPE_CONFIG_HISTORY_SEARCH_REOMVE:
			_state = searchKey ? {
				...state,
				history: {
					...state.history,
					search: state.history.search.filter(sk => sk !== searchKey)
				},
			} : state;
			break;
		case type.TYPE_CONFIG_HISTORY_SEARCH_REOMVE_ALL:
			_state = {
				...state,
				history: {
					...state.history,
					search: []
				},
			};
			break;
		default:
			return state;
	}
	localStorage.setItem("config", Base64.encode(JSON.stringify(_state)));
	return _state;
}