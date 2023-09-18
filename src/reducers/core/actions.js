import * as type from './../../constants/type';

export default (state = [], action) => {
    var { values } = action;
    switch (action.type) {
        case type.TYPE_ACTIONS:
            return [...values];
        default:
            return state;
    }
}