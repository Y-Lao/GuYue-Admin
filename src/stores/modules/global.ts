import { defineStore } from "pinia";
import { GlobalState } from "@/stores/interface";
import { DEFAULT_PRIMARY } from "@/config";
import piniaPersistConfig from "@/config/piniaPersist";

// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
export const useGlobalStore = defineStore({
	// id: 必须的，在所有 Store 中唯一
	id: "guyue-global",
	state: (): GlobalState => ({
		// 刷新页面
		refreshPage: true,
		// 当前Route Name
		routeName: "",
		// 全局loading
		loading: false,
		// 布局切换 -->  纵向：vertical | 经典：classic | 横向：transverse | 分栏：columns
		layout: "vertical",
		// antd组件大小
		assemblySize: "middle",
		// language
		language: "zh_CN",
		// 当前页面是否全屏
		maximize: false,
		// 默认 primary 主题颜色
		primary: DEFAULT_PRIMARY,
		// 风格切换 --> 亮色：light | 暗色：dark | 暗黑：realDark
		styleSetting: "dark",
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
	}),
	getters: {},
	actions: {
		// Set GlobalState
		setGlobalState(key: keyof GlobalState, val: any) {
			this.$patch({ [key]: val });
		}
	},
	persist: piniaPersistConfig("guyue-global")
});
