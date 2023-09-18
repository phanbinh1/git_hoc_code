import * as type from '../../../../constants/type';

export default (state = [], action) => {
    switch (action.type) {
        case type.TYPE_QLONATTP_THANH_LAP_DOAN_KIEM_TRA_UPDATE_KEHOACH_BY_ID:
            const { keHoachGiamSat } = action;
            if (state.findIndex(item => item.id === keHoachGiamSat.id) > -1) {
                return state.map(item => item.id === keHoachGiamSat.id ? keHoachGiamSat : item);
            }
            else {
                return [...state, keHoachGiamSat]
            }
        default:
            return state;
    }
}