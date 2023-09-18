import { combineReducers } from "redux";
import item from "./item";
import list from "./list";
import tree from "./tree";

export default combineReducers({
    item,
    list,
    tree
});