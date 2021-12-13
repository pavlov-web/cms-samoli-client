import { getUniqueId } from "@/helpers";
import {
  ToastGetters,
  Toast,
  ToastState,
  EToast,
  ToastMutations,
  ToastActions,
} from "@/store/Toast/types";
import { RootState } from "@/store/types";
import { ActionTree, GetterTree, Module, MutationTree } from "vuex";

const state: ToastState = {
  toast: [],
};

const getters: GetterTree<ToastState, RootState> & ToastGetters = {
  [EToast.GET_ALL_TOAST](state): Toast[] {
    return state.toast;
  },
};

const mutations: MutationTree<ToastState> & ToastMutations = {
  [EToast.PUSH_TOAST](state, payload) {
    state.toast.push({ ...payload, id: getUniqueId("toast") });
    setTimeout(() => {
      state.toast.shift();
    }, 3000);
  },
};

const actions: ActionTree<ToastState, RootState> & ToastActions = {
  [EToast.PUSH_ERROR]({ commit }, payload: string) {
    commit(EToast.PUSH_TOAST, {
      type: "danger",
      message: payload,
    });
  },
  [EToast.PUSH_WARNING]({ commit }, payload: string) {
    commit(EToast.PUSH_TOAST, {
      type: "warning",
      message: payload,
    });
  },
  [EToast.PUSH_INFO]({ commit }, payload: string) {
    commit(EToast.PUSH_TOAST, {
      type: "info",
      message: payload,
    });
  },
  [EToast.PUSH_SUCCESS]({ commit }, payload: string) {
    commit(EToast.PUSH_TOAST, {
      type: "success",
      message: payload,
    });
  },
};

export const toast: Module<ToastState, RootState> = {
  state,
  getters,
  mutations,
  actions,
};
