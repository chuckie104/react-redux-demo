import {combineReducers} from "redux";

import friendGroupReducer from "./friendGroupReducer/friendGroupReducer";
import filesReducer from "./fileReducer/filesReducer";

const reducer = combineReducers({
  friendGroupReducer,
  filesReducer
})

export default reducer;
