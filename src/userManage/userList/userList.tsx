import * as React from "react";
import { UserData } from "./userListCtrl";
let styles = require("./userList.less");

export interface Props {
  userList: Array<UserData>;
  delete: (userData: UserData) => {};
  edit: (userData: UserData) => {};
  fetch: () => {};
}

export class UserList extends React.Component<Props, any> {
  constructor(props: Props, context: any) {
    super(props, context);
  }

  edit = (user: UserData) => {
    this.props.edit(user);
  };
  delete = (user: UserData) => {
    this.props.delete(user);
  };

  componentDidMount() {
    this.props.fetch();
  }

  render() {
    return (
      <div className={styles.userList}>
        <table>
          <tbody>
            {(this.props.userList || []).map((user, index) => (
              <tr key={index}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td className={styles.option} onClick={() => this.edit(user)}>
                  编辑
                </td>
                <td className={styles.option} onClick={() => this.delete(user)}>
                  删除
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
