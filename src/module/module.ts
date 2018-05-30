export class UserModule {
  id: string;
  name: string;
}

export class TopModule {
  waitShow: boolean;
}

export class UserManageModule {
  userList: Array<UserModule>;
  currEditUser: UserModule | null;
}

export class StoreModule {
  userManage: UserManageModule;
  top: TopModule;
}