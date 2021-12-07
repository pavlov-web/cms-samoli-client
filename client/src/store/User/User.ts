import api from "@/api/axios";
import { RootState } from "@/store/types.js";
import { ActionTree, GetterTree, MutationTree, Module } from "vuex";
import {
  IUserGetters,
  IUser,
  IUserState,
  EUser,
  IUserMutations,
  IUserActions,
  IUserLogin,
  IUserRegister,
} from "@/store/User/types";

const state: IUserState = {
  user: {} as IUser,
};

const getters: GetterTree<IUserState, RootState> & IUserGetters = {
  [EUser.GET_USER](state): IUser {
    return state.user;
  },
};

const mutations: MutationTree<IUserState> & IUserMutations = {
  [EUser.SET_USER](state, payload) {
    state.user = payload;
  },
};

const actions: ActionTree<IUserState, RootState> & IUserActions = {
  async [EUser.REGISTER]({ commit }, payload) {
    await api
      .post<IUserRegister, { data: IUser }>("/auth/register", payload)
      .then(({ data }) => {
        commit(EUser.SET_USER, data);
      })
      .catch(({ response }) => {
        console.log(response.data);
      });
  },

  async [EUser.LOGIN]({ commit }, payload) {
    await api
      .post<IUserLogin, { data: IUser }>("/auth/login", payload)
      .then(({ data }) => {
        commit(EUser.SET_USER, data);
      })
      .catch(({ response }) => {
        console.log(response.data);
      });
  },
};

export const user: Module<IUserState, RootState> = {
  state,
  getters,
  mutations,
  actions,
};
