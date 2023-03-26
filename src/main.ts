import { createApp } from "vue";
import App from "./App.vue";

// antd css
import "ant-design-vue/dist/antd.css";
// reset style sheet
import "@/styles/reset.less";
// CSS common style sheet
import "@/styles/common.less";
// antd icons
import * as Icons from "@ant-design/icons-vue";
// vue Router
import router from "@/routers/index";
// pinia store
import pinia from "@/stores/index";
// svg icons
import "virtual:svg-icons-register";
import { registerGlobComp } from "@/components/registerGlobComp";

const app = createApp(App);

// 注册antd Icons组件
Object.keys(Icons).forEach(key => {
	app.component(key, Icons[key as keyof typeof Icons]);
});

// 注册全局组件
registerGlobComp(app);

app.use(router).use(pinia).mount("#app");
