import { connect } from "react-redux";
import { Action, Dispatch } from "redux";
import { UserListComponent, Props } from "./userList";
import { UserModule, store } from "../../module/module";


export function userListReducer(
  state = new Array<UserModule>(),
  action: Action
) {
  switch (action.type) {
    case "user_fetch":
      return Reflect.get(action, "userList");
    case "user_delete": {
      let index = state.findIndex(
        (value, index) => value.id == Reflect.get(action, "userData").id
      );
      let list1 = state.splice(index + 1);
      return state.splice(0, index).concat(list1);
    }
    case "user_edit_save": {
      let newData = Reflect.get(action, "userData");
      let index = state.findIndex((value, index) => value.id == newData.id);
      let data = state[index];
      let list1 = state.splice(index + 1);
      return state
        .splice(0, index)
        .concat([newData])
        .concat(list1);
    }
    default:
      return state;
  }
}

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    // userList: state.userManage.userList
    
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    fetch: () => {
      dispatch({
        type: "wait_show"
      });

      setTimeout(() => {
        let list = new Array<UserModule>();
        for (let i = 0; i < 20; i++) {
          list.push({ id: `${i}`, name: `name${i}` });
        }
        dispatch({
          type: "user_fetch",
          userList: list
        });
        dispatch({
          type: "wait_hide"
        });
      }, 1000);
    },
    delete: (userData: UserModule) => {
      dispatch({
        type: "wait_show"
      });
      setTimeout(() => {
        dispatch({
          type: "user_delete",
          userData: userData
        });
        dispatch({
          type: "wait_hide"
        });
      }, 1000);
    },
    edit: (userData: UserModule) => {
      dispatch({
        type: "user_edit",
        userData: userData
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserListComponent);
