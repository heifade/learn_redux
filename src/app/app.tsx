import * as React from "react";
import { Provider } from "react-redux";
import { Layout } from "antd";
import { Route, Router, Switch, BrowserRouter, HashRouter } from "react-router-dom";
import { store } from "../store";
import "antd/dist/antd.css";
import * as classname from "classnames";
import { MenuProps, MenuComponent } from "./menu";
import { BreadcrumbComponent } from "./breadcrumb";
import createHistory from "history/createHashHistory";
import { MenuModule } from "./modules";
import { menuList, routeList } from "./route";
const history = createHistory();
const styles = require("./app.less");

let { Sider, Content, Header } = Layout;

function getLocation() {
  return location.hash.replace(/^#/, "") || "/index";
}

let MainComponent = (props: MenuProps) => {
  let path = getLocation();

  return (
    <Layout className={styles.app}>
      <Header className={classname("header", styles.header)}>
        <div className="logo" />
      </Header>
      <Layout className={styles.body}>
        <Sider className={styles["menu-side"]}>
          <MenuComponent {...props} path={path} />
        </Sider>
        <Layout className={styles["content-side"]}>
          <BreadcrumbComponent {...props} path={path} />

          <Content>
            <Switch>{routeList.map((m, i) => <Route key={i} path={m.path} component={m.component} />)}</Switch>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export class Props {}
export class AppComponent extends React.Component<Props, any> {
  constructor(props: Props, context: any) {
    super(props, context);

    this.state = {
      path: getLocation(),
      menuList
    };
  }

  onMenuClick = (value: any) => {
    this.setState({
      path: value.key
    });
  };

  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <MainComponent menuList={this.state.menuList} path={this.state.path} onMenuClick={this.onMenuClick} />
        </Router>
      </Provider>
    );
  }
}
