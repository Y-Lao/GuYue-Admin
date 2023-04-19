import router from "@/routers/index";
import { isType } from "@/utils/util";
import { LOGIN_URL } from "@/config/config";
import { notification } from "ant-design-vue";
import { GlobalStore } from "@/stores";
import { AuthStore } from "@/stores/modules/auth";

// 引入 views 文件夹下所有的 vue 文件
const module = import.meta.glob("@/views/**/*.vue");

/**
 * @description 初始化动态路由
 */
export const initDynamicRouter = async () => {
	const authStore = AuthStore();
	const globalStore = GlobalStore();

	try {
		// 1.获取菜单列表 && 按钮权限（可合并到一个接口获取，根据后端不同可自行改造）
		await authStore.getAuthMenuList();
		await authStore.getAuthButtonList();

		// 2.判断当前用户有没有菜单权限
		if (!authStore.authMenuList.length) {
			notification["warning"]({
				message: "无权限访问",
				description: "当前账号无任何菜单权限，请联系系统管理员！",
				duration: 3
			});
			globalStore.setToken("");
			router.replace(LOGIN_URL);
			return Promise.reject("No permission");
		}

		// 3.添加动态路由
		authStore.flatMenuListGet.forEach((item: any) => {
			item.children && delete item.children;
			if (item.component && isType(item.component) == "string") {
				item.component = module["/src/views" + item.component + ".vue"];
			}
			// 判断是否全屏路由
			if (item.meta.isFull) {
				router.addRoute(item);
			} else {
				router.addRoute("layout", item);
			}
		});
	} catch (error) {
		// 当按钮 || 菜单请求出错时，重定向到登陆页
		globalStore.setToken("");
		router.replace(LOGIN_URL);
		return Promise.reject(error);
	}
};
