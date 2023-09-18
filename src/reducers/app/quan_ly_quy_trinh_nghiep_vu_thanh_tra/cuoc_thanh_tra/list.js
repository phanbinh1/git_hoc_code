import * as type from './../../../../constants/type';

export default (state = [], action) => {
    var { values, value } = action;
    switch (action.type) {
        case type.TYPE_QTNVTT_CUOC_THANH_TRA_LIST:
            return [...values];
        case type.TYPE_QTNVTT_CUOC_THANH_TRA_CREATE:
            return [value, ...state];
        case type.TYPE_QTNVTT_CUOC_THANH_TRA_UPDATE_KEHOACH_BY_ID_CTT:
            const { keHoachThanhKiemTra } = action;
            return state.map(item => keHoachThanhKiemTra && item.keHoachThanhKiemTra && item.keHoachThanhKiemTra.id === keHoachThanhKiemTra.id ? { ...item, keHoachThanhKiemTra } : item);
        case type.TYPE_QTNVTT_CUOC_THANH_TRA_CHILD_CREATE:
            return state.map(item => {
                if (item.id === value.idChaCuocThanhKiemTra) {
                    return {
                        ...item,
                        dotThanhKiemTra: item.dotThanhKiemTra.findIndex(dtt => dtt.id === value.id) >= 0 ?
                            item.dotThanhKiemTra.map(dtt => dtt.id === value.id ? value : dtt) :
                            [...item.dotThanhKiemTra, value]
                    }
                }
                else {
                    return item;
                }
            });
        case type.TYPE_QTNVTT_CUOC_THANH_TRA_CHILD_UPDATE:
            return state.map(item => {
                if (item.id === value.idChaCuocThanhKiemTra) {
                    return {
                        ...item,
                        dotThanhKiemTra: item.dotThanhKiemTra.findIndex(dtt => dtt.id === value.id) >= 0 ?
                            item.dotThanhKiemTra.map(dtt => dtt.id === value.id ? value : dtt) :
                            [...item.dotThanhKiemTra, value]
                    }
                }
                else {
                    return item;
                }
            });
        case type.TYPE_QTNVTT_CUOC_THANH_TRA_UPDATE:
            state = state.map((item) => {
                if (item.id === value.id) {
                    return value;
                }
                else {
                    return item;
                }
            });
            return [...state];
        case type.TYPE_QTNVTT_CUOC_THANH_TRA_KETLUAN:
            state = state.map((item) => {
                if (item.id === value.id) {
                    return { ...item, ...value };
                }
                else {
                    return item;
                }
            });
            return [...state];
        case type.TYPE_QTNVTT_DOT_THANH_TRA_UPDATE_THONG_TIN_BAN_HANH:
            return state.map((item) => {
                if (item.id === action.idCuocThanhTra) {
                    return {
                        ...item,
                        dotThanhKiemTra: (item.dotThanhKiemTra || []).map(dtt => {
                            if (dtt.id === value.id) {
                                return value;
                            }
                            return dtt;
                        })
                    }
                }
                else {
                    return item;
                }
            });
        case type.TYPE_QTNVTT_CUOC_THANH_TRA_DELETE:
            return state.filter(item => values.findIndex(id => id === item.id) === -1);
        case type.TYPE_RESET_STORE:
            return [];
        default:
            return state;
    }
}