import axios from "axios";
import type { AxiosInstance, AxiosError, AxiosRequestConfig } from "axios";

import { ResultEnum } from "@/enums/httpEnum";
import { GlobalStore } from "@/stores";

// 配置
const config = {
	// 默认地址请求地址，可在 .env.*** 文件中修改
	baseURL: "/api",
	// 设置超时时间（10s）
	timeout: ResultEnum.TIMEOUT as number,
	// 跨域时候允许携带凭证
	withCredentials: true
};

class RequestHttp {
	service: AxiosInstance;
	public constructor(config: AxiosRequestConfig) {
		// 实例化 axios
		this.service = axios.create(config);

		/**
		 * @description 请求拦截器
		 * 客户端发送请求 -> [请求拦截器] -> 服务器
		 * token校验(JWT) : 接受服务器返回的token,存储到vuex/pinia/本地储存当中
		 */
		this.service.interceptors.request.use(
			(config: AxiosRequestConfig) => {
				const globalState = GlobalStore();
				// * 如果当前请求不需要显示 loading,在 api 服务中通过指定的第三个参数: { headers: { noLoading: true } }来控制不显示loading，参见loginApi
				// config.headers!.noLoading || showFullScreenLoading();
				const token = globalState.token;
				return { ...config, headers: { "x-access-token": token } };
			},
			(error: AxiosError) => {
				return Promise.reject(error);
			}
		);
	}
}

export default new RequestHttp(config);
