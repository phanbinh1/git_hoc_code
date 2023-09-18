import * as type from './../../constants/type';

export default (state = [], action) => {
    var { pagination, key } = action;
    switch (action.type) {
        case type.TYPE_PAGINATION:
            var currentPage = pagination.currentPage > 0 ? pagination.currentPage : 1;
            var result = [...state];
            state.map((item, index) => {
                if (item.key === key) {
                    result.splice(index, 1);
                }
                return null;
            })
            result.push({
                key,
                pagination: {
                    ...pagination,
                    currentPage
                }
            });
            return [...result];
        default:
            return state;
    }
}