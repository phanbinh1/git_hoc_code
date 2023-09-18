import * as type from './../../constants/type';

export default (state = [], action) => {
    var { rows_selected, key } = action;
    switch (action.type) {
        case type.TYPE_SELECT_ROW:
            let index = state.findIndex(item => item.key === key);
            if (index >= 0) {
                state[index] = { key, rows_selected };
                return [...state];
            }
            else {
                return [...state, { key, rows_selected }];
            }
        default:
            return state;
    }
}