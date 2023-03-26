import { defineStore, createPinia } from "pinia";
import { GlobalState, ThemeConfigProps } from "./interface";
import piniaPersistConfig from "@/config/piniaPersist";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
export const GlobalStore = defineStore({
	// id: 必须的，在所有 Store 中唯一
	id: "GlobalState",
	state: (): GlobalState => ({
		token: "",
		// themeConfig
		themeConfig: {
			// 布局切换 -->  纵向：vertical | 经典：classic | 横向：transverse | 分栏：columns
			layout: "vertical",
			// 折叠菜单
			isCollapse: false
		}
	}),
	getters: {},
	actions: {
		// setToken
		setToken(token: string) {
			this.token = token;
		},
		// setThemeConfig
		setThemeConfig(themeConfig: ThemeConfigProps) {
			this.themeConfig = themeConfig;
		}
	},
	persist: piniaPersistConfig("GlobalState")
});

// piniaPersist(持久化)
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export default pinia;
