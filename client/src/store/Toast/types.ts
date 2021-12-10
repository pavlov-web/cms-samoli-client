import { RootState } from "@/store/types";
import {
  ActionContext,
  CommitOptions,
  DispatchOptions,
  Store as VuexStore,
} from "vuex";

export type ToastState = {
  toast: Toast[];
};

export type Toast = {
  id: string;
  type: keyof typeof EToastIcon;
  message: string;
};

export type ToastGetters = {
  [EToast.GET_ALL_TOAST](state: ToastState): Toast[];
};

export type ToastMutations<S = ToastState> = {
  [EToast.PUSH_TOAST](state: S, payload: Omit<Toast, "id">): void;
};

export type ToastActions = {
  [EToast.PUSH_ERROR]({ commit }: Context, payload: string): void;
  [EToast.PUSH_WARNING]({ commit }: Context, payload: string): void;
  [EToast.PUSH_INFO]({ commit }: Context, payload: string): void;
  [EToast.PUSH_SUCCESS]({ commit }: Context, payload: string): void;
};

export enum EToast {
  GET_ALL_TOAST = "GET_ALL_TOAST",
  PUSH_TOAST = "PUSH_TOAST",
  PUSH_ERROR = "PUSH_ERROR",
  PUSH_WARNING = "PUSH_WARNING",
  PUSH_INFO = "PUSH_INFO",
  PUSH_SUCCESS = "PUSH_SUCCESS",
}

export enum EToastIcon {
  info = "thumbs-up",
  warning = "warning",
  danger = "times-octagon",
  success = "thumbs-up",
}

export type Context = {
  commit<K extends keyof ToastMutations>(
    key: K,
    payload: Parameters<ToastMutations[K]>[1]
  ): ReturnType<ToastMutations[K]>;
} & Omit<ActionContext<ToastState, RootState>, "commit">;

export type ToastStoreTypes<S = ToastState> = Omit<
  VuexStore<S>,
  "commit" | "getters" | "dispatch"
> & {
  getters: {
    [K in keyof ToastGetters]: ReturnType<ToastGetters[K]>;
  };
} & {
  commit<
    K extends keyof ToastMutations,
    P extends Parameters<ToastMutations[K]>[1]
  >(
    key: K,
    payload?: P,
    options?: CommitOptions
  ): ReturnType<ToastMutations[K]>;
} & {
  dispatch<K extends keyof ToastActions>(
    key: K,
    payload?: Parameters<ToastActions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<ToastActions[K]>;
};
