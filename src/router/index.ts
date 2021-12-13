import Login from "@/components/auth/Login.vue";
import Register from "@/components/auth/Register.vue";
import { store } from "@/store";
import { EUserGetters } from "@/types/UserTypes";
import Analytic from "@/views/Analytic.vue";
import Auth from "@/views/Auth.vue";
import Client from "@/views/Client.vue";
import Components from "@/views/Components.vue";
import Material from "@/views/Material.vue";
import Media from "@/views/Media.vue";
import Portfolio from "@/views/Portfolio.vue";
import Service from "@/views/Service.vue";
import ShortCard from "@/views/ShortCard.vue";
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
    name: "Компоненты",
    component: Components,
    meta: {
      visible: true,
      icon: "analytics",
    },
  },
  {
    path: "/short-card",
    name: "Быстрая карточка",
    component: ShortCard,
  },
  {
    path: "/analytic",
    name: "Аналитика",
    component: Analytic,
    meta: {
      visible: true,
      icon: "analytics",
    },
  },
  {
    path: "/client",
    name: "Клиенты",
    component: Client,
    meta: {
      visible: true,
      icon: "users",
    },
  },
  {
    path: "/portfolio",
    name: "Работы",
    component: Portfolio,
    meta: {
      visible: true,
      icon: "folders",
    },
  },
  {
    path: "/material",
    name: "Материалы",
    component: Material,
    meta: {
      visible: true,
      icon: "dolly-flatbed-alt",
    },
  },
  {
    path: "/service",
    name: "Услуги",
    component: Service,
    meta: {
      visible: true,
      icon: "poll-h",
    },
  },
  {
    path: "/media",
    name: "Файлы",
    component: Media,
    meta: {
      visible: true,
      icon: "photo-video",
    },
  },
  {
    path: "/auth/",
    name: "Auth",
    component: Auth,
    children: [
      {
        path: "register",
        name: "Регистрация",
        component: Register,
      },
      {
        path: "login",
        name: "Вход",
        component: Login,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const isAuthPath = to.path === "/auth/login" || to.path === "/auth/register";
  let user = store.getters[EUserGetters.GET_USER];

  if (!user.id) {
    await store.dispatch("CURRENT");
    user = store.getters[EUserGetters.GET_USER];
  }

  if (isAuthPath) {
    // if (user.id) return next(from.fullPath);
  } else {
    if (!user.id) return next({ path: "/auth/login" });
  }
  return next();
});

export default router;
