import * as type from './../../../constants/type';

const init = {
    currentPage: 0,
    pageSize: 20,
    total: 0
}
export default (state = init, action) => {
    const { pagination } = action;
    switch (action.type) {
        case type.TYPE_NOTIFICATION_PAGE_LIST:
            return pagination;
        case type.TYPE_NOTIFICATION_LOAD_MORE_PAGE:
            return pagination;
        case type.TYPE_UNAUTHENTICATED:
            return init;
        default:
            return state;
    }
}