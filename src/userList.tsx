import * as React from "react";

export interface UserData {
  id: string;
  name: string;
}

export interface Props {
  userList: Array<UserData>;
}

export class UserList extends React.Component<Props, any> {
  constructor(props: Props, context: any) {
    super(props, context);
  }

  edit = (user: UserData) => {

  }
  dele = (user: UserData) => {

  }

  render() {
    return (
      <table>
        <tbody>
          {this.props.userList.map((user, index) => (
            <tr key={index}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td onClick={() => this.edit(user)}>编辑</td>
              <td onClick={() => this.dele(user)}>删除</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
