import * as React from "react";
import * as ReactDOM from "react-dom";

import { Provider } from "react-redux";
import UserList from "./userManage/userList/userListCtrl";
import { store } from "./store";
import UserEdit from "./userManage/userEdit/userEditCtrl";
import Top from "./top/topCtrl";

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
