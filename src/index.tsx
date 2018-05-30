import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import Top from "./top/topCtrl";
import UserList from "./userManage/userList/userListCtrl";
import UserEdit from "./userManage/userEdit/userEditCtrl";

let div = document.createElement("div");
document.body.appendChild(div);

ReactDOM.render(
  <Provider store={store}>
    <div>
      <UserList />
      <UserEdit />
      <Top />
    </div>
  </Provider>,

  div
);
