import { Action, combineReducers } from "redux";
import { userListReducer } from "./userList/userListCtrl";
import { userEditReducer } from "./userEdit/userEditCtrl";
import { connect } from "react-redux";


// export function userManageReducer(state = new UserManageModule(), action: Action) {
//   return {
//     userList: userListReducer(state.userList, action),
//     currEditUser: userEditReducer(state.currEditUser, action),
//   }
// }


export let userManageReducer = combineReducers({
  userListManage: userListReducer,
  userEditManage: userEditReducer
});