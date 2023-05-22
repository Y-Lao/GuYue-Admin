import { defineConfig, loadEnv, ConfigEnv, UserConfig } from "vite";
import { createVitePlugins } from "./build/plugins";
import { resolve } from "path";
import { wrapperEnv } from "./src/utils/getEnv";
import pkg from "./package.json";
import dayjs from "dayjs";

// 项目信息
const { dependencies, devDependencies, name, version } = pkg;
const __APP_INFO__ = {
	pkg: { dependencies, devDependencies, name, version },
	lastBuildTime: dayjs().format("YYYY-MM-DD HH:mm:ss")
};

// @see: https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
	const env = loadEnv(mode, process.cwd());
	const viteEnv = wrapperEnv(env);

	return {
		base: "./",
		resolve: {
			alias: {
				"@": resolve(__dirname, "./src"),
				"vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js"
			}
		},
		define: {
			__APP_INFO__: JSON.stringify(__APP_INFO__)
		},
		css: {
			preprocessorOptions: {
				less: {
					additionalData: `
					@import "@/styles/var.less";
                    `,
					javascriptEnabled: true
				}
			}
		},
		plugins: createVitePlugins(viteEnv),
		server: {
			// 服务器主机名，如果允许外部访问，可设置为 "0.0.0.0"
			host: "0.0.0.0",
			// 启动端口
			port: viteEnv.VITE_PORT,
			open: viteEnv.VITE_OPEN,
			cors: true,
			// 设置https 代理
			proxy: {
				"/api": {
					target: " https://mock.mengxuegu.com/mock/64112a1afe77f949bc0d6ec6/guyue",
					changeOrigin: true,
					rewrite: (path: string) => path.replace(/^\/api/, "")
				}
			}
		}
	};
});
