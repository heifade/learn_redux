import { UserData, userListReducer } from "./userManage/userList/userListCtrl";
import { createStore, Action } from "redux";
import { userEditReducer } from "./userManage/userEdit/userEditCtrl";
import { topReducer } from "./top/topCtrl";

export class TopData {
  waitShow: boolean = false;
}

export class StoreData {
  userList: Array<UserData>;
  currEditUser: UserData | null = null;
  top: TopData;
}

let initStoreData = new StoreData();
initStoreData.userList = new Array<UserData>();


export default function reducer(state = initStoreData, action: Action) {
  return {
    userList: userListReducer(state.userList, action),
    currEditUser: userEditReducer(state.currEditUser, action),
    top: topReducer(state.top, action),
  };
}


export let store = createStore(reducer);