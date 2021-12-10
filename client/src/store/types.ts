import { ToastState, ToastStoreTypes } from "@/store/Toast/types";
import { UserState, UserStoreTypes } from "@/store/User/types";

export interface RootState {
  user: UserState;
  toast: ToastState;
}

type StoreModules = {
  user: UserStoreTypes;
  toast: ToastStoreTypes;
};

export type Store = UserStoreTypes<Pick<StoreModules, "user">> &
  ToastStoreTypes<Pick<StoreModules, "toast">>;
