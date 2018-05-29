import * as React from "react";
import { UserModule } from "../../module/module";
let styles = require("./userEdit.less");

export interface Props {
  currEditUser: UserModule | null;

  onUserNameChanged: (name: string) => {};
  onSave: (userData: UserModule) => {};
  onCancel: () => {};
}

export class UserEditComponent extends React.Component<Props, any> {
  constructor(props: Props, context: any) {
    super(props, context);
  }

  onUserNameChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onUserNameChanged(e.target.value);
  };
  onSave = () => {
    this.props.onSave(this.props.currEditUser!);
  };
  onCancel = () => {
    this.props.onCancel();
  };

  render() {
    if (this.props.currEditUser) {
      return (
        <div>
          <div className={styles.back} />
          <div className={styles.userEdit}>
            <table>
              <tbody>
                <tr>
                  <td>编号:</td>
                  <td>
                    <input
                      type="text"
                      value={this.props.currEditUser.id}
                      readOnly
                    />
                  </td>
                </tr>
                <tr>
                  <td>姓名:</td>
                  <td>
                    <input
                      type="text"
                      value={this.props.currEditUser.name}
                      onChange={this.onUserNameChanged}
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <button type="button" onClick={this.onSave}>
                      保存
                    </button>
                    <button type="button" onClick={this.onCancel}>
                      取消
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      );
    } else {
      return "";
    }
  }
}
