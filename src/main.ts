import { createApp } from "vue";
import App from "./App.vue";
// reset style sheet
import "@/styles/reset.less";
// CSS common style sheet
import "@/styles/common.less";
// vue Router
import router from "@/routers/index";
// pinia store
import pinia from "@/stores/index";
// svg icons
import "virtual:svg-icons-register";

createApp(App).use(router).use(pinia).mount("#app");
