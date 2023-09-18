import { get } from "./../../../../util/api_call";
import { API_QUOC_GIA } from './../../../../constants/api';

const asyncValidate = async (values) => {
    const error = {};
    const res = await get({ url: `${API_QUOC_GIA}/ma/${values.maQuocGia}` });
    if (res.result && res.result.id !== values.id) {
        error.maQuocGia = "Mã quốc gia đã tồn tại!";
        throw error;
    }
}

export default asyncValidate;