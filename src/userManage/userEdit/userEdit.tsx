import * as React from "react";
import {
  UserModule,
  StoreModule,
  UserEditManageModule
} from "../../module/module";
import { Dispatch } from "redux";
import { Modal, Button } from "antd";
let styles = require("./userEdit.less");

export interface Props {
  userEditManage: UserEditManageModule;
  userNameChanged: (value: string) => {};
  save: (userEditManage: UserEditManageModule) => {};
  cancel: () => {};
}

export class UserEditComponent extends React.Component<Props, any> {
  constructor(props: Props, context: any) {
    super(props, context);
  }

  onUserNameChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.userNameChanged(e.target.value);
  };
  onSave = () => {
    this.props.save(this.props.userEditManage);
  };
  onCancel = () => {
    this.props.cancel();
  };

  render() {
    let { isEditing, user, isWaiting } = this.props.userEditManage;
    user = user || { id: "", name: "" };

    return (
      <Modal
        visible={isEditing}
        title={"用户信息编辑"}
        onCancel={this.onCancel}
        footer={[
          <Button key="close" onClick={this.onCancel}>
            关闭
          </Button>,
          <Button key="save" onClick={this.onSave} loading={isWaiting}>
            保存
          </Button>
        ]}
      >
        <div className={styles.userEdit}>
          <table>
            <tbody>
              <tr>
                <td>编号:</td>
                <td>
                  <input type="text" value={user.id} readOnly />
                </td>
              </tr>
              <tr>
                <td>姓名:</td>
                <td>
                  <input
                    type="text"
                    value={user.name}
                    onChange={this.onUserNameChanged}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Modal>
    );
  }
}
