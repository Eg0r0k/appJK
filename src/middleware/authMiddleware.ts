import { ROUTE_NAMES } from "@/router";
import { useAuthStore } from "@/stores/authStore/auth";
import { RouteLocationNormalized, RouteLocationRaw } from "vue-router";

export const checkAuth = (
  to: RouteLocationNormalized
): RouteLocationRaw | undefined => {
  const authStore = useAuthStore();

  if (
    authStore.isAuth &&
    (to.name === ROUTE_NAMES.LOGIN || to.name === ROUTE_NAMES.SIGNUP)
  ) {
    return { name: ROUTE_NAMES.HOME };
  }

  if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    !authStore.isAuth
  ) {
    return { name: ROUTE_NAMES.LOGIN };
  }

  return undefined;
};
