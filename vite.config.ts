import { defineConfig, loadEnv, ConfigEnv, UserConfig } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import { wrapperEnv } from "./src/utils/getEnv";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
// 按需引入antdV
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";

// @see: https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
	const env = loadEnv(mode, process.cwd());
	const viteEnv = wrapperEnv(env);

	return {
		base: "./",
		resolve: {
			alias: {
				"@": resolve(__dirname, "./src")
			}
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
		plugins: [
			vue(),
			// 标题设置
			createHtmlPlugin({
				inject: {
					data: {
						title: viteEnv.VITE_GLOB_APP_TITLE
					}
				}
			}),
			// * 使用 svg 图标
			createSvgIconsPlugin({
				// 指定需要缓存的图标文件夹
				iconDirs: [resolve(process.cwd(), "src/assets/icons")],
				// 指定symbolId格式
				symbolId: "icon-[dir]-[name]"
			}),
			// UI组件库按需引入
			Components({
				resolvers: [
					AntDesignVueResolver({
						importStyle: false // 动态主题需配置
					})
				]
			})
		],
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
