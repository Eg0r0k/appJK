<template>
  <HeaderMain v-if="!hideHeader" />
  <div id="wrapper" :style="wrapperStyle">
    <Button @click="driverStore.startGuide()">
      start
    </Button>
    <BreadcrumbComponent v-if="!hideHeader" />
    <main class="grid h-full flex-grow">
      <router-view v-slot="{ Component, route }">
          <component :is="Component" :key="route.path" />
      </router-view>
    </main>
  </div>
  <Toaster class="pointer-events-auto" />
</template>

<script setup lang="ts">
import { Toaster } from 'vue-sonner';
import HeaderMain from './components/header/HeaderMain.vue';
import { useRoute } from 'vue-router';
import { computed, onBeforeMount, onMounted } from 'vue';
import { useConfigStore } from './stores/configStore/config';
import BreadcrumbComponent from './components/header/BreadcrumbComponent .vue';
import { useDriverStore } from './stores/driverStore/driverControl';
import Button from './components/ui/button/Button.vue';

const route = useRoute();
const hideHeader = computed(() => route.meta.hideHeader === true);
const wrapperStyle = computed(() => ({
  minHeight: hideHeader.value ? '100vh' : 'calc(100vh - 60px)',
  padding: hideHeader.value ? '0' : '24px 16px',
  maxWidth: hideHeader.value ? '100%' : "1532px"
}));
const configStore = useConfigStore();
const driverStore = useDriverStore()


onBeforeMount(async () => {
  await configStore.loadConfig();
});
onMounted(() => {
  driverStore.initDriver()
})

</script>

<style scoped>
#wrapper {
  box-sizing: border-box;
  z-index: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
}
</style>

<style>
:root {
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
}
</style>