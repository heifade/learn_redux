import * as React from "react";
import * as ReactDOM from "react-dom";
import { UserListC } from "./userList";


let div = document.createElement("div");
document.body.appendChild(div);



ReactDOM.render(
  <div>
    <UserListC />
  </div>,
  div
);


