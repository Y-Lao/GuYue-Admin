import { defineStore, createPinia } from "pinia";
import { GlobalState, ThemeConfigProps, AssemblySizeType } from "./interface";
import piniaPersistConfig from "@/config/piniaPersist";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { DEFAULT_PRIMARY } from "@/config/config";

// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
export const GlobalStore = defineStore({
	// id: 必须的，在所有 Store 中唯一
	id: "GlobalState",
	state: (): GlobalState => ({
		token: "",
		// element组件大小
		assemblySize: "middle",
		// language
		language: "zh_CN",
		// themeConfig
		themeConfig: {
			// 当前页面是否全屏
			maximize: false,
			// 布局切换 -->  纵向：vertical | 经典：classic | 横向：transverse | 分栏：columns
			layout: "vertical",
			// 默认 primary 主题颜色
			primary: DEFAULT_PRIMARY,
			// 风格切换 --> 亮色：light | 暗色：dark | 暗黑：realDark
			styleSetting: "realDark",
			// 灰色模式
			isGrey: false,
			// 色弱模式
			isWeak: false,
			// 折叠菜单
			isCollapse: false,
			// 面包屑导航
			breadcrumb: true,
			// 面包屑导航图标
			breadcrumbIcon: true,
			// 标签页
			tabs: true,
			// 标签页图标
			tabsIcon: true,
			// 页脚
			footer: true
		}
	}),
	getters: {},
	actions: {
		// setToken
		setToken(token: string) {
			this.token = token;
		},
		// setAssemblySizeSize
		setAssemblySizeSize(assemblySize: AssemblySizeType) {
			this.assemblySize = assemblySize;
		},
		// updateLanguage
		updateLanguage(language: string) {
			this.language = language;
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
