import moment from "moment";
import { CONST_LUAN_CHUYEN } from "../../../../../constants/constants";
import { dateTimeFormat } from "../../../../../constants/controll";
const { NEW_TRANSFER_HANDLING, NEW, TRANSFER_HANDLING } = CONST_LUAN_CHUYEN;

export default (coSo, thaoTac = NEW, lyDo = null) => state => {
    const account_current = state.core.account_current;

    let lichSuLuanChuyen = [];
    try {
        lichSuLuanChuyen = JSON.parse(coSo.lichSuLuanChuyen);
        if (!Array.isArray(lichSuLuanChuyen)) { lichSuLuanChuyen = []; }
    }
    catch (e) { lichSuLuanChuyen = []; }

    if (thaoTac) {
        if (thaoTac === NEW_TRANSFER_HANDLING) {
            lichSuLuanChuyen.unshift({
                maXuLy: NEW,
                nguoiXuLy: account_current.fullName,
                username: account_current.name,
                lyDo,
                thoiGian: moment().format(dateTimeFormat),
            })
            lichSuLuanChuyen.unshift({
                maXuLy: TRANSFER_HANDLING,
                nguoiXuLy: account_current.fullName,
                username: account_current.name,
                lyDo,
                thoiGian: moment().format(dateTimeFormat),
            })
        }
        else {
            lichSuLuanChuyen.unshift({
                maXuLy: thaoTac,
                nguoiXuLy: account_current.fullName,
                username: account_current.name,
                lyDo,
                thoiGian: moment().format(dateTimeFormat),
            })
        }
        return {
            ...coSo,
            lichSuLuanChuyen: JSON.stringify(lichSuLuanChuyen)
        }
    }
    return coSo;
}