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

  const isCurrentRoute = (path: string): boolean => {
    return router.currentRoute.value.path === path;
  };

  const handleNavigation = async (
    url: string,
    event: MouseEvent
  ): Promise<void> => {
    event.preventDefault();
    event.stopPropagation();

    const path = getCleanPath(url);
    const isExternal = isExternalLink(url);

    if (isExternal) {
      await open(url);
    } else {
      if (!isCurrentRoute(path)) {
        const resolved = router.resolve(path as RouteLocationRaw);
        if (resolved.matched.length) {
          router.push(path);
        } else {
          console.warn(`Route not found: ${path}`);
        }
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
    if (!link?.href) return;
    await handleNavigation(link.href, event);
  };

  const handleContextMenu = async (event: MouseEvent): Promise<void> => {
    const link = (event.target as HTMLElement).closest("a");
    if (!link?.href) return;

    event.preventDefault();
    await handleNavigation(link.href, event);
  };

  return {
    install: (app: App) => {
      app.config.globalProperties.$linkHandler = {
        start: () => {
          document.addEventListener("click", handleClick);
          document.addEventListener("auxclick", handleAuxClick);
          document.addEventListener("contextmenu", handleContextMenu);
        },
        stop: () => {
          document.removeEventListener("click", handleClick);
          document.removeEventListener("auxclick", handleAuxClick);
          document.removeEventListener("contextmenu", handleContextMenu);
        },
      };
    },
  };
};
