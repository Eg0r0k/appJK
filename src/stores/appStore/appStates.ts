import { defineStore } from "pinia";
import { ref } from "vue";

export const useAppStore = defineStore("appStore", () => {
  const isLoading = ref(false);
  const hasError = ref("");
  return {
    isLoading,
    hasError,
  };
});
