export type IToastState = {
  toast: IToast[];
};

export type IToast = {
  id: string;
  type: keyof typeof EToastIcon;
  message: string;
};

export type IToastGetters = {
  [EToast.GET_ALL_TOAST](state: IToastState): IToast[];
};

export type IToastMutations<S = IToastState> = {
  [EToast.PUSH_TOAST](state: S, payload: Omit<IToast, "id">): void;
};

export enum EToast {
  GET_ALL_TOAST = "GET_ALL_TOAST",
  PUSH_TOAST = "PUSH_TOAST",
}

export enum EToastIcon {
  info = "thumbs-up",
  warning = "warning",
  danger = "times-octagon",
  success = "thumbs-up",
}
