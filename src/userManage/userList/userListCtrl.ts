import { connect } from "react-redux";
import { Action, combineReducers, Dispatch } from "redux";
import { UserList } from "./userList";
import { StoreData } from "../../store";

export interface UserData {
  id: string;
  name: string;
}

export function reducerUserList(state: Array<UserData> = [], action: Action) {
  switch (action.type) {
    case "user_delete": 
      {
        let index = state.findIndex(
          (value, index) => value.id == Reflect.get(action, "userData").id
        );
        let list1 = state.splice(index + 1);
        return state.splice(0, index).concat(list1);
      }
    case "user_edit_save": 
      {
        let newData = Reflect.get(action, "userData");
        let index = state.findIndex(
          (value, index) => value.id == newData.id
        );
        let data = state[index];
        let list1 = state.splice(index + 1);
        return state.splice(0, index).concat([newData]).concat(list1);
      }
    case "fetch":
      return state;
    default:
      return state;
  }
}

const stateToProps = (state: StoreData) => {
  let action = {
    type: "fetch"
  };

  return {
    userList: reducerUserList(state.userList, action)
  };
};

const dispatchToProps = (dispath: Dispatch) => {
  return {
    delete: (userData: UserData) => {
      dispath({
        type: "user_delete",
        userData: userData
      });
    },
    edit: (userData: UserData) => {
      dispath({
        type: "user_edit",
        userData: userData
      });
    }
  };
};

export default connect(stateToProps, dispatchToProps)(UserList);
