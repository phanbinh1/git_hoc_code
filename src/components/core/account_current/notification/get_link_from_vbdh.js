import { CONST_ATTACH_TYPE } from "./../../../../constants/constants";
import {
    URL_QTNVTT_CUOC_THANH_TRA_DETAIL,
    URL_QTNVTT_KE_HOACH_THANH_TRA_DETAIL
} from "./../../../../constants/url"
const {
    CUOCTHANHKIEMTRA,
    KEHOACHTHANHKIEMTRA
} = CONST_ATTACH_TYPE;
export default ({
    entityId,
    entityType,

}, notifi_redirect) => {
    switch (entityType) {
        case CUOCTHANHKIEMTRA:
            return `${URL_QTNVTT_CUOC_THANH_TRA_DETAIL}?id=${entityId}&notifi_redirect=${notifi_redirect}`;
        case KEHOACHTHANHKIEMTRA:
            return `${URL_QTNVTT_KE_HOACH_THANH_TRA_DETAIL}?id=${entityId}&notifi_redirect=${notifi_redirect}`;
        default: return "#";
    }
}