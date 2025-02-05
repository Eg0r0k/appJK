import AccountSettings from "@/components/settings/AccountSettings.vue";
import DisplaySettings from "@/components/settings/DisplaySettings.vue";
import ProfileSettings from "@/components/settings/ProfileSettings.vue";
import { checkAuth } from "@/middleware/authMiddleware";
import ConnectionsPage from "@/pages/ConnectionsPage.vue";
import ErrorPage from "@/pages/ErrorPage.vue";
import HomePage from "@/pages/HomePage.vue";
import LoginPage from "@/pages/LoginPage.vue";
import PowerPlantsPage from "@/pages/PowerPlantsPage.vue";
import ProfilePage from "@/pages/ProfilePage.vue";
import SettingsPage from "@/pages/SettingsPage.vue";
import SignUpPage from "@/pages/SignUpPage.vue";

import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

export const ROUTE_NAMES = {
  HOME: "Обзор",
  SIGNUP: "Регистрация",
  LOGIN: "Вход",
  PROFILE: "Профиль",
  SETTINGS: "Настройки",
  ERROR: "Ошибка",
  CONNECTIONS: "Подключения",
  POWER_PLANTS: "Электростанции",
};

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: ROUTE_NAMES.HOME,
    component: HomePage,
    meta: { title: "Обзор", requiresAuth: true },
  },
  {
    path: "/connections",
    name: ROUTE_NAMES.CONNECTIONS,
    component: ConnectionsPage,
    meta: {
      title: "Подключения",
      requiresAuth: true,
      breadcrumbName: "Подключения",
    },
  },
  {
    path: "/connections/:id",
    name: "ConnectionDetail",
    component: () => import("@/pages/ConnectionDetailPage.vue"),
    meta: {
      title: "Детали подключения",
      requiresAuth: true,
      breadcrumbName: (route: any) => `Подключение #${route.params.id}`,
    },
  },
  {
    path: "/power-plants",
    name: ROUTE_NAMES.POWER_PLANTS,
    component: PowerPlantsPage,
    meta: { title: "Электростанции", requiresAuth: true },
  },
  {
    path: "/signup",
    name: ROUTE_NAMES.SIGNUP,
    component: SignUpPage,
    meta: { title: "Регистрация", hideHeader: true },
  },
  {
    path: "/login",
    name: ROUTE_NAMES.LOGIN,
    component: LoginPage,
    meta: { title: "Вход", hideHeader: true },
  },
  {
    path: "/profile",
    name: ROUTE_NAMES.PROFILE,
    component: ProfilePage,
    meta: { title: "Профиль", requiresAuth: true },
  },

  {
    path: "/settings",
    name: ROUTE_NAMES.SETTINGS,
    component: SettingsPage,
    meta: { title: "Настройки", requiresAuth: true },
    children: [
      {
        path: "profile",
        component: ProfileSettings,
        meta: { breadcrumbName: "Профиль", transitionName: "none" },
      },
      {
        path: "account",
        component: AccountSettings,
        meta: { breadcrumbName: "Аккаунт", transitionName: "none" },
      },
      {
        path: "display",
        component: DisplaySettings,
        meta: { breadcrumbName: "Отображение", transitionName: "none" },
      },
      {
        path: "",
        name: "SettingsDefault",
        redirect: "/settings/profile",
      },
      {
        path: ":pathMatch(.*)*",
        redirect: "/settings/profile",
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: ROUTE_NAMES.ERROR,
    component: ErrorPage,
    meta: { title: "Упсссс...", hideHeader: true },
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  const redirect = checkAuth(to);
  if (redirect) {
    return redirect;
  }
});

export default router;
