import * as React from "react";
import { UserModule, UserListManageModule } from "../../module/module";
import { Spin, Table, Divider } from "antd";
let styles = require("./userList.less");

export interface Props {
  userListManage: UserListManageModule;
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
    const dataSource = this.props.userListManage.userList.map((data, index) => ({...data, key: index}));
    const columns = [
      {
        title: "编号",
        dataIndex: "id",
        key: "id"
      },
      {
        title: "姓名",
        dataIndex: "name",
        key: "name"
      }, {
        title: '操作',
        key: 'action',
        width: 120,
        render: (text: any, record: any) => (
          <span>
            <a href="javascript:;" onClick={() => this.edit(record)}>编辑</a><Divider type="vertical" />
            <a href="javascript:;" onClick={() => this.delete(record)}>删除</a>
          </span>
        )
      }
    ];

    return (
      <div className={styles.userList}>
        <Spin spinning={this.props.userListManage.isWaiting}>
          <Table dataSource={dataSource} columns={columns} />
        </Spin>
      </div>
    );
  }
}
