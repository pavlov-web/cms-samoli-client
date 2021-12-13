import api from "@/services/axios";
import { UserLogin, UserRegister, UserResponse } from "@/types/UserTypes";

export const userService = {
  login: (data: UserLogin): Promise<UserResponse> => {
    return api.post<UserLogin, UserResponse>("/auth/login", data);
  },
  logout: (): Promise<void> => {
    return api.post("/auth/logout");
  },
  register: (data: UserRegister): Promise<UserResponse> => {
    return api.post<UserRegister, UserResponse>("/auth/register", data);
  },
  current: (): Promise<UserResponse> => {
    return api.get<null, UserResponse>("/auth/current");
  },
};
