import * as toastTypes from "@/store/Toast/types";
import * as userTypes from "@/store/User/types";
import { CommitOptions, DispatchOptions, Store as VuexStore } from "vuex";

export interface RootState {
  toast: toastTypes.IToastState;
  user: userTypes.IUserState;
}

export interface Getters
  extends toastTypes.IToastGetters,
    userTypes.IUserGetters {}

export interface Mutations
  extends userTypes.IUserMutations,
    toastTypes.IToastMutations {}

export type Actions = userTypes.IUserActions;

export type Store = Omit<
  VuexStore<RootState>,
  "commit" | "getters" | "dispatch"
> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>;
} & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>;
  };
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>;
};
