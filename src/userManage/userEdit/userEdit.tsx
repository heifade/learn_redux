import * as React from "react";
import { UserModule, StoreModule } from "../../module/module";
import { Dispatch } from "redux";
let styles = require("./userEdit.less");

export interface Props {
  currEditUser: UserModule | null;
  dispatch: Dispatch;
  state: StoreModule;
}

export class UserEditComponent extends React.Component<Props, any> {
  constructor(props: Props, context: any) {
    super(props, context);
  }

  onUserNameChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.dispatch({
      type: "user_edit_username_changed",
      value: e.target.value
    });
  };
  onSave = () => {
    this.props.dispatch({
      type: "user_edit_save",
      userData: this.props.currEditUser!
    });
  };
  onCancel = () => {
    this.props.dispatch({
      type: "user_edit_cancel"
    });
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
