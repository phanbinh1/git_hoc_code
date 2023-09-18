// import * as type from './../../../constants/type';
// import * as main from "./../../../constants/main";

export default (state = [], action) => {
    // var { values, value } = action;
    // var index = -1;
    switch (action.type) {
        // case type.TYPE_ACCOUNT_LIST:
        //     return [...values];
        // case type.TYPE_ACCOUNT_CREATE:
        //     return [value, ...state];
        // case type.TYPE_ACCOUNT_UPDATE:
        //     state = state.map((item) => {
        //         if (item.id === value.id) {
        //             return value;
        //         }
        //         else {
        //             return item;
        //         }
        //     });
        //     return [...state];
        // case type.TYPE_ACCOUNT_DELETE:
        //     values.map((id) => {
        //         index = main.findName(state, id);
        //         if (index !== -1) {
        //             state.splice(index, 1);
        //         }
        //         return state;
        //     })
        //     return [...state];
        // case type.TYPE_RESET_STORE:
        //     return [];
        default:
            return [...state];
    }
}