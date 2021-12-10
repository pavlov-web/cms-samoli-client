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

export type UserResponse = { data: User };

export enum EUserActions {
  GET_USER = "GET_USER",
  SET_USER = "SET_USER",
  REGISTER = "REGISTER",
  LOGIN = "LOGIN",
  CURRENT = "CURRENT",
}
