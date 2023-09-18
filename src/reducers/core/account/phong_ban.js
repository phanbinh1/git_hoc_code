import * as type from './../../../constants/type';
import { orderBy } from 'lodash';

export default (state = [], action) => {
    var { values } = action;
    let result = state;
    switch (action.type) {
        case type.TYPE_PHONG_BAN_ALL:
            result = [...values];
            break;
        default:
            break;
    }
    return orderBy(result, ["sort"], "asc");
}