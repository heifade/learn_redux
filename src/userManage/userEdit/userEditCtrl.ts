import { connect } from "react-redux";
import { UserData } from "../userList/userListCtrl";
import { Action, Dispatch } from "redux";
import { UserEdit } from "./userEdit";
import { StoreData } from "../../store";

export function userEditReducer(state: UserData | null, action: Action) {
  switch (action.type) {
    case "user_edit":
      return Reflect.get(action, "userData");
    case "user_edit_username_changed":
      return { ...state, name: Reflect.get(action, "value") };
    case "fetch_user_eidt":
      return state;
    case "user_edit_save":
      return null;
    case "user_edit_cancel":
      return null;
    default:
      return state;
  }
}

const stateToProps = (state: StoreData) => {
  let action = {
    type: "fetch_user_eidt"
  };

  return {
    currEditUser: userEditReducer(state.currEditUser, action)
  };
};

const dispatchToProps = (dispath: Dispatch) => {
  return {
    onUserNameChanged: (value: string) => {
      dispath({
        type: "user_edit_username_changed",
        value
      });
    },
    onSave: (userData: UserData) => {
      dispath({
        type: "user_edit_save",
        userData
      });
    },
    onCancel: () => {
      dispath({
        type: "user_edit_cancel"
      });
    }
  };
};

export default connect(stateToProps, dispatchToProps)(UserEdit);
