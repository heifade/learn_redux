export interface UserModule {
  id: string;
  name: string;
}

export interface UserListManageModule {
  userList: Array<UserModule>;
  isWaiting: boolean;
}

export interface UserEditManageModule {
  user: UserModule | null,
  isEditing: boolean,
  isWaiting: boolean,
}

export interface UserManageModule {
  userListManage: UserListManageModule;
  userEditManage: UserEditManageModule;
}

export interface StoreModule {
  userManage: UserManageModule;
}
