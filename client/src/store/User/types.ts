import { RootState } from "@/store/types";
import { EUserActions, User, UserLogin, UserRegister } from "@/types/UserTypes";
import {
  ActionContext,
  CommitOptions,
  DispatchOptions,
  Store as VuexStore,
} from "vuex";

export type UserState = {
  user: User;
};

export type UserGetters = {
  [EUserActions.GET_USER](state: UserState): User;
};

export type UserMutations<S = UserState> = {
  [EUserActions.SET_USER](state: S, payload: User): void;
};

export type UserActions = {
  [EUserActions.LOGIN]({ commit }: Context, payload: UserLogin): void;
  [EUserActions.REGISTER]({ commit }: Context, payload: UserRegister): void;
  [EUserActions.CURRENT]({ commit }: Context): void;
};

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
