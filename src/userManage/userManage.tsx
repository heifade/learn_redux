import * as React from "react";

import UserList from "./userList/userListCtrl";
import UserEdit from "./userEdit/userEditCtrl";

export interface Props {}

export class UserManageComponent extends React.Component<Props, any> {
  render() {
    return (
      <div>
        <UserList />
        <UserEdit />
      </div>
    );
  }
}
