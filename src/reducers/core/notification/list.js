import * as type from './../../../constants/type';
import { NOTIFI_CODE_UPDATE_VERSION } from '../../../components/core/account_current/notification';

export default (state = [], action) => {
    const { values, ids, notification } = action;
    let notifis = state;
    switch (action.type) {
        case type.TYPE_NOTIFICATION_LIST:
            notifis = [...values];
            break;
        case type.TYPE_NOTIFICATION_LOAD_MORE:
            notifis = [...state, ...values];
            break;
        case type.TYPE_NOTIFICATION_NEW:
            notifis = [notification, ...state];
            break;
        case type.TYPE_NOTIFICATION_TICK_SEEN_ALL:
            notifis = state.map((item) => {
                return { ...item, daXem: true, daNhan: true };
            });
            break;
        case type.TYPE_NOTIFICATION_TICK_SEEN:
            notifis = state.map((item) => {
                if (ids.findIndex(id => item.id === id) > -1) {
                    return { ...item, daXem: true, daNhan: true };
                }
                else {
                    return item;
                }
            });
            break;
        case type.TYPE_NOTIFICATION_TICK_NOT_SEEN:
            notifis = state.map((item) => {
                if (ids.findIndex(id => item.id === id) > -1) {
                    return { ...item, daXem: false, daNhan: true };
                }
                else {
                    return item;
                }
            });
            break;
        case type.TYPE_NOTIFICATION_DELETE:
            notifis = state.filter((item) => ids.findIndex(id => item.id === id) === -1);
            break;
        case type.TYPE_UNAUTHENTICATED:
            notifis = [];
            break;
        default:
            notifis = state;
            break;
    }
    const notifiUpdateVersionIndex = notifis.findIndex(item => item.thongBao.maThongBao === NOTIFI_CODE_UPDATE_VERSION);
    return notifis.filter((item, i) => item.thongBao.maThongBao !== NOTIFI_CODE_UPDATE_VERSION || (item.thongBao.maThongBao === NOTIFI_CODE_UPDATE_VERSION && i === notifiUpdateVersionIndex));
}