import { UserState, UserStoreTypes } from "@/store/User/types";

export interface RootState {
  user: UserState;
}

type StoreModules = {
  user: UserStoreTypes;
};

export type Store = UserStoreTypes<Pick<StoreModules, "user">>;
