import * as type from './../../../constants/type';

export default (state = 0, action) => {
    const { count } = action;
    let res = 0;
    switch (action.type) {
        case type.TYPE_NOTIFICATION_COUNT:
            res = count; break;
        case type.TYPE_NOTIFICATION_TICK_SEEN_ALL:
            res = 0; break;
        case type.TYPE_NOTIFICATION_COUNT_INCREASE:
            res = state + (count || 1); break;
        case type.TYPE_NOTIFICATION_COUNT_DECREASE:
            res = state - (count || 1); break;
        case type.TYPE_NOTIFICATION_TICK_NOT_RECEIVED:
            res = state + (count || 1); break;
        case type.TYPE_NOTIFICATION_TICK_RECEIVED:
            res = state - (count || 1); break;
        case type.TYPE_UNAUTHENTICATED:
            res = 0; break;
        case type.TYPE_NOTIFICATION_NEW:
            res = state + (count || 1); break;
        case type.TYPE_NOTIFICATION_TICK_RECEIVED_ALL:
            res = 0; break;
        default:
            res = state; break;
    }
    return res > 0 ? res : 0;
}