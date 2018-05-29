export class UserModule {
  id: string;
  name: string;
}

export class TopModule {
  waitShow: boolean = false;
}

export class UserManageModule {
  userList: Array<UserModule> = [];
  currEditUser: UserModule | null = null;
}

export class StoreModule {
  userManage = new UserManageModule();
  top = new TopModule();
}