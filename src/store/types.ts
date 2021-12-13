import { FileState, FileStoreTypes } from "@/store/File/types";
import { ToastState, ToastStoreTypes } from "@/store/Toast/types";
import { UserState, UserStoreTypes } from "@/store/User/types";

export interface RootState {
  user: UserState;
  toast: ToastState;
  file: FileState;
}

type StoreModules = {
  user: UserStoreTypes;
  toast: ToastStoreTypes;
  file: FileStoreTypes;
};

export type Store = UserStoreTypes<Pick<StoreModules, "user">> &
  ToastStoreTypes<Pick<StoreModules, "toast">> &
  FileStoreTypes<Pick<FileState, "file">>;
