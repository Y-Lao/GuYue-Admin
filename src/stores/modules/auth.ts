import { defineStore } from "pinia";
import { AuthState } from "@/stores/interface";
import { getAuthMenuListApi } from "@/api/modules/login";
import { getFlatArr, getShowMenuList, getAllBreadcrumbList } from "@/utils/util";

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
		flatMenuListGet: state => getFlatArr(state.authMenuList),
		// 后端返回的菜单列表 ==> 左侧菜单栏渲染，需要去除 isHide == true
		showMenuListGet: state => getShowMenuList(state.authMenuList),
		// 所有面包屑导航列表
		breadcrumbListGet: state => getAllBreadcrumbList(state.authMenuList)
	},
	actions: {
		// getAuthMenuList
		async getAuthMenuList() {
			const { data } = await getAuthMenuListApi();
			this.authMenuList = data;
		},
		// setRouteName
		async setRouteName(name: string) {
			this.routeName = name;
		}
	}
});
