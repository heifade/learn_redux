import * as React from "react";
import { UserModule } from "../../module/module";
import { Spin } from "antd";
let styles = require("./userList.less");

export interface Props {
  userList: Array<UserModule>;
  delete: (userData: UserModule) => {};
  edit: (userData: UserModule) => {};
  fetch: () => {};
}

export class UserListComponent extends React.Component<Props, any> {
  constructor(props: Props, context: any) {
    super(props, context);
  }

  edit = (user: UserModule) => {
    this.props.edit(user);
  };
  delete = (user: UserModule) => {
    this.props.delete(user);
  };

  componentDidMount() {
    this.props.fetch();
  }

  render() {
    return (
      <div className={styles.userList}>
        <Spin />
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
