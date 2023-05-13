import { Role } from "@/api/interface/index";
import { PORT } from "@/api/config/servicePort";
import http from "@/api";

/**
 * @name 角色管理模块
 */
// 角色列表
export const getRolesListApi = () => {
	return http.get<Role.RoleList[]>(PORT + `/basicRole/list`);
};
