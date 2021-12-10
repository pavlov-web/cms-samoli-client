import { toast } from "@/store/Toast/Toast";
import { user } from "@/store/User/User";
import { RootState, Store } from "@/store/types";
import {
  createStore,
  ModuleTree,
  Module,
  useStore as VuexStore,
  createLogger,
} from "vuex";

const modules: ModuleTree<RootState> = {
  user,
  toast,
};

const root: Module<RootState, RootState> = {
  modules,
};

export const store = createStore<RootState>({
  plugins: [createLogger as never],
  ...root,
});
export const useStore = (): Store => VuexStore() as Store;
