import { MenuModule } from "./modules";
import { Index } from "../index/index";
import { UserManage } from "../userManage/userManage";

export let menuList: Array<MenuModule> = [
  { title: "主页", path: "/index", img: "home" },
  { title: "系统设置", path: "/system", img: "setting" },
  { title: "用户管理", path: "/system/user", img: "user" },
  { title: "角色管理", path: "/system/role", img: "solution" }
];

export let routeList: Array<{ path: string; component: any }> = [
  { path: "/index", component: Index }, 
  { path: "/system/user", component: UserManage }
];
