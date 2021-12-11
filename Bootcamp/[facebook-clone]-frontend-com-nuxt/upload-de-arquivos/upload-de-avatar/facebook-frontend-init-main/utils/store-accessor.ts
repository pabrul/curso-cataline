import { Store } from "vuex";
import { getModule } from "vuex-module-decorators";

import Mobile from "@/store/mobile";
import UserRegister from "@/store/users/register";
import Auth from "@/store/auth";
import User from "@/store/users";
import UserAvatar from "@/store/users/avatar";

// eslint-disable-next-line import/no-mutable-exports
let mobile: Mobile;
// eslint-disable-next-line import/no-mutable-exports
let userRegister: UserRegister;
// eslint-disable-next-line import/no-mutable-exports
let auth: Auth;
// eslint-disable-next-line import/no-mutable-exports
let user: User;
// eslint-disable-next-line import/no-mutable-exports
let userAvatar: UserAvatar;

const initializeStores = (store: Store<any>): void => {
  mobile = getModule(Mobile, store);
  userRegister = getModule(UserRegister, store);
  auth = getModule(Auth, store);
  user = getModule(User, store);
  userAvatar = getModule(UserAvatar, store);
};

export { initializeStores, mobile, userRegister, auth, user, userAvatar };
