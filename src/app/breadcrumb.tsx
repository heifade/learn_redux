import * as React from "react";
import { Breadcrumb } from "antd";
import { MenuModule, MenuProps } from "./menu";
import { Link } from "react-router-dom";
const styles = require("./app.less");

export function BreadcrumbComponent(props: MenuProps) {
  function initBreadcrumb() {
    let breadcrumbList = new Array<MenuModule>();
    let path = props.path;
    while (path) {
      let bpath = props.menuList.filter((m: MenuModule) => m.path == path);
      if (bpath.length) {
        breadcrumbList.unshift(bpath[0]);
      }
      path = path.substr(0, path.lastIndexOf("/"));
    }
    return breadcrumbList;
  }

  return (
    <Breadcrumb className={styles["breadcrumb"]}>
      {initBreadcrumb().map((m, i, list) => {
        if (i < list.length - 1) {
          return (
            <Breadcrumb.Item key={m.path}>
              <Link to={m.path}>{m.title}</Link>
            </Breadcrumb.Item>
          );
        } else {
          return <Breadcrumb.Item key={m.path}>{m.title}</Breadcrumb.Item>;
        }
      })}
    </Breadcrumb>
  );
}
