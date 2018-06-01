import React = require("react");
import { Menu, Icon } from "antd";
import { NavLink } from "react-router-dom";

export interface MenuModule {
  title: string;
  path: string;
  img: string;
}

export interface MenuProps {
  menuList: Array<MenuModule>;
  path: string;
  onMenuClick: (value: any) => void;
}

export function MenuComponent(props: MenuProps) {

  function createMenu(menu?: MenuModule) {
    let parentPath = menu ? menu.path : "";
    let childMenuList = props.menuList.filter(m => {
      let reg = new RegExp(`^${parentPath}/(.*)`);
      let results = reg.exec(m.path);
      return results && results[1].indexOf("/") < 0;
    });

    return childMenuList.map(m => {
      let childMenu: any = createMenu(m);
      if (childMenu && childMenu.length) {
        return (
          <Menu.SubMenu
            key={m.path}
            title={
              <span>
                <Icon type={m.img} />
                <span>{m.title}</span>
              </span>
            }
          >
            {childMenu}
          </Menu.SubMenu>
        );
      }

      return (
        <Menu.Item key={m.path}>
          <NavLink to={m.path!}>
            <Icon type={m.img} />
            {m.title}
          </NavLink>
        </Menu.Item>
      );
    });
  }

  function defaultOpenKeys() {
    let list = [];
    let path = props.path;
    while (path) {
      path = path.substr(0, path.lastIndexOf("/"));
      if (path) {
        list.push(path);
      }
    }
    return list;
  }

  return (
    <Menu
      defaultSelectedKeys={[props.path]}
      defaultOpenKeys={defaultOpenKeys()}
      selectedKeys={[props.path]}
      mode="inline"
      theme="dark"
      // inlineCollapsed={this.state.collapsed}
      onClick={props.onMenuClick}
    >
      {createMenu()}
    </Menu>
  );
}
