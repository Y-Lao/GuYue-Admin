import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

// vue Router
import router from "@/routers/index";
// pinia store
import pinia from "@/stores/index";

createApp(App).use(router).use(pinia).mount("#app");
