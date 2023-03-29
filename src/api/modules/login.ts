import { Login } from "@/api/interface/index";
import { PORT } from "@/api/config/servicePort";
import http from "@/api";

/**
 * @name 登录模块
 */
// * 用户登录
export const loginApi = (params: Login.ReqLoginForm) => {
	// 正常 post json 请求
	return http.post<Login.ResLogin>(PORT + `/login`, params, { headers: { noLoading: true } });
};

// * 获取菜单列表
export const getAuthMenuListApi = () => {
	return http.get<Menu.MenuOptions[]>(PORT + `/menu/list`, {}, { headers: { noLoading: true } });
};

// * 用户退出登录
export const logoutApi = () => {
	return http.post(PORT + `/logout`);
};
