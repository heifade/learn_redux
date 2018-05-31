import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Menu, Icon, Layout, Breadcrumb } from "antd";
import { Route, HashRouter, Link } from "react-router-dom";
import { store } from "./store";

import UserList from "./userManage/userList/userListCtrl";
import UserEdit from "./userManage/userEdit/userEditCtrl";
import "antd/dist/antd.css";

let { Sider, Content } = Layout;

let div = document.createElement("div");
document.body.appendChild(div);

let App = () => {
  return (
    <div>
      <UserList />
      <UserEdit />
    </div>
  );
};

let MenuComponent = (props: any) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider>
        <Menu
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          theme="dark"
          // inlineCollapsed={this.state.collapsed}
          onClick={props.onMenuClick}
        >
          <Menu.Item key="/index">
            <Icon type="pie-chart" />
            <span>主页</span>
          </Menu.Item>
          <Menu.Item key="/user" >
            <Icon type="pie-chart" />
            <span>用户管理</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Content>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
        </Content>
        <div>{props.children}</div>
      </Layout>
    </Layout>
  );
};

function menuClick(url: string) {
  let u = `http://localhost:9000/#/` + url;
  console.log(u);
  document.location.href = u
}

ReactDOM.render(
  <Provider store={store}>
    <div>
      <HashRouter>
        <MenuComponent onMenuClick={menuClick}>
          <div>
            <Route path="/index" component={App} />
            <Route path="/user" component={App} />
          </div>
        </MenuComponent>
      </HashRouter>
    </div>
  </Provider>,

  div
);
