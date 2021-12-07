import Login from "@/components/auth/Login.vue";
import Register from "@/components/auth/Register.vue";
import Auth from "@/views/Auth.vue";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
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

export default router;
