import { ResPage, User } from "@/api/interface/index";
import { PORT } from "@/api/config/servicePort";
import http from "@/api";

/**
 * @name 用户管理模块
 */
// 获取用户列表
export const getUserList = (params: User.ReqUserParams) => {
	return http.post<ResPage<User.ResUserList>>(PORT + `/user/list`, params);
};

// 批量添加用户
export const BatchAddUser = (params: FormData) => {
	return http.post(PORT + `/user/import`, params);
};

// 导出用户数据
export const exportUserInfo = (params: User.ReqUserParams) => {
	return http.download(PORT + `/user/export`, params);
};

// 重置用户密码
export const resetUserPassWord = (params: { id: string }) => {
	return http.post(PORT + `/user/rest_password`, params);
};
