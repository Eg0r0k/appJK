import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import VueQrcode from "@chenfengyuan/vue-qrcode";

import router from "./router";
import "./assets/index.css";
const pinia = createPinia();
const app = createApp(App);
app.use(pinia);
app.use(router);
app.component(VueQrcode.name as string, VueQrcode);
app.mount("#app");
