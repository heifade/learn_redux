export class UserModule {
  id: string;
  name: string;
}

export let store : {
  userManage: {
    userListManage: {
      userList: Array<UserModule>,
      isFetching: boolean,
    },
    currEditUser: UserModule | null,
  }
}


