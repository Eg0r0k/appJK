import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import VueQrcode from "@chenfengyuan/vue-qrcode";
import router from "./router";
import { createLinkHandler } from "./directives/linkHandler";
import { autoAnimatePlugin } from "@formkit/auto-animate/vue";

import "./assets/index.css";
import "driver.js/dist/driver.css";
    
const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(autoAnimatePlugin);
app.use(createLinkHandler(router));
app.component(VueQrcode.name as string, VueQrcode);
app.config.globalProperties.$linkHandler.start();
app.mount("#app");
