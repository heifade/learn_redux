import * as React from "react";
import * as ReactDOM from "react-dom";
import { UserList, UserData } from "./userList";
import { createStore, Action, combineReducers } from "redux";

let div = document.createElement("div");
document.body.appendChild(div);

let userList = new Array<UserData>();
userList.push({ id: "1", name: "1" });
userList.push({ id: "1", name: "1" });
userList.push({ id: "1", name: "1" });
userList.push({ id: "1", name: "1" });
userList.push({ id: "1", name: "1" });

ReactDOM.render(
  <div>
    <UserList userList={userList} />
  </div>,
  div
);

class MainState {
  userList: Array<UserData>;

  constructor() {
    this.userList = [];
  }
}

// function reducer(state: MainState = new MainState(), action: Action) {
//   return {
//     userList: reducerUserList(state.userList, action)
//   };
// }

function reducerUserList(state: Array<UserData> = [], action: Action) {
  switch (action.type) {
    case "add":
      return state.concat({
        id: "2",
        name: "2"
      });
    case "dele":
      return state.shift();
    default:
      return state;
  }
}

let reducer = combineReducers({ userList: reducerUserList });

let store = createStore(reducer);
store.subscribe(() => {
  console.log(1, store.getState());
});

store.dispatch({ type: 1 });
