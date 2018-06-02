export interface UserModule {
  id: string;
  name: string;
}

export interface UserListManageModule {
  readonly userList: Array<UserModule>;
  readonly isWaiting: boolean;
}

export interface UserEditManageModule {
  readonly user: UserModule | null,
  readonly isEditing: boolean,
  readonly isWaiting: boolean,
}

export interface UserManageModule {
  readonly userListManage: UserListManageModule;
  readonly userEditManage: UserEditManageModule;
}

export interface StoreModule {
  readonly userManage: UserManageModule;
}
