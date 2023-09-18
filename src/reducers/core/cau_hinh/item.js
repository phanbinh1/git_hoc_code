import * as type from './../../../constants/type';

export default (state = {}, action) => {
    const { value, payload } = action;
    switch (action.type) {
        case type.TYPE_CAU_HINH_EDIT:
            return { ...value };
        case type.TYPE_SOCKET_CONFIG:
            if (payload.type === type.TYPE_CAU_HINH_UPDATE && payload.data && payload.data.id === state.id) {
                return payload.data;
            }
            return state;
        case type.TYPE_CAU_HINH_CREATE:
            return {};
        case type.TYPE_CAU_HINH_UPDATE:
            return {};
        case type.TYPE_RESET_STORE:
            return {};
        default:
            return state;
    }
}