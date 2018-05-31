import { connect } from "react-redux";
import { Action, Dispatch } from "redux";
import { UserListComponent, Props } from "./userList";
import {
  UserModule,
  UserListManageModule,
  StoreModule
} from "../../module/module";

let initState: UserListManageModule = {
  userList: [],
  isWaiting: false
};

export function userListReducer(
  state = initState,
  action: Action
): UserListManageModule {
  switch (action.type) {
    case "user_list_fetching":
      return {
        ...state,
        isWaiting: true
      };
    case "user_list_fetched":
      return {
        ...state,
        userList: Reflect.get(action, "userList"),
        isWaiting: false
      };
    case "user_deleting":
      return {
        ...state,
        isWaiting: true
      };
    case "user_deleted": {
      let userList = state.userList;
      let index = userList.findIndex(
        (value, index) => value.id == Reflect.get(action, "userData").id
      );
      let list1 = userList.splice(index + 1);
      return {
        userList: userList.splice(0, index).concat(list1),
        isWaiting: false
      };
    }
    case "user_saved": {
      let userList = state.userList;
      let newData = Reflect.get(action, "userData");
      let index = userList.findIndex((value, index) => value.id == newData.id);
      let data = userList[index];
      let list1 = userList.splice(index + 1);

      return {
        ...state,
        userList: userList
          .splice(0, index)
          .concat([newData])
          .concat(list1)
      };
    }
    default:
      return state;
  }
}

const mapStateToProps = (state: StoreModule, ownProps: any) => {
  return {
    userListManage: state.userManage.userListManage
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    fetch: () => {
      dispatch({
        type: "user_list_fetching"
      });

      setTimeout(() => {
        let list = new Array<UserModule>();
        for (let i = 0; i < 20; i++) {
          list.push({ id: `${i}`, name: `name${i}` });
        }
        dispatch({
          type: "user_list_fetched",
          userList: list
        });
      }, 1000);
    },
    delete: (userData: UserModule) => {
      dispatch({
        type: "user_deleting"
      });
      setTimeout(() => {
        dispatch({
          type: "user_deleted",
          userData: userData
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
