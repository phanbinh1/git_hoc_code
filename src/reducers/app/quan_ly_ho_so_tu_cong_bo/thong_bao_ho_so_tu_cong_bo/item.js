import * as type from './../../../../constants/type';

export default (state = {}, action) => {
    var { value } = action;
    switch (action.type) {
        case type.TYPE_THONG_BAO_HO_SO_TU_CONG_BO_EDIT:
            return { ...value };
        case type.TYPE_THONG_BAO_HO_SO_TU_CONG_BO_CREATE:
            return {};
        case type.TYPE_THONG_BAO_HO_SO_TU_CONG_BO_UPDATE:
            return { ...value };
        case type.TYPE_HO_SO_TU_CONG_BO_PHE_DUYET:
            const { thongBaoCongBo, listHoSo } = state;
            const { ids, trangThaiPheDuyet, lyDoKhongPheDuyet } = value;
            let _hoSos = [...listHoSo];
            let index = -1;
            ids.map(id => {
                index = _hoSos.findIndex(item => item.id === id);
                if (index !== -1) {
                    _hoSos[index] = {
                        ..._hoSos[index],
                        trangThaiPheDuyet,
                        lyDoKhongPheDuyet: lyDoKhongPheDuyet || null
                    }
                }
                return null;
            })
            return {
                thongBaoCongBo,
                listHoSo: _hoSos
            };
        case type.TYPE_THONG_BAO_HO_SO_TU_CONG_BO_TRINHPHEDUYET:
            return { ...state, thongBaoCongBo: value, listHoSo: value.listHoSo };
        case type.TYPE_THONG_BAO_HO_SO_TU_CONG_BO_YEU_CAU_BO_SUNG_HO_SO:
            return {
                ...state,
                listHoSo: state.listHoSo.filter(hs => !(value.listHoSoCongBo || []).find(hscb => hs.id === hscb.id))
            };
        case type.TYPE_RESET_STORE:
            return {};
        default:
            return state;
    }
}