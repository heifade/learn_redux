import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import UserList from "./userManage/userList/userListCtrl";
import UserEdit from "./userManage/userEdit/userEditCtrl";
import 'antd/dist/antd.css';

let div = document.createElement("div");
document.body.appendChild(div);

ReactDOM.render(
  <Provider store={store}>
    <div>
      <UserList />
      <UserEdit />
    </div>
  </Provider>,

  div
);
