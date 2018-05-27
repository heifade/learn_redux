import { UserData } from "./userManage/userList/userListCtrl";
import { Action, createStore } from "redux";
import { reducerUserList } from "./userManage/userList/userListCtrl";
import { reducerUserEdit } from "./userManage/userEdit/userEditCtrl";

export class StoreData {
  userList: Array<UserData>;
  currEditUser: UserData | null = null;
}

let initStoreData: StoreData = new StoreData();
initStoreData.userList = new Array<UserData>();

for (let i = 0; i < 20; i++) {
  initStoreData.userList.push({ id: `${i}`, name: `name${i}` });
}

export { initStoreData };

function reducer(state = initStoreData, action: Action) {
  return {
    userList: reducerUserList(state.userList, action),
    currEditUser: reducerUserEdit(state.currEditUser, action)
  };
}

export let store = createStore(reducer);
