import * as React from "react";
import { createStore, Action, combineReducers, Dispatch } from "redux";
import { connect } from "react-redux";

export interface UserData {
  id: string;
  name: string;
}

export interface Props {
  userList?: Array<UserData>;
}

export class UserList extends React.Component<Props, any> {
  constructor(props: Props, context: any) {
    super(props, context);
  }

  edit = (user: UserData) => {};
  dele = (user: UserData) => {};

  fetch = () => {};

  render() {
    return (
      <div>
        <button type="button" onClick={this.fetch}>
          查询
        </button>
        <table>
          <tbody>
            {(this.props.userList || []).map((user, index) => (
              <tr key={index}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td onClick={() => this.edit(user)}>编辑</td>
                <td onClick={() => this.dele(user)}>删除</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}



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

function reducerUserList(state: Array<UserData> = [], type: string) {
  switch (type) {
    case "fetch":
      let userList = new Array<UserData>();
      userList.push({ id: "1", name: "1" });
      userList.push({ id: "1", name: "1" });
      userList.push({ id: "1", name: "1" });
      userList.push({ id: "1", name: "1" });
      userList.push({ id: "1", name: "1" });
      return userList;
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

const stateToProps = (state: MainState) => {
  return {
    userList: reducerUserList(state.userList, "fetch")
  }
}

const dispatchToProps = (dispath: Dispatch) => {
  return {
    fetch: () => {
      dispath({
        type: "fetch"
      });
    }
  };
};


export let UserListC = connect(stateToProps, dispatchToProps)(UserList);