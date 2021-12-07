import { getUniqueId } from "@/helpers";
import {
  IToastGetters,
  IToast,
  IToastState,
  EToast,
  IToastMutations,
} from "@/store/Toast/types";
import { RootState } from "@/store/types";
import { GetterTree, Module, MutationTree } from "vuex";

const state: IToastState = {
  toast: [],
};

const getters: GetterTree<IToastState, RootState> & IToastGetters = {
  [EToast.GET_ALL_TOAST](state): IToast[] {
    return state.toast;
  },
};

const mutations: MutationTree<IToastState> & IToastMutations = {
  [EToast.PUSH_TOAST](state, payload) {
    state.toast.push({ ...payload, id: getUniqueId() });
    setTimeout(() => {
      state.toast.shift();
    }, 3000);
  },
};

export const toast: Module<IToastState, RootState> = {
  state,
  getters,
  mutations,
};
