import * as type from '../../../../constants/type';

export default (state = [], action) => {
    switch (action.type) {
        case type.TYPE_QTNVTT_CUOC_THANH_TRA_UPDATE_KEHOACH_BY_ID:
            const { keHoachThanhKiemTra } = action;
            if (state.findIndex(item => item.id === keHoachThanhKiemTra.id) > -1) {
                return state.map(item => item.id === keHoachThanhKiemTra.id ? keHoachThanhKiemTra : item);
            }
            else {
                return [...state, keHoachThanhKiemTra]
            }
        default:
            return state;
    }
}