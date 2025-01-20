import { isTauri } from "@tauri-apps/api/core";
import { writeText } from "@tauri-apps/plugin-clipboard-manager";
import { toast } from "vue-sonner";
export const useClipBoard = async (content: string) => {
  try {
    if (isTauri()) {
      await writeText(content);
    } else {
      await navigator.clipboard.writeText(content);
    }
    toast.success("Успешно скопированно");
  } catch (e) {
    toast.error("Ошибка при копировании", {
      description: e as string,
    });
    console.error(e);
  }
};
