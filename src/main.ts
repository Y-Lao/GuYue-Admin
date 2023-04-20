import { createApp } from "vue";
import App from "./App.vue";

// antd css
// import "ant-design-vue/dist/antd.css"; // 默认样式
import "ant-design-vue/dist/antd.variable.min.css"; // 动态主题样式
// import 'ant-design-vue/dist/antd.dark.less'; // 暗黑主题样式
// reset style sheet
import "@/styles/reset.less";
// common style sheet
import "@/styles/common.less";
// custom antd css
import "@/styles/antd.less";
// iconfont css
import "@/assets/iconfont/iconfont.less";
// font css
import "@/assets/fonts/font.less";
// antd icons
import * as Icons from "@ant-design/icons-vue";
// custom directives
import directives from "@/directives/index";
// vue Router
import router from "@/routers/index";
// vue i18n
import I18n from "@/languages/index";
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

app.use(directives).use(router).use(I18n).use(pinia).mount("#app");
