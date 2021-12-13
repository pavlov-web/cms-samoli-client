import { fileService } from "@/services/api/FileService";
import { RootState } from "@/store/types";

import {
  FileResponseData,
  EFileGetters,
  EFileCommits,
  EFileActions,
} from "@/types/FileTypes";
import { ActionTree, GetterTree, MutationTree, Module } from "vuex";
import {
  FileGetters,
  FileState,
  FileMutations,
  FileActions,
} from "@/store/File/types";

const state: FileState = {
  file: [],
};

const getters: GetterTree<FileState, RootState> & FileGetters = {
  [EFileGetters.GET_FILE](state): FileResponseData[] {
    return state.file;
  },
};

const mutations: MutationTree<FileState> & FileMutations = {
  [EFileCommits.SET_FILE](state, payload) {
    state.file = payload;
  },
};

const actions: ActionTree<FileState, RootState> & FileActions = {
  async [EFileActions.UPLOAD]({ commit }, payload) {
    try {
      // const { data } = await fileService.upload(payload.file, payload.handler);
      // commit(EFileCommits.SET_FILE, [data]);
    } catch (error) {
      console.log(error);
    }
  },
};

export const file: Module<FileState, RootState> = {
  state,
  getters,
  mutations,
  actions,
};
