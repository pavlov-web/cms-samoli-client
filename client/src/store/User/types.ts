import { RootState } from "@/store/types";
import {
  ActionContext,
  CommitOptions,
  DispatchOptions,
  Store as VuexStore,
} from "vuex";

export type UserState = {
  user: User;
};
export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  position: string;
  role: string;
  token: string;
  createAt: Date;
  updateAt: Date;
};

export type UserLogin = {
  email: string;
  password: string;
};

export type UserRegister = {
  firstName: string;
  lastName: string;
  role: string;
  position: string;
} & UserLogin;

export type UserGetters = {
  [EUser.GET_USER](state: UserState): User;
};

export type UserMutations<S = UserState> = {
  [EUser.SET_USER](state: S, payload: User): void;
};

export type UserActions = {
  [EUser.REGISTER]({ commit }: Context, payload: UserRegister): void;
  [EUser.LOGIN]({ commit }: Context, payload: UserLogin): void;
  [EUser.CURRENT]({ commit }: Context): void;
};

export enum EUser {
  GET_USER = "GET_USER",
  SET_USER = "SET_USER",
  REGISTER = "REGISTER",
  LOGIN = "LOGIN",
  CURRENT = "CURRENT",
}

export type Context = {
  commit<K extends keyof UserMutations>(
    key: K,
    payload: Parameters<UserMutations[K]>[1]
  ): ReturnType<UserMutations[K]>;
} & Omit<ActionContext<UserState, RootState>, "commit">;

export type UserStoreTypes<S = UserState> = Omit<
  VuexStore<S>,
  "commit" | "getters" | "dispatch"
> & {
  getters: {
    [K in keyof UserGetters]: ReturnType<UserGetters[K]>;
  };
} & {
  commit<
    K extends keyof UserMutations,
    P extends Parameters<UserMutations[K]>[1]
  >(
    key: K,
    payload?: P,
    options?: CommitOptions
  ): ReturnType<UserMutations[K]>;
} & {
  dispatch<K extends keyof UserActions>(
    key: K,
    payload?: Parameters<UserActions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<UserActions[K]>;
};
