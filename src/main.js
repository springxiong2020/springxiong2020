import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import { initTheme } from "./composables/useDarkMode";

import "./icons.css";
import "./style.css";

initTheme();
const app = createApp(App);
app.use(router);
app.use(createPinia());
app.mount("#app");
