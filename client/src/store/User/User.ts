import api from "@/api/axios";
import { RootState } from "@/store/types.js";
import { ActionTree, GetterTree, MutationTree, Module } from "vuex";
import {
  UserGetters,
  User,
  UserState,
  EUser,
  UserMutations,
  UserActions,
  UserLogin,
  UserRegister,
} from "@/store/User/types";

const state: UserState = {
  user: {} as User,
};

const getters: GetterTree<UserState, RootState> & UserGetters = {
  [EUser.GET_USER](state): User {
    return state.user;
  },
};

const mutations: MutationTree<UserState> & UserMutations = {
  [EUser.SET_USER](state, payload) {
    state.user = payload;
  },
};

const actions: ActionTree<UserState, RootState> & UserActions = {
  async [EUser.CURRENT]({ commit }) {
    await api
      .get<null, { data: User }>("/auth/current")
      .then(({ data }) => {
        commit(EUser.SET_USER, data);
        return data;
      })
      .catch(({ response }) => {
        console.log(response.data);
        return undefined;
      });
  },

  async [EUser.REGISTER]({ commit }, payload) {
    await api
      .post<UserRegister, { data: User }>("/auth/register", payload)
      .then(({ data }) => {
        commit(EUser.SET_USER, data);
        return data;
      })
      .catch(({ response }) => {
        console.log(response.data);
      });
  },

  async [EUser.LOGIN]({ commit }, payload) {
    console.log(payload);
    await api
      .post<UserLogin, { data: User }>("/auth/login", payload)
      .then(({ data }) => {
        commit(EUser.SET_USER, data);
      })
      .catch(({ response }) => {
        console.log(response.data);
      });
  },
};

export const user: Module<UserState, RootState> = {
  state,
  getters,
  mutations,
  actions,
};
