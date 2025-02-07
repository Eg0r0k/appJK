import { defineStore } from "pinia";
import { ref } from "vue";

export const useDriverStore = defineStore("driver", () => {
  const steps = ref([]);
});
