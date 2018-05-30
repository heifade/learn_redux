import { connect } from "react-redux";
import { Action, Dispatch } from "redux";
import { UserListComponent } from "./userList";
import { UserModule, StoreModule } from "../../module/module";

export function userListReducer(state = new Array<UserModule>(), action: Action) {
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
    case "fetch":
      return state;
    default:
      return state;
  }
}

const stateToProps = (state: StoreModule) => {
  let action = {
    type: "fetch"
  };

  return {
    userList: userListReducer(state.userManage.userList, action)
  };
};

const dispatchToProps = (dispath: Dispatch) => {
  return {
    fetch: () => {
      dispath({
        type: "wait_show"
      });

      setTimeout(() => {
        let list = new Array<UserModule>();
        for (let i = 0; i < 20; i++) {
          list.push({ id: `${i}`, name: `name${i}` });
        }
        dispath({
          type: "user_fetch",
          userList: list
        });
        dispath({
          type: "wait_hide"
        });
      }, 1000);
    },
    delete: (userData: UserModule) => {
      dispath({
        type: "wait_show"
      });
      setTimeout(() => {
        dispath({
          type: "user_delete",
          userData: userData
        });
        dispath({
          type: "wait_hide"
        });
      }, 1000);
    },
    edit: (userData: UserModule) => {
      dispath({
        type: "user_edit",
        userData: userData
      });
    }
  };
};

export default connect(stateToProps, dispatchToProps)(UserListComponent);
