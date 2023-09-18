import item from "./item";
import list from "./list";
import history from "./history";

import { combineReducers } from "redux";

export default combineReducers({
    item,
    list,
    history
});