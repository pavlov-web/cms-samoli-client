import { userService } from "@/services/api/UserService";
import { ErrorService } from "@/services/ErrorService";
import { RootState } from "@/store/types.js";
import { EUserActions, User } from "@/types/UserTypes";
import { ActionTree, GetterTree, MutationTree, Module } from "vuex";
import {
  UserGetters,
  UserState,
  UserMutations,
  UserActions,
} from "@/store/User/types";

const state: UserState = {
  user: {} as User,
};

const getters: GetterTree<UserState, RootState> & UserGetters = {
  [EUserActions.GET_USER](state): User {
    return state.user;
  },
};

const mutations: MutationTree<UserState> & UserMutations = {
  [EUserActions.SET_USER](state, payload) {
    state.user = payload;
  },
};

const actions: ActionTree<UserState, RootState> & UserActions = {
  async [EUserActions.LOGIN]({ commit }, payload) {
    try {
      const { data } = await userService.login(payload);
      commit(EUserActions.SET_USER, data);
    } catch (error) {
      ErrorService(error);
    }
  },

  async [EUserActions.REGISTER]({ commit }, payload) {
    try {
      const { data } = await userService.register(payload);
      commit(EUserActions.SET_USER, data);
    } catch (error) {
      ErrorService(error);
    }
  },

  async [EUserActions.CURRENT]({ commit }) {
    try {
      const { data } = await userService.current();
      commit(EUserActions.SET_USER, data);
    } catch (error) {
      console.log(error);
    }
  },
};

export const user: Module<UserState, RootState> = {
  state,
  getters,
  mutations,
  actions,
};
