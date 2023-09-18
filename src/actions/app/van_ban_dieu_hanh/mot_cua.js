import * as api from "../../../util/api_call";
import * as apiUrl from '../../../constants/api';
import * as main from "../../../constants/main";

export const HoSoMotCua_KetQuaThamDinh = async (data) => {
    const res = await api.post({
        url: apiUrl.API_MOTCUA_KETQUATHAMDINHHOSO,
        data,
    });
    return res;
}
