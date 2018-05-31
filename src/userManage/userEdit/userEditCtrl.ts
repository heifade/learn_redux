import { connect } from "react-redux";
import { Action, Dispatch, AnyAction } from "redux";
import { UserEditComponent } from "./userEdit";
import {
  UserModule,
  UserEditManageModule,
  StoreModule
} from "../../module/module";
import { store } from "../../store";
import { resolve } from "path";

let initState: UserEditManageModule = {
  user: null,
  isEditing: false,
  isWaiting: false
};

export function userEditReducer(
  state = initState,
  action: Action
): UserEditManageModule {
  switch (action.type) {
    case "user_edit":
      return {
        ...state,
        isEditing: true,
        user: Reflect.get(action, "userData")
      };
    case "user_edit_username_changed":
      return {
        ...state,
        user: {
          ...state.user!,
          name: Reflect.get(action, "value")
        }
      };
    case "user_edit_saving":
      return {
        ...state,
        isWaiting: true
      };
    case "user_edit_saved":
      return {
        ...state,
        isEditing: false,
        isWaiting: false
      };
    case "user_edit_cancel":
      return {
        ...state,
        isEditing: false
      };
    default:
      return state;
  }
}

function editSave(userData: UserModule) {
  return function(dispatch: Dispatch) {
    dispatch({
      type: "user_edit_saving"
    });

    return new Promise((resolve1, reject1) => {
      setTimeout(() => {
        dispatch({
          type: "user_edit_saved"
        });
        resolve1();
      }, 500);
    }).then(() => {
      return new Promise((resolve3, reject3) => {
        setTimeout(() => {
          dispatch({
            type: "user_saved",
            userData
          });
          resolve3();
        }, 500);
      });
    });
  };
}

const mapStateToProps = (state: StoreModule, ownProps: any) => {
  return {
    userEditManage: state.userManage.userEditManage
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    userNameChanged: (value: string) => {
      dispatch({
        type: "user_edit_username_changed",
        value: value
      });
    },
    save: (userEditManage: UserEditManageModule) => {
      dispatch(editSave(userEditManage.user!)).then(() => {});
    },
    cancel: () => {
      dispatch({
        type: "user_edit_cancel"
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserEditComponent);
