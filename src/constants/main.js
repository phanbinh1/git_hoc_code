import AbortController from "abort-controller"
import * as constants from "./constants";
import * as pageKeys from "./page_key";
import * as url from "./url";
import * as act_id from "./action_id";
import * as formName from "./form_name";
import _ from 'lodash';
import moment from "moment";
import version from "./version";
import { dateFormat } from "./controll";

export const checkVersion = () => {
    let localStorageVersion = localStorage.getItem("version");
    localStorage.setItem("uuid", createID());
    if (!localStorageVersion || localStorageVersion !== version.current.version) {
        localStorage.clear();
        localStorage.setItem("version", version.current.version);
        setCookie("au", "", -1);
        window.location.reload(true);
    }
}

export const convertListDisabledItemCustom = ({ list = [], comparative = "id", items = [], childrenKey = "children" }) => {
    return list.map((item) => {
        let objComparative = {};
        objComparative[comparative] = item[comparative];
        const index = (items || []).findIndex(item => item[comparative] === objComparative[comparative]);
        if (item[childrenKey] && Array.isArray(item[childrenKey])) {
            item[childrenKey] = convertListDisabledItemCustom({
                list: item[childrenKey],
                comparative,
                items,
                childrenKey
            });
        }
        return {
            ...item,
            disabled: index !== -1
        }
    })
}

export const checkValidObjectRequest = (object = {}) => {
    if (!object.hasOwnProperty("data")) {
        object.data = {};
    }
    if (!object.hasOwnProperty("requestSuccess") || typeof object.requestSuccess !== "function") {
        object.requestSuccess = () => { };
    }
    if (!object.hasOwnProperty("requestError") || typeof object.requestError !== "function") {
        object.requestError = () => { };
    }
    if (!object.hasOwnProperty("isPagination") || typeof object.isPagination !== "boolean") {
        object.isPagination = true;
    }
    if (!object.hasOwnProperty("pageKey") || typeof object.pageKey !== "string") {
        object.pageKey = constants.CONST_PAGINATION_KEY_DEFAULT;
    }
    if (!object.hasOwnProperty("controller")) {
        object.controller = new AbortController();
    }
    if (!object.hasOwnProperty("dataSearch")) {
        object.dataSearch = {};
    }
    if (!object.hasOwnProperty("dataSort")) {
        object.dataSort = {};
    }
    if (!object.hasOwnProperty("pagination")) {
        object.pagination = constants.CONST_PAGINATION;
    }
    if (object.errorNotifi === false) {
        object.errorNotifi = false;
    }
    else {
        object.errorNotifi = true;
    }
    return object;
}

export const setDiaBanLocalStorage = (list) => {
    localStorage.setItem("dia_ban", JSON.stringify(list));
}

export const getDiaBanLocalStorage = () => {
    let result = localStorage.getItem("dia_ban");
    if (result === null) {
        return [];
    }
    else {
        return JSON.parse(result);
    }
}

export const setHistoryDownloadLocalStorage = (list) => {
    localStorage.setItem("history_download", JSON.stringify(list));
}

export const getHistoryDownloadLocalStorage = () => {
    let result = localStorage.getItem("history_download");
    if (result === null) {
        return [];
    }
    else {
        return JSON.parse(result);
    }
}

export const getFormStyle = () => {
    let formStyle = localStorage.getItem("form_style");
    let result = {};
    if (formStyle === null) {
        formStyle = constants.CONST_LAYOUT_FORM;
        result[formName.FORM_NAME_DEFAULT] = formStyle;
        localStorage.setItem("form_style", JSON.stringify({ ...result }));
    }
    else {
        result = JSON.parse(formStyle);
    }
    return result;
}

export const setFormStyle = ({ form = formName.FORM_NAME_DEFAULT, style = constants.CONST_LAYOUT_FORM }) => {
    style = { ...constants.CONST_LAYOUT_FORM, ...style };
    const formStyle = getFormStyle();
    formStyle[form] = style;
    localStorage.setItem("form_style", JSON.stringify(formStyle));
}

export const setMenuDefaultSelectedKeys = (key) => {
    let keys = [`${key}`];
    localStorage.setItem("menu_default_selected_key", JSON.stringify(keys));
}

export const getMenuDefaultSelectedKeys = () => {
    let key = localStorage.getItem("menu_default_selected_key");
    if (key === null) {
        return [];
    }
    else {
        return JSON.parse(key);
    }
}

export const setMenuDefaultOpenKeys = (keys) => {
    localStorage.setItem("menu_default_open_keys", JSON.stringify(keys));
}

export const getMenuDefaultOpenKeys = () => {
    let keys = localStorage.getItem("menu_default_open_keys");
    if (keys === null) {
        return [];
    }
    else {
        return JSON.parse(keys);
    }
}

export const setAuth = (value = {}) => {
    const authString = JSON.stringify(value);
    setCookie("au", Base64.encode(authString));
}

export const getAuth = () => {
    const authString = getCookie("au");
    let result = {
        access_token: undefined,
        token_type: undefined,
        refresh_token: undefined,
        expires_in: undefined,
        scope: undefined,
        token: undefined
    }
    if (!authString) { result = {} }
    try { result = JSON.parse(Base64.decode(authString)); }
    catch (e) { result = {} }
    result.token = result.token_type && result.access_token ? `${result.token_type} ${result.access_token}` : undefined;
    return result;

}

export const removeAuth = () => {
    setCookie("au", "", -1);
}

export const setPreviousPageUrlLocalStorage = (path = "/") => {
    return localStorage.setItem("previous_page_url", path);
}

export const getPreviousPageUrlLocalStorage = () => {
    return localStorage.getItem("previous_page_url") ? localStorage.getItem("previous_page_url") : "/";
}

export const convertObjectToQueryVariable = (url, value) => {
    let link = new URL(url);
    try {
        Object.keys(value).forEach(key => value[key] !== undefined && link.searchParams.append(key, value[key]))
    }
    catch (e) { }
    return decodeURI(link);
}

export const convertObjectToQueryVariableSearch = (obj) => {
    let str = "";
    for (let key in obj) {
        if (str !== "") {
            str += "&";
        }
        str += key + "=" + encodeURIComponent(obj[key]);
    }
    return str;
}

export const setPaginationLocalStorage = (pagination = constants.CONST_PAGINATION, paginationKey = constants.CONST_PAGINATION_KEY_DEFAULT) => {
    let paginations = getArrayPaginationLocalStorage();
    let _paginations = paginations;
    paginations.map((item, index) => {
        if (item.key === paginationKey) {
            _paginations.splice(index, 1);
        }
        return null;
    })
    _paginations.push({
        key: paginationKey,
        pagination: {
            currentPage: pagination.currentPage,
            pageSize: pagination.pageSize
        }
    });
    localStorage.setItem("paginations", JSON.stringify(_paginations));
}

export const getPaginationLocalStorage = (paginationKey = constants.CONST_PAGINATION_KEY_DEFAULT) => {
    let paginationsString = localStorage.getItem("paginations");
    let paginations = [];
    let pagination = constants.CONST_PAGINATION;
    if (paginationsString) {
        paginations = JSON.parse(paginationsString);
        paginations.map((item) => {
            if (item.key === paginationKey) {
                pagination = item.pagination;
            }
            return null;
        });
    }
    return { currentPage: pagination.currentPage < 1 ? 1 : pagination.currentPage, pageSize: pagination.pageSize };
}

export const getParamPagination = (paginationKey = constants.CONST_PAGINATION_KEY_DEFAULT) => {
    let pagination = getPaginationLocalStorage(paginationKey);
    return {
        pageSize: pagination.pageSize,
        currentPage: pagination.currentPage < 1 ? 1 : pagination.currentPage
    }
}

export const getArrayPaginationLocalStorage = () => {
    let paginationsString = localStorage.getItem("paginations");
    let paginations = [];
    if (paginationsString) {
        paginations = JSON.parse(paginationsString);
    }
    else {
        paginations = [
            {
                key: constants.CONST_PAGINATION_KEY_DEFAULT,
                pagination: {
                    currentPage: constants.CONST_PAGINATION.currentPage,
                    pageSize: constants.CONST_PAGINATION.pageSize
                }
            }
        ];
        localStorage.setItem("paginations", JSON.stringify(paginations));
    }
    return paginations && Array.isArray(paginations) ? paginations : [];
}

export const getPaginationEmpty = (paginationKey = constants.CONST_PAGINATION_KEY_DEFAULT) => {
    let pagination = getPaginationLocalStorage(paginationKey);
    return { pageSize: pagination.pageSize, currentPage: 1 };
}

export const removePaginationLocalStorage = () => {
    return localStorage.removeItem('paginations');

}

export const isPermission = (list = [], idChucNang) => {
    return (list || []).findIndex(item => item.idChucNang === encode(idChucNang)) !== -1;
}

export const sortTree = (list = []) => {
    list = _.orderBy(list, ['sort'], ['asc']);

    return list.map((item) => {
        if (item.children.length > 0) {
            item.children = sortTree(item.children);
        }
        return item;
    });
}

export const getTitleFromMenu = (list, url, result = "") => {
    list.map((item) => {
        if (url === item.url) {
            return result = item.name;
        }
        else {
            return result = getTitleFromMenu(item.children, url, result);
        }
    });
    return result;
}

export const convertObjectToArray = (object = {}, isValue = true, isKey = false) => {
    let results = [];
    if (typeof object === "object") {
        results = Object.keys(object).map((key) => {
            if (isValue && isKey) {
                return [key, object[key]];
            }
            else if (isValue) {
                return object[key];
            }
            else {
                return key;
            }
        });
    }
    return results;
}

export const convertObjectToString = (object = {}) => {
    let result = "";
    if (typeof object === "object") {
        Object.keys(object).map((key) => {
            return result += object[key];
        });
    }
    return result;
}

export const getActionFromUrl = () => {
    let listUrlKey = convertObjectToArray(url, true, true);
    let listKey = [];
    let result = [];
    listUrlKey.map((val) => {
        if (val[0].indexOf("URL_") !== -1) {
            listKey.push({ key: `ACT_ID_${val[0].substr(4, val[0].length)}`, url: val[1] });
        }
        return null;
    });
    let listAction = convertObjectToArray(act_id, true, true);
    let listActionKey = [];
    listAction.map((item) => {
        return listActionKey[item[0]] = item[1];
    });
    listKey.map((item) => {
        return result.push({ url: item.url, actions: convertObjectToArray(listActionKey[item.key]) })
    });
    return result;
}

export const formatUrl = ({ pathname, objSearch = {}, objHash = {} }) => {
    let url = pathname;
    if (Object.keys(objSearch).length > 0) {
        url += "?" + parseObjectToParams(objSearch);
    }
    if (Object.keys(objHash).length > 0) {
        url += "#" + parseObjectToParams(objHash);
    }
    return url;
}

const getQueryVariable = (search = "", type = "search") => {
    if (typeof search !== "string" || search.trim() === "") {
        return {};
    }
    else {

        const query = search.substr(0, 1) === (type === "hash" ? "#" : "?") ? search.substr(1) : search;
        let result = {};
        try {
            result = JSON.parse('{"' + decodeURI(query).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
        }
        catch (e) { };
        return result;
    }
}

export const parseObjectToParams = (obj = {}, c1 = "=", c2 = "&") => {
    if (typeof obj !== "object") {
        return "";
    }
    return Object.keys(obj).filter(key => obj[key] !== undefined).map(key => `${key}${c1}${obj[key]}`).join(c2);
}

/**
 *  
 */
export const queryString = {
    /**
     * 
     */
    parse: (search = "", type = "search") => {
        switch (type) {
            case "search":
                return getQueryVariable(search, type);
            default:
                return getQueryVariable(search, type);
        }
    },
    stringify: (data = {}, c1 = "=", c2 = "&") => {
        return parseObjectToParams(data, c1, c2);
    },
    sortStringify: (data) => {
        return parseStringDataSort(data);
    }
}

export const setFormValueLocalStorage = (formName, isRemove = true, value = {}) => {
    let formValueString = localStorage.getItem("form_value");
    let formValue = [];
    if (formValueString) {
        formValue = JSON.parse(formValueString);
    }
    else {
        localStorage.setItem("form_value", JSON.stringify(formValue));
    }
    let _formValue = formValue;
    formValue.map((item, index) => {
        if (item.name === formName) {
            _formValue.splice(index, 1);
        }
        return null;
    })
    if (!isRemove) {
        _formValue.push({
            name: formName,
            value
        });
    }
    localStorage.setItem("form_value", JSON.stringify(_formValue));
}

export const getFormValueLocalStorage = (formName) => {
    let formValue = [];
    if (localStorage.getItem("form_value")) {
        formValue = JSON.parse(localStorage.getItem("form_value"));
    }
    let result = {};
    const key = formValue.findIndex(item => item.name === formName);
    if (Array.isArray(formValue) && key > -1 && formValue[key].value) {
        result = formValue[key].value;
    }
    return result;
}

export const getItemSelected = (selecteds, key = pageKeys.PAGE_KEY_DEFAULT) => {
    let result = [];
    if (Array.isArray(selecteds)) {
        selecteds.map((item) => {
            if (item.hasOwnProperty("key") && item.key === key) {
                result = item.rows_selected;
            }
            return null;
        })
    }
    return result;
}

export const encode = (string) => {
    if (string === null) {
        return null;
    }
    function RotateLeft(lValue, iShiftBits) {
        return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
    }

    function AddUnsigned(lX, lY) {
        let lX4, lY4, lX8, lY8, lResult;
        lX8 = (lX & 0x80000000);
        lY8 = (lY & 0x80000000);
        lX4 = (lX & 0x40000000);
        lY4 = (lY & 0x40000000);
        lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
        if (lX4 & lY4) {
            return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
        }
        if (lX4 | lY4) {
            if (lResult & 0x40000000) {
                return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
            } else {
                return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
            }
        } else {
            return (lResult ^ lX8 ^ lY8);
        }
    }

    function F(x, y, z) {
        return (x & y) | ((~x) & z);
    }
    function G(x, y, z) {
        return (x & z) | (y & (~z));
    }
    function H(x, y, z) {
        return (x ^ y ^ z);
    }
    function I(x, y, z) {
        return (y ^ (x | (~z)));
    }

    function FF(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };

    function GG(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };

    function HH(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };

    function II(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };

    function ConvertToWordArray(string) {
        let lWordCount;
        let lMessageLength = string.length;
        let lNumberOfWords_temp1 = lMessageLength + 8;
        let lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
        let lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
        let lWordArray = Array(lNumberOfWords - 1);
        let lBytePosition = 0;
        let lByteCount = 0;
        while (lByteCount < lMessageLength) {
            lWordCount = (lByteCount - (lByteCount % 4)) / 4;
            lBytePosition = (lByteCount % 4) * 8;
            lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
            lByteCount++;
        }
        lWordCount = (lByteCount - (lByteCount % 4)) / 4;
        lBytePosition = (lByteCount % 4) * 8;
        lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
        lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
        lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
        return lWordArray;
    };

    function WordToHex(lValue) {
        let WordToHexValue = "", WordToHexValue_temp = "", lByte, lCount;
        for (lCount = 0; lCount <= 3; lCount++) {
            lByte = (lValue >>> (lCount * 8)) & 255;
            WordToHexValue_temp = "0" + lByte.toString(16);
            WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
        }
        return WordToHexValue;
    };

    function Utf8Encode(string) {
        string = string.replace(/\r\n/g, "\n");
        let utftext = "";

        for (let n = 0; n < string.length; n++) {

            let c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    };

    let x = [];
    let k, AA, BB, CC, DD, a, b, c, d;
    let S11 = 7, S12 = 12, S13 = 17, S14 = 22;
    let S21 = 5, S22 = 9, S23 = 14, S24 = 20;
    let S31 = 4, S32 = 11, S33 = 16, S34 = 23;
    let S41 = 6, S42 = 10, S43 = 15, S44 = 21;

    string = Utf8Encode(string);

    x = ConvertToWordArray(string);

    a = 0x67452301;
    b = 0xEFCDAB89;
    c = 0x98BADCFE;
    d = 0x10325476;

    for (k = 0; k < x.length; k += 16) {
        AA = a;
        BB = b;
        CC = c;
        DD = d;
        a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
        d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
        c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
        b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
        a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
        d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
        c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
        b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
        a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
        d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
        c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
        b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
        a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
        d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
        c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
        b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
        a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
        d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
        c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
        b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
        a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
        d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
        c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
        b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
        a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
        d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
        c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
        b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
        a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
        d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
        c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
        b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
        a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
        d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
        c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
        b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
        a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
        d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
        c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
        b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
        a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
        d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
        c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
        b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
        a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
        d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
        c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
        b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
        a = II(a, b, c, d, x[k + 0], S41, 0xF4292244);
        d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
        c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
        b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
        a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
        d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
        c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
        b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
        a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
        d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
        c = II(c, d, a, b, x[k + 6], S43, 0xA3014314);
        b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
        a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
        d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
        c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
        b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
        a = AddUnsigned(a, AA);
        b = AddUnsigned(b, BB);
        c = AddUnsigned(c, CC);
        d = AddUnsigned(d, DD);
    }

    let temp = WordToHex(a) + WordToHex(b) + WordToHex(c) + WordToHex(d);

    return temp.toLowerCase();
}

export const createID = () => {
    return "attp-" + Math.random().toString(36).substr(2, 9);
}

export const parseStringDataSort = (dataSort) => {
    let result = "";
    if (dataSort) {
        dataSort.sort((a, b) => { return b.sort - a.sort });
        dataSort.map((item, i) => {
            result += `${item.key} ${item.value ? "asc" : "desc"}`;
            if (i < dataSort.length - 1) {
                result += ",";
            }
            return result;
        });
    }
    return result;
}

export const convertNumberToCurrency = (number, decimals = 0, dec_point = 3, thousands_sep = '.') => {
    let j = 0;
    let n = number, c = isNaN(decimals = Math.abs(decimals)) ? 2 : decimals;
    let d = dec_point === undefined ? "," : dec_point;
    let t = thousands_sep === undefined ? "." : thousands_sep, s = n < 0 ? "-" : "";
    let i = parseInt(n = Math.abs(+n || 0).toFixed(c), 0) + "";
    j = (i.length) > 3 ? i.length % 3 : 0;

    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
}

export const convertCurrencyToNumber = (value, thousands_sep = '.') => {
    if (value) {
        let numbers = value.toString().split(thousands_sep);
        let result = '';
        numbers.map((number) => {
            return result += number.toString();
        })
        return parseInt(result, 0);
    }
    else {
        return 0;
    }
}

export const formatSizeUnits = (bytes) => {
    if (bytes >= 1073741824) { bytes = (bytes / 1073741824).toFixed(2) + " GB"; }
    else if (bytes >= 1048576) { bytes = (bytes / 1048576).toFixed(2) + " MB"; }
    else if (bytes >= 1024) { bytes = (bytes / 1024).toFixed(2) + " KB"; }
    else if (bytes > 1) { bytes = bytes + " bytes"; }
    else if (bytes === 1) { bytes = bytes + " byte"; }
    else { bytes = "0 bytes"; }
    return bytes;
}

export const formartTimeUnits = (date, format = "HH:mm:ss DD/MM/YYYY") => {
    try {
        const _date = moment(date, format);
        if (_date.isValid()) {
            let res = Math.floor((moment() - _date) / 1000);
            const before = res > 0;
            res = before ? res : -res
            let seconds = Math.floor(res % 60);
            let minutes = Math.floor((res / 60) % 60);
            let hours = Math.floor((res / (60 * 60)) % 24);
            let days = Math.floor(res / (60 * 60 * 24));
            let months = Math.floor(res / (60 * 60 * 24 * 30));
            let years = Math.floor(res / (60 * 60 * 24 * 365));
            let label = "";
            if (years !== 0) {
                label = `${years} năm ${before ? "trước" : "sau"}`;
            }
            else if (months !== 0) {
                label = `${months} tháng ${before ? "trước" : "sau"}`;
            }
            else if (days !== 0) {
                label = `${days} ngày ${before ? "trước" : "sau"}`;
            }
            else if (hours !== 0) {
                label = `${hours} giờ ${before ? "trước" : "sau"}`;
            }
            else if (minutes !== 0) {
                label = `${minutes} phút ${before ? "trước" : "sau"}`;
            }
            else if (seconds > 10) {
                label = `${seconds} giây ${before ? "trước" : "sau"}`;
            }
            else {
                label = "Vừa xong";
            }

            return {
                seconds: before ? seconds : -seconds,
                minutes: before ? minutes : -minutes,
                hours: before ? hours : -hours,
                days: before ? days : -days,
                months: before ? months : -months,
                years: before ? years : -years,
                label
            }
        }
        return {
            seconds: 0,
            minutes: 0,
            hours: 0,
            days: 0,
            months: 0,
            years: 0,
            label: ""
        }
    }
    catch (e) {
        console.error(e);
        return {
            seconds: 0,
            minutes: 0,
            hours: 0,
            days: 0,
            months: 0,
            years: 0,
            label: ""
        }
    }
}

export const setColumnsLocalStorage = ({
    columnsWidth,
    columnsFormat,
    columnsShow,
    columnsSort,
    pageKey = constants.CONST_PAGINATION_KEY_DEFAULT
}) => {
    const columns = getArrayColumnsLocalStorage();
    let _columns = columns;
    const index = columns.findIndex(item => item.key.toLowerCase() === pageKey.toLowerCase());
    if (index >= 0) {
        _columns[index].width = columnsWidth ? columnsWidth : _columns[index].width ? _columns[index].width : {};
        _columns[index].format = columnsFormat ? columnsFormat : _columns[index].format ? _columns[index].format : {};
        _columns[index].show = columnsShow ? columnsShow : (_columns[index].show || null);
        _columns[index].sort = columnsSort ? columnsSort : (_columns[index].sort || {})
    }
    else {
        _columns.push({
            key: pageKey.toLowerCase(),
            width: columnsWidth ? columnsWidth : {},
            format: columnsFormat ? columnsFormat : {},
            show: columnsShow || null,
            sort: columnsSort || {}
        });
    }
    localStorage.setItem("columns", JSON.stringify(_columns));
}

export const getColumnsLocalStorage = ({
    pageKey = constants.CONST_PAGINATION_KEY_DEFAULT
}) => {
    const columnsString = localStorage.getItem("columns");
    let columns = [];
    let width = {}, format = {}, show = null, sort = {};
    if (columnsString) {
        try { columns = JSON.parse(columnsString); }
        catch (e) { columns = []; }
        columns.map((item) => {
            if (item.key.toLowerCase() === pageKey.toLowerCase()) {
                width = item.width || {};
                format = item.format || {};
                show = item.show;
                sort = item.sort || {};
            }
            return null;
        });
    }
    return { pageKey: pageKey.toLowerCase(), width, format, show, sort };
}

export const getArrayColumnsLocalStorage = () => {
    const columnsString = localStorage.getItem("columns");
    let columns = [];
    if (columnsString) {
        try { columns = JSON.parse(columnsString); }
        catch (e) { columns = []; }
    }
    else {
        columns = [{
            key: constants.CONST_PAGINATION_KEY_DEFAULT.toLowerCase(),
            width: {},
            format: {},
            sort: {},
            show: null
        }];
        localStorage.setItem("columns", JSON.stringify(columns));
    }
    return columns;
}

/**
 * 
 * @param {*} array 
 */
export const shuffle = (array) => {
    let currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

export const deepDiffMapper = function () {
    const VALUE_CREATED = { key: 'created', num: 1 };
    const VALUE_UPDATED = { key: 'updated', num: 2 };
    const VALUE_DELETED = { key: 'deleted', num: 3 };
    const VALUE_UNDEFINED = { key: 'undefined', num: 4 };
    const VALUE_UNCHANGED = { key: 'unchanged', num: 0 };

    const mapEqual = (obj1, obj2, THIS) => {
        let key = null;
        if (THIS.isFunction(obj1) || THIS.isFunction(obj2)) { return 1; }
        if (THIS.isValue(obj1) || THIS.isValue(obj2)) { return THIS.compareValues(obj1, obj2).num; }
        let diff = {};
        for (key in obj1) {
            if (THIS.isFunction(obj1[key])) { continue; }
            let value2 = undefined;
            if (obj2[key] !== undefined) { value2 = obj2[key]; }
            diff[key] = mapEqual(obj1[key], value2, THIS);
        }
        for (key in obj2) {
            if (THIS.isFunction(obj2[key]) || diff[key] !== undefined) { continue; }
            diff[key] = mapEqual(undefined, obj2[key], THIS);
        }
        return diff;
    };
    const sumMapEqual = (val, THIS) => {
        let sum = 0;
        if (THIS.isValue(val)) { sum += val; }
        else {
            Object.keys(val).map(key => {
                return sum += sumMapEqual(val[key], THIS);
            });
        }
        return sum;
    };

    return {
        map: function (obj1, obj2) {
            let key = null;
            if (this.isFunction(obj1) || this.isFunction(obj2)) {
                return { type: VALUE_UNDEFINED.key }
            }
            if (this.isValue(obj1) || this.isValue(obj2)) {
                return {
                    type: this.compareValues(obj1, obj2).key,
                    data: obj1 === undefined ? obj2 : obj1
                };
            }
            let diff = {};
            for (key in obj1) {
                if (this.isFunction(obj1[key])) { continue; }
                let value2 = undefined;
                if (obj2[key] !== undefined) { value2 = obj2[key]; }
                diff[key] = this.map(obj1[key], value2);
            }
            for (key in obj2) {
                if (this.isFunction(obj2[key]) || diff[key] !== undefined) { continue; }
                diff[key] = this.map(undefined, obj2[key]);
            }
            return diff;
        },
        equal: function (obj1, obj2) {
            const value = mapEqual(obj1, obj2, this);
            return sumMapEqual(value, this) === 0;
        },
        compareValues: function (value1, value2) {
            if (value1 === value2) { return VALUE_UNCHANGED; }
            if (this.isDate(value1) && this.isDate(value2) && value1.getTime() === value2.getTime()) { return VALUE_UNCHANGED; }
            if (value1 === undefined) { return VALUE_CREATED; }
            if (value2 === undefined) { return VALUE_DELETED; }
            return VALUE_UPDATED;
        },
        isFunction: function (x) { return Object.prototype.toString.call(x) === '[object Function]'; },
        isArray: function (x) { return Object.prototype.toString.call(x) === '[object Array]'; },
        isDate: function (x) { return Object.prototype.toString.call(x) === '[object Date]'; },
        isObject: function (x) { return Object.prototype.toString.call(x) === '[object Object]'; },
        isValue: function (x) { return !this.isObject(x) && !this.isArray(x); }
    }
}();

const getValueByKey = (item, dataIndex) => {
    const keyArr = dataIndex.split(".");
    let res = item;
    keyArr.map((val) => {
        return res = res[val];
    })
    return res;
};

export const deduplicate = (arr, keys) => {
    let resultTemporary = false;
    let isExist = (arr, x) => {
        for (let i = 0; i < arr.length; i++) {
            if (typeof keys === "string") {
                if (getValueByKey(arr[i], keys) === getValueByKey(x, keys)) return true;
            }
            else if (keys && Array.isArray(keys)) {
                resultTemporary = true;
                for (let j = 0; j < keys.length; j++) {
                    if (getValueByKey(arr[i], keys[j]) !== getValueByKey(x, keys[j])) {
                        resultTemporary = false;
                    }
                }
                if (resultTemporary) return true;
            }
            else {
                if (deepDiffMapper.equal(arr[i], x)) return true;
            }
        }
        return false;
    }
    let ans = [];
    arr.forEach(element => {
        if (!isExist(ans, element)) ans.push(element);
    });
    return ans;
}

export const Base64 = {
    // private property
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

    // public method for encoding
    encode: function (input = "") {
        let output = "";
        let chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        let i = 0;
        input = Base64._utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            }
            else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
        }
        return output;
    },

    // public method for decoding
    decode: function (input = "") {
        let output = "";
        let chr1, chr2, chr3;
        let enc1, enc2, enc3, enc4;
        let i = 0;
        input = input.replace(/[^A-Za-z0-9+/=]/g, "");
        while (i < input.length) {
            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 !== 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 !== 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = Base64._utf8_decode(output);
        return output;
    },

    // private method for UTF-8 encoding
    _utf8_encode: function (string) {
        string = (string || "").replace(/\r\n/g, "\n");
        let utftext = "";
        for (let n = 0; n < string.length; n++) {
            let c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    },
    // private method for UTF-8 decoding
    _utf8_decode: function (utftext) {
        let string = "";
        let i = 0;
        let c = 0, c2 = 0, c3 = 0;
        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }
}

export const DataURIToBlob = (dataURI) => {
    const splitDataURI = dataURI.split(',')
    const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
    const mimeString = splitDataURI[0].split(':')[1].split(';')[0]
    const ia = new Uint8Array(byteString.length)
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], { type: mimeString })
}

/**
 * 
 * @param {*} cname 
 * @param {*} cvalue 
 * @param {*} exdays 
 */
export const setCookie = (cname, cvalue, exdays) => {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

/**
 * 
 * @param {*} cname 
 */
export const getCookie = (cname) => {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

/**
 * 
 * @param {*} elm 
 * @param {*} callback 
 * @param {*} filter :{
 *      attributeFilter?: string[];
 *      attributeOldValue?: boolean;
 *      attributes?: boolean;
 *      characterData?: boolean;
 *      characterDataOldValue?: boolean;
 *      childList?: boolean;
 *      subtree?: boolean;
 * }
 */
export const listenerAttributeChange = (elm, callback, filter = { attributes: true }) => {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === "attributes") {
                callback(elm.attributes);
            }
            return;
        });
    });
    observer.observe(elm, filter);
}

/**
 * 
 * @param {*} arr 
 */
export const countTreeMaxLevel = (arr = []) => {
    if (!arr || !Array.isArray(arr) || arr.length === 0) {
        return 0;
    }
    return 1 + Math.max.apply(Math, arr.map(item => countTreeMaxLevel(item.children)));
}

export const romanize = (num) => {
    if (isNaN(num))
        return NaN;
    let digits = String(+num).split(""),
        key = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM",
            "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC",
            "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"],
        roman = "",
        i = 3;
    while (i--)
        roman = (key[+digits.pop() + (i * 10)] || "") + roman;
    return Array(+digits.join("") + 1).join("M") + roman;
}

export const getTransform = (transform) => {
    if (transform) {
        var results = transform.split(/\w+\(|\);?/)
        const _transform = results[1].split(/,\s?/g);
        return {
            x: _transform[0],
            y: _transform[1],
            z: _transform[2],
        }
    }
    return undefined;
}

/**
 * 
 * @param {*} children 
 * @param {*} childrenName 
 */
export const flatten = (children = [], childrenName = "children") => {
    try {
        return Array.prototype.concat.apply(
            children,
            children.map(x => flatten(x[childrenName] || []))
        );
    }
    catch (e) {
        return [];
    }
}

/**
 * 
 * @param {*} list              // List menu
 * @param {*} url               // pathname
 * @param {*} result            // default =[]
 * @param {*} parentPermission  // default = []
 */
export const getPriviligeds = (list = [], url = null, result = [], parentPermission = []) => {
    list.map((item) => {
        var res = [];
        if (url === item.url) {
            _.orderBy(item.children, ['sort'], ['asc']).map((val) => {
                if (val.type === constants.CONST_PERMISSION_TYPE_ACTION) {
                    res.push(val);
                }
                return [...res];
            })
            return result = [...parentPermission, ...res];
        }
        else {
            if (item && item.children && Array.isArray(item.children)) {
                _.orderBy(item.children, ['sort'], ['asc']).map((val) => {
                    if (val.type === constants.CONST_PERMISSION_TYPE_ACTION) {
                        res.push(val);
                    }
                    return [...res];
                })
            }
            return result = getPriviligeds(item.children, url, result, [...parentPermission, ...res]);
        }
    });
    return result;
};

/**
 * 
 * @param {*} node 
 * @param {*} index 
 */
export const findFirstScrollParent = (node, index = 1) => {
    if (!node) { return document.body; }
    if (node.scrollHeight > node.clientHeight) {
        return index === 1 ? node : findFirstScrollParent(node.parentNode, index - 1);
    } else {
        return findFirstScrollParent(node.parentNode, index);
    }
}

/**
 * 
 * @param {*} param0 
 */
export const getDaysBetweenFromDateToDate = ({ fromDate, toDate, format = dateFormat }) => {
    let res = [];
    if (
        fromDate &&
        toDate &&
        format &&
        moment(fromDate, format).isValid() &&
        moment(toDate, format).isValid() &&
        moment(fromDate, format) <= moment(toDate, format)
    ) {
        const _fromDate = moment(fromDate, format);
        const _toDate = moment(toDate, format);
        let date = _fromDate;
        while (date <= _toDate) {
            res.push(date);
            date.add(1, "day")
        }
    }
    return res;
}

export const validURL = (str) => {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
}