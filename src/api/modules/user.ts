import { User } from "@/api/interface/index";
import { PORT } from "@/api/config/servicePort";
import http from "@/api";

/**
 * @name 用户管理模块
 */
// 批量添加用户
export const BatchAddUser = (params: FormData) => {
	return http.post(PORT + `/user/import`, params);
};

// 导出用户数据
export const exportUserInfo = (params: User.ReqUserParams) => {
	return http.download(PORT + `/user/export`, params);
};