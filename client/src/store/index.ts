import { user } from "@/store/User/User";
import { RootState, Store } from "@/store/types";
import { createStore, ModuleTree, Module, useStore as VuexStore } from "vuex";

const modules: ModuleTree<RootState> = {
  user,
};

const root: Module<RootState, RootState> = {
  modules,
};

export const store = createStore<RootState>(root);
export const useStore = (): Store => VuexStore() as Store;
