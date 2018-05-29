import { connect } from "react-redux";
import { Action, Dispatch } from "redux";
import { UserEditComponent } from "./userEdit";
import { UserModule, StoreModule } from "../../module/module";

export function userEditReducer(state: UserModule | null, action: Action) {
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

const stateToProps = (state: StoreModule) => {
  let action = {
    type: "fetch_user_eidt"
  };

  return {
    currEditUser: userEditReducer(state.userManage.currEditUser, action)
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
    onSave: (userData: UserModule) => {
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

export default connect(stateToProps, dispatchToProps)(UserEditComponent);
