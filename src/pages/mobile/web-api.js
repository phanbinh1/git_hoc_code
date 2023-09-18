import md5 from 'js-md5';
import { API_BAI_VIET } from '../../constants/api';
import { get } from '../../util/api_call';
const API = "http://192.168.2.215:8283/c/portal/uni_api";
const secretKey = "biqJBLKvihWDdGkEcJkSsVqShrPcMSQW";

const secureKey = (actionName, id) => md5(`${actionName}${id}${secretKey}`);

const actions = {
    getList: "get_list",
    getDetail: "get_detail"
}
export const categoryId = {
    hoatDongBan: 10919,
    hoatDongCuaDiaPhuong: 10920,
    thongTinCungCapChoBaoChi: 13627
}

export const getList = async ({
    categoryId,
    page = 1,
    pageSize = 10
}) => {
    const start = page * pageSize - pageSize;
    const end = page * pageSize;
    const url = `${API_BAI_VIET}/danhsach/${categoryId}/${start}/${end}`
    const res = await get({ url, isConfirm: false })
    return res;
}

export const getListHoatDongBan = async ({ page = 1, pageSize = 10 }) => {
    const res = await getList({ categoryId: categoryId.hoatDongBan, page, pageSize });
    return res;
}
export const getListHoatDongCuaDiaPhuong = async ({ page = 1, pageSize = 10 }) => {
    const res = await getList({ categoryId: categoryId.hoatDongCuaDiaPhuong, page, pageSize });
    return res;
}

export const getListThongTinCungCapChoBaoChi = async ({ page = 1, pageSize = 10 }) => {
    const res = await getList({ categoryId: categoryId.hoatDongCuaDiaPhuong, page, pageSize });
    return res;
}

export const getDetail = async (id) => {
    const url = `${API_BAI_VIET}/chitiet/${id}`
    const res = await get({ url, isConfirm: false })
    return res;
}