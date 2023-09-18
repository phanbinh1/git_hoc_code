import * as type from './../../constants/type';

export default (state = [], action) => {
    var { value } = action;
    switch (action.type) {
        case type.TYPE_CONTROLLERS:
            var result = state;
            state.map((item, index) => {
                if (item.key === value.key) {
                    result.splice(index, 1);
                }
                return null;
            });
            if (value.create) {
                delete value.create;
                result.push(value);
            }
            return result;
        default:
            return state;
    }
}