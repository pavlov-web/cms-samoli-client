import { userService } from "@/services/api/UserService";
import { ErrorService } from "@/services/ErrorService";
import { RootState } from "@/store/types.js";
import {
  EUserActions,
  EUserCommits,
  EUserGetters,
  User,
} from "@/types/UserTypes";
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
  [EUserGetters.GET_USER](state): User {
    return state.user;
  },
};

const mutations: MutationTree<UserState> & UserMutations = {
  [EUserCommits.SET_USER](state, payload) {
    state.user = payload;
  },
};

const actions: ActionTree<UserState, RootState> & UserActions = {
  async [EUserActions.LOGIN]({ commit }, payload) {
    try {
      const { data } = await userService.login(payload);
      commit(EUserCommits.SET_USER, data);
    } catch (error) {
      ErrorService(error);
    }
  },

  async [EUserActions.REGISTER]({ commit }, payload) {
    try {
      const { data } = await userService.register(payload);
      commit(EUserCommits.SET_USER, data);
    } catch (error) {
      ErrorService(error);
    }
  },

  async [EUserActions.CURRENT]({ commit }) {
    try {
      const { data } = await userService.current();
      commit(EUserCommits.SET_USER, data);
    } catch (error) {
      console.log(error);
    }
  },

  async [EUserActions.LOGOUT]({ commit }) {
    try {
      await userService.logout();
      commit(EUserCommits.SET_USER, {} as User);
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
