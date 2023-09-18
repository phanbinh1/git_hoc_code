import { find } from 'lodash';
import * as type from './../../../../constants/type';

export default (state = [], action) => {
   var { values, value } = action;
   var index = -1;
   function romanToNum(roman) {
      if (roman === "") return 0;
      if (roman.startsWith("L")) return 50 + romanToNum(roman.substr(1));
      if (roman.startsWith("XL")) return 40 + romanToNum(roman.substr(2));
      if (roman.startsWith("X")) return 10 + romanToNum(roman.substr(1));
      if (roman.startsWith("IX")) return 9 + romanToNum(roman.substr(2));
      if (roman.startsWith("V")) return 5 + romanToNum(roman.substr(1));
      if (roman.startsWith("IV")) return 4 + romanToNum(roman.substr(2));
      if (roman.startsWith("I")) return 1 + romanToNum(roman.substr(1));
      return 0;
   }
   const handleCreate = (state, payload) => {
      let CoSoThucHienDanhGia = {
         idKeHoachThamDinh: payload.tieuChiCha.idKeHoachThamDinh,
         idCoSo: payload.tieuChiCha.idCoSo,
         idTieuChi: payload.tieuChiCha.id,
         idTieuChiCha: payload.tieuChiCha.idCha,
         stt: payload.tieuChiCha.stt,
         noiDung: payload.tieuChiCha.noiDung,
         mucDoDanhGia: "",
         ghiChu: "",
         ketQua: null
      }
      let tieuChi = {
         coSoThucHienDanhGia: {
            idKeHoachThamDinh: payload.tieuChi.idKeHoachThamDinh,
            idCoSo: payload.tieuChi.idCoSo,
            idTieuChi: payload.tieuChi.id,
            idTieuChiCha: payload.tieuChi.idCha,
            stt: payload.tieuChi.stt,
            noiDung: payload.tieuChi.noiDung,
            mucDoDanhGia: payload.tieuChi.mucDoDanhGia,
            ghiChu: "",
            ketQua: payload.tieuChi.danhGia
         },
         childs: []
      }
      if (state.length > 0) {
         let findIndexState = state.find(f => f.coSoThucHienDanhGia.idTieuChi === CoSoThucHienDanhGia.idTieuChi);
         if (findIndexState) {
            return state.map(m => {
               if (m.coSoThucHienDanhGia.idTieuChi === CoSoThucHienDanhGia.idTieuChi) {
                  let findIndexchilds = m.childs.findIndex(f => f.coSoThucHienDanhGia.idTieuChi === tieuChi.coSoThucHienDanhGia.idTieuChi);
                  return {
                     ...m,
                     childs: findIndexchilds != -1 ? m.childs.map((mc, indexc) => {
                        if (indexc == findIndexchilds) {
                           return tieuChi
                        } else {
                           return mc
                        }
                     }) : [...m.childs, tieuChi]
                  }
               } else {
                  return m
               }
            })
         } else {
            return [...state, {
               coSoThucHienDanhGia: CoSoThucHienDanhGia,
               childs: [
                  tieuChi
               ]
            }]
         }
      } else {
         return [
            {
               coSoThucHienDanhGia: CoSoThucHienDanhGia,
               childs: [
                  tieuChi
               ]
            }
         ]
      }
   }

   const handleEdit = (state, payload) => {
      let CoSoThucHienDanhGia = {
         idKeHoachThamDinh: payload.tieuChiCha.idKeHoachThamDinh,
         idCoSo: payload.tieuChiCha.idCoSo,
         idTieuChi: payload.tieuChiCha.idTieuChi,
         idTieuChiCha: payload.tieuChiCha.idTieuChiCha,
         stt: payload.tieuChiCha.stt,
         noiDung: payload.tieuChiCha.noiDung,
         mucDoDanhGia: "",
         ghiChu: "",
         ketQua: null,
         id: payload.tieuChiCha.id
      }
      let tieuChi = {
         coSoThucHienDanhGia: {
            idKeHoachThamDinh: payload.tieuChi.idKeHoachThamDinh,
            idCoSo: payload.tieuChi.idCoSo,
            idTieuChi: payload.tieuChi.idTieuChi,
            idTieuChiCha: payload.tieuChi.idTieuChiCha,
            stt: payload.tieuChi.stt,
            noiDung: payload.tieuChi.noiDung,
            mucDoDanhGia: payload.tieuChi.mucDoDanhGia,
            ghiChu: "",
            ketQua: payload.tieuChi.danhGia,
            id: payload.tieuChi.id
         },
         childs: []
      }
      if (state.length > 0) {
         let findIndexState = state.find(f => f.coSoThucHienDanhGia.idTieuChi === CoSoThucHienDanhGia.idTieuChi);
         if (findIndexState) {
            return state.map(m => {
               if (m.coSoThucHienDanhGia.idTieuChi === CoSoThucHienDanhGia.idTieuChi) {
                  let findIndexchilds = m.childs.findIndex(f => f.coSoThucHienDanhGia.idTieuChi === tieuChi.coSoThucHienDanhGia.idTieuChi);
                  return {
                     ...m,
                     childs: findIndexchilds != -1 ? m.childs.map((mc, indexc) => {
                        if (indexc == findIndexchilds) {
                           return tieuChi
                        } else {
                           return mc
                        }
                     }) : [...m.childs, tieuChi]
                  }
               } else {
                  return m
               }
            })
         } else {
            return [...state, {
               coSoThucHienDanhGia: CoSoThucHienDanhGia,
               childs: [
                  tieuChi
               ]
            }]
         }
      } else {
         return [
            {
               coSoThucHienDanhGia: CoSoThucHienDanhGia,
               childs: [
                  tieuChi
               ]
            }
         ]
      }
   }
   const handleAll = (state, payloadTatCa) => {
      return state.map(m => {
         if (m.coSoThucHienDanhGia.idTieuChi === payloadTatCa.coSoThucHienDanhGia.idTieuChi) {
            return {
               ...m,
               childs: m.childs.length > 0 ? m.childs.map((mc, indexc) => {
                  if (payloadTatCa.checkTatCa !== null) {
                     return {
                        ...mc,
                        coSoThucHienDanhGia: {
                           ...mc.coSoThucHienDanhGia,
                           ketQua: payloadTatCa.checkTatCa
                        }
                     }
                  } else {
                     if (payloadTatCa.trangThai === "DAT") {
                        return {
                           ...mc,
                           coSoThucHienDanhGia: {
                              ...mc.coSoThucHienDanhGia,
                              ketQua: mc.coSoThucHienDanhGia.ketQua === false ? false : null
                           }
                        };
                     } else if (payloadTatCa.trangThai === "KHONGDAT") {
                        return {
                           ...mc,
                           coSoThucHienDanhGia: {
                              ...mc.coSoThucHienDanhGia,
                              ketQua: mc.coSoThucHienDanhGia.ketQua === true ? true : null
                           }
                        };
                     }
                  }
               }) : []
            }
         } else {
            return m
         }
      })
   }
   switch (action.type) {
      case "DANH_GIA_MUC_HANG_SAO_CREATE":
         let payload = action.values
         return handleCreate(state, payload)
      case "DANH_GIA_MUC_HANG_SAO_EDIT":
         let payloadEdit = action.values
         return payloadEdit.coSoThucHienDanhGiaXepHangSao.map(m => {
            return {
               childs: m.childs.sort((a, b) => {
                  let ac = parseInt(a.coSoThucHienDanhGia.stt);
                  let bc = parseInt(b.coSoThucHienDanhGia.stt)
                  return ac - bc
               }),
               coSoThucHienDanhGia: m.coSoThucHienDanhGia
            }
         }).sort((a, b) => {
            let ac = parseInt(a.coSoThucHienDanhGia.sttRoman);
            let bc = parseInt(b.coSoThucHienDanhGia.sttRoman);
            return ac - bc
         });
      case "DANH_GIA_MUC_HANG_SAO_UPDATE":
         let payloadUpdate = action.values
         return handleEdit(state, payloadUpdate)
      case "DANH_GIA_MUC_HANG_SAO_TAT_CA":
         let payloadTatCa = action.values
         return handleAll(state, payloadTatCa)
      case "DANH_GIA_MUC_HANG_SAO_NULL":
         return [];
      case type.TYPE_RESET_STORE:
         return [];
      default:
         return state;
   }
}