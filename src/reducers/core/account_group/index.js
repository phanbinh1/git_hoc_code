import { combineReducers } from "redux";

import item from "./item";
import list from "./list";
import permissions from "./permissions"
// ===================================================================================

export default combineReducers({
    item,
    list,
    permissions
})