import { createStore, Action } from "redux";
import { topReducer } from "./top/topCtrl";
import { userManageReducer } from "./userManage/userManageCtrl";
import { StoreModule } from "./module/module";

export default function reducer(state = new StoreModule(), action: Action) {
  return {
    userManage: userManageReducer(state.userManage, action),
    top: topReducer(state.top, action)
  };
}

export let store = createStore(reducer);

store.subscribe(() => {
  // console.log(1, store.getState());
});
