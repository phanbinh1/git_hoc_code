import * as type from './../../constants/type';
import * as notification from "./../../constants/notification";

export default (state = [], action) => {
    let { job, jobCode } = action;
    const index = (state || []).findIndex(item => item.jobCode === jobCode);
    switch (action.type) {
        case type.TYPE_SYNC_PROCESS_CREATE:
            if (index !== -1) {
                state[index] = { ...state[index], show: true };
                return [...state];
            }
            else {
                return [job, ...state];
            }
        case type.TYPE_SYNC_PROCESS_UPDATE:
            if (index !== -1) {
                state[index] = { ...state[index], ...job };
                return [...state];
            }
            return state;
        case type.TYPE_SYNC_PROCESS_DELETE:
            notification.close(jobCode.jobCode);
            state.splice(index, 1);
            return [...state];
        default:
            return state;
    }
}