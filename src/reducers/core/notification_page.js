import * as type from './../../constants/type';

export default (state = [], action) => {
    let { values } = action;
    switch (action.type) {
        case type.TYPE_NOTIFICATION_PAGE_LIST:
            return [...values];
        case type.TYPE_NOTIFICATION_LOAD_MORE_PAGE:
            return [...state, ...values];
        case type.TYPE_NOTIFICATION_LOAD_NEW:
            return [...values, ...state];
        default:
            return state;
    }
}