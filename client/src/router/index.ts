import Login from "@/components/auth/Login.vue";
import Register from "@/components/auth/Register.vue";
import { store } from "@/store";
import Auth from "@/views/Auth.vue";
import Components from "@/views/Components.vue";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/components",
    name: "Components",
    component: Components,
  },
  {
    path: "/auth/",
    name: "Auth",
    component: Auth,
    children: [
      { path: "register", component: Register },
      { path: "login", component: Login },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const isAuthPath = to.path === "/auth/login" || to.path === "/auth/register";
  let user = store.getters.GET_USER;

  if (!user.id) {
    await store.dispatch("CURRENT");
    user = store.getters.GET_USER;
  }

  if (isAuthPath) {
    if (user.id) return next(from.fullPath);
  } else {
    if (!user.id) return next({ path: "/auth/login" });
  }
  return next();
});

export default router;
