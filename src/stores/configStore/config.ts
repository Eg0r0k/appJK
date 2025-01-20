import { defineStore } from "pinia";
import { ref } from "vue";
import { load } from "@tauri-apps/plugin-store";
import { invoke, isTauri } from "@tauri-apps/api/core";

export enum Theme {
  Dark = "dark",
  Light = "light",
}

interface ConfigI {
  theme: Theme;
  font: "inter" | "manrope" | "system";
}

export const useConfigStore = defineStore("config", () => {
  const config = ref<ConfigI>({
    theme: Theme.Light,
    font: "inter",
  });

  let store: Awaited<ReturnType<typeof load>> | null = null;

  const loadConfig = async () => {
    try {
      if (isTauri()) {
        store = await load("store.json");
        const savedConfig = await store.get<ConfigI>("config");
        if (savedConfig) {
          config.value = savedConfig;
          applyTheme(savedConfig.theme);
        }
      } else {
        const savedConfig = localStorage.getItem("config");
        if (savedConfig) {
          config.value = JSON.parse(savedConfig);
          applyTheme(config.value.theme);
        }
      }
    } catch (error) {
      console.error("Ошибка при загрузке конфига:", error);
    }
  };

  const saveConfig = async () => {
    try {
      if (isTauri()) {
        if (!store) {
          console.error("Хранилище не инициализировано.");
          return;
        }
        await store.set("config", config.value);
        await store.save();
      } else {
        localStorage.setItem("config", JSON.stringify(config.value));
      }
    } catch (error) {
      console.error("Ошибка при сохранении конфига:", error);
    }
  };

  const applyTheme = async (theme: "light" | "dark") => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    if (isTauri()) {
      await invoke("set_theme", { theme });
    }
  };

  return {
    config,
    loadConfig,
    saveConfig,
    setTheme(theme: Theme) {
      config.value.theme = theme;
      applyTheme(theme);
      saveConfig();
    },
    setFont(font: "inter" | "manrope" | "system") {
      config.value.font = font;
      saveConfig();
    },
  };
});
