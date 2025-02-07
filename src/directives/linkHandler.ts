import { isTauri } from "@tauri-apps/api/core";
import { open } from "@tauri-apps/plugin-shell";
import { App } from "vue";
import { Router, RouteLocationRaw } from "vue-router";

export const createLinkHandler = (router: Router) => {
  const getCleanPath = (url: string): string => {
    try {
      return new URL(url, window.location.href).pathname;
    } catch {
      return url;
    }
  };
  const isExternalLink = (url: string): boolean => {
    try {
      const base = new URL(window.location.href);
      const target = new URL(url, base);
      return target.origin !== base.origin;
    } catch {
      return false;
    }
  };
  const isCurrentRoute = (path: string): boolean =>
    router.currentRoute.value.path === path;

  const handleNavigation = async (
    url: string,
    event: MouseEvent
  ): Promise<void> => {
    if (!isTauri()) return;

    event.preventDefault();
    event.stopPropagation();

    const path = getCleanPath(url);
    const isExternal = isExternalLink(url);

    if (isExternal) {
      await open(url);
    } else if (!isCurrentRoute(path)) {
      const resolved = router.resolve(path as RouteLocationRaw);
      if (resolved.matched.length) {
        router.push(path);
      } else {
        console.warn(`Route not found: ${path}`);
      }
    }
  };

  const handleAuxClick = async (event: MouseEvent): Promise<void> => {
    if (event.button === 1 && isTauri()) {
      const link = (event.target as HTMLElement).closest("a");
      if (!link?.href) return;

      event.preventDefault();
      event.stopPropagation();
      await handleNavigation(link.href, event);
    }
  };

  const handleClick = async (event: MouseEvent): Promise<void> => {
    const link = (event.target as HTMLElement).closest("a");
    if (link?.href) {
      await handleNavigation(link.href, event);
    }
  };

  const handleContextMenu = async (event: MouseEvent): Promise<void> => {
    const link = (event.target as HTMLElement).closest("a");
    if (link?.href) {
      event.preventDefault();
      await handleNavigation(link.href, event);
    }
  };

  const controller = new AbortController();

  const startListeners = () => {
    document.addEventListener("click", handleClick, {
      signal: controller.signal,
    });
    document.addEventListener("auxclick", handleAuxClick, {
      signal: controller.signal,
    });
    document.addEventListener("contextmenu", handleContextMenu, {
      signal: controller.signal,
    });
  };

  const stopListeners = () => {
    controller.abort();
  };

  return {
    install: (app: App) => {
      app.config.globalProperties.$linkHandler = {
        start: startListeners,
        stop: stopListeners,
      };
    },
  };
};
