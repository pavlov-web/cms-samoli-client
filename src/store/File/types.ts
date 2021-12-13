import { RootState } from "@/store/types";

import {
  EFileActions,
  EFileCommits,
  EFileGetters,
  FileResponseData,
  FilePreview,
  FileUploadHandler,
} from "@/types/FileTypes";

import {
  ActionContext,
  CommitOptions,
  DispatchOptions,
  Store as VuexStore,
} from "vuex";

export type FileState = {
  file: FileResponseData[];
};

export type FileGetters = {
  [EFileGetters.GET_FILE](state: FileState): FileResponseData[];
};

export type FileMutations<S = FileState> = {
  [EFileCommits.SET_FILE](state: S, payload: FileResponseData[]): void;
};

export type FileActions = {
  [EFileActions.UPLOAD](
    { commit }: Context,
    payload: {
      file: File;
      handler: FileUploadHandler;
    }
  ): void;
};

export type Context = {
  commit<K extends keyof FileMutations>(
    key: K,
    payload: Parameters<FileMutations[K]>[1]
  ): ReturnType<FileMutations[K]>;
} & Omit<ActionContext<FileState, RootState>, "commit">;

export type FileStoreTypes<S = FileState> = Omit<
  VuexStore<S>,
  "commit" | "getters" | "dispatch"
> & {
  getters: {
    [K in keyof FileGetters]: ReturnType<FileGetters[K]>;
  };
} & {
  commit<
    K extends keyof FileMutations,
    P extends Parameters<FileMutations[K]>[1]
  >(
    key: K,
    payload?: P,
    options?: CommitOptions
  ): ReturnType<FileMutations[K]>;
} & {
  dispatch<K extends keyof FileActions>(
    key: K,
    payload?: Parameters<FileActions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<FileActions[K]>;
};
