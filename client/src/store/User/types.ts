import { RootState } from "@/store/types";
import { ActionContext } from "vuex";

export type IUserState = {
  user: IUser;
};
export type IUser = {
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

export type IUserLogin = {
  email: string;
  password: string;
};

export type IUserRegister = {
  firstName: string;
  lastName: string;
  role: string;
  position: string;
} & IUserLogin;

export interface IUserGetters {
  [EUser.GET_USER](state: IUserState): IUser;
}

export interface IUserMutations<S = IUserState> {
  [EUser.SET_USER](state: S, payload: IUser): void;
}

export interface IUserActions {
  [EUser.REGISTER]({ commit }: Context, payload: IUserRegister): void;
  [EUser.LOGIN]({ commit }: Context, payload: IUserLogin): void;
}

export enum EUser {
  GET_USER = "GET_USER",
  SET_USER = "SET_USER",
  REGISTER = "REGISTER",
  LOGIN = "LOGIN",
}

export type Context = {
  commit<K extends keyof IUserMutations>(
    key: K,
    payload: Parameters<IUserMutations[K]>[1]
  ): ReturnType<IUserMutations[K]>;
} & Omit<ActionContext<IUserState, RootState>, "commit">;
