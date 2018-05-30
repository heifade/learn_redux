import { connect } from "react-redux";
import { Action, Dispatch } from "redux";
import { UserEditComponent } from "./userEdit";
import { UserModule, StoreModule } from "../../module/module";

export function userEditReducer(state: UserModule | null = null, action: Action) {
  switch (action.type) {
    case "user_edit":
      return Reflect.get(action, "userData");
    case "user_edit_username_changed":
      return { ...state, name: Reflect.get(action, "value") };
    case "user_edit_save":
      return null;
    case "user_edit_cancel":
      return null;
    default:
      return state;
  }
}

const mapStateToProps = (state: StoreModule, ownProps: any) => {
  return {
    currEditUser: state.userManage.currEditUser
  };
};

export default connect(mapStateToProps)(UserEditComponent);
