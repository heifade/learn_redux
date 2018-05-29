import { Action } from "redux";
import { userListReducer } from "./userList/userListCtrl";
import { userEditReducer } from "./userEdit/userEditCtrl";
import { connect } from "react-redux";
import { UserManageComponent } from "./userManage";
import { UserManageModule } from "../module/module";

export function userManageReducer(state: UserManageModule, action: Action) {
  return {
    userList: userListReducer(state.userList, action),
    currEditUser: userEditReducer(state.currEditUser, action),
  }
}

export default connect()(UserManageComponent);
