import * as type from './../../../constants/type';

const init = {
    currentPage: 0,
    pageSize: 10,
    total: 0
}
export default (state = init, action) => {
    const { pagination } = action;
    switch (action.type) {
        case type.TYPE_NOTIFICATION_LIST:
            return pagination;
        case type.TYPE_NOTIFICATION_LOAD_MORE:
            return pagination;
        case type.TYPE_UNAUTHENTICATED:
            return init;
        default:
            return state;
    }
}