import { toast } from "@/store/Toast/Toast";
import { user } from "@/store/User/User";
import { RootState, Store } from "@/store/types";
import { createStore, ModuleTree, Module } from "vuex";

const modules: ModuleTree<RootState> = {
  user,
  toast,
};

const root: Module<RootState, RootState> = {
  modules,
};

export const store = createStore<RootState>(root);
export const useStore = (): Store => store as Store;
