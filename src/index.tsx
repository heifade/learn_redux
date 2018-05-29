import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import Top from "./top/topCtrl";
import UserManage from "./userManage/userManageCtrl";

let div = document.createElement("div");
document.body.appendChild(div);

ReactDOM.render(
  <Provider store={store}>
    <div>
      <UserManage />
      <Top />
    </div>
  </Provider>,

  div
);
