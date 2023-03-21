import { defineStore } from "pinia";
import { AuthState } from "@/stores/interface";
import { getFlatArr } from "@/utils/util";

// AuthStore
export const AuthStore = defineStore({
	id: "AuthStore",
	state: (): AuthState => ({
		// 当前页面的 router name，用来做按钮权限筛选
		routeName: "",
		// 菜单权限列表
		authMenuList: []
	}),
	getters: {
		// 后端返回的菜单列表 ==> 这里没有经过任何处理
		authMenuListGet: state => state.authMenuList,
		// 扁平化之后的一维数组路由，主要用来添加动态路由
		flatMenuListGet: state => getFlatArr(state.authMenuList)
	},
	actions: {
		// setRouteName
		async setRouteName(name: string) {
			this.routeName = name;
		}
	}
});
