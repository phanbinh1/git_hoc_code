import * as type from './../../../constants/type';

export default (state = {}, action) => {
    var { value, payload } = action;
    switch (action.type) {
        case type.TYPE_CAU_HINH_LOAD_VBDH:
            return { ...value };
        case type.TYPE_CAU_HINH_UPDATE:
            if (value.ma === "vanbandieuhanh_info") {
                return JSON.parse(value.giaTri);
            }
            return state;
        case type.TYPE_SOCKET_CONFIG:
            if (payload.type === type.TYPE_CAU_HINH_UPDATE && payload.data && payload.data.ma === "vanbandieuhanh_info") {
                return JSON.parse(payload.data.giaTri);
            }
            return state;
        default:
            return state;
    }
}