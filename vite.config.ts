import { defineConfig, loadEnv, ConfigEnv, UserConfig } from "vite";
import { createVitePlugins } from "./build/plugins";
import { resolve } from "path";
import { wrapperEnv } from "./src/utils/getEnv";
import { createProxy } from "./build/proxy";
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
	const root = process.cwd();
	const env = loadEnv(mode, root);
	const viteEnv = wrapperEnv(env);

	return {
		base: viteEnv.VITE_PUBLIC_PATH,
		root,
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
		server: {
			host: "0.0.0.0",
			port: viteEnv.VITE_PORT,
			open: viteEnv.VITE_OPEN,
			cors: true,
			// 设置https 代理
			proxy: createProxy(viteEnv.VITE_PROXY)
			// proxy: {
			// 	"/api": {
			// 		target: "https://mock.mengxuegu.com/mock/64112a1afe77f949bc0d6ec6/guyue",
			// 		changeOrigin: true,
			// 		rewrite: (path: string) => path.replace(/^\/api/, "")
			// 	}
			// }
		},
		plugins: createVitePlugins(viteEnv),
		esbuild: {
			pure: viteEnv.VITE_DROP_CONSOLE ? ["console.log", "debugger"] : []
		},
		// 配置构建过程的选项，例如是否生成压缩文件和源映射
		build: {
			// 构建输出的目录，默认值为"dist"
			outDir: "dist",
			// 用于指定使用的代码压缩工具。在这里，minify 被设置为 'terser'，表示使用 Terser 进行代码压缩。默认值terser
			// esbuild 打包更快，但是不能去除 console.log，terser打包慢，但能去除 console.log
			minify: "terser",
			// 用于配置 Terser 的选项
			terserOptions: {
				// 用于配置压缩选项
				compress: {
					drop_console: true, // 是否删除代码中的 console 语句, 默认值false
					drop_debugger: true // 是否删除代码中的 debugger 语句, 默认值false
				}
			},
			// 禁用 gzip 压缩大小报告，可略微减少打包时间
			reportCompressedSize: false,
			// 用于指定是否生成源映射文件。源映射文件可以帮助调试和定位源代码中的错误。当设置为false时，构建过程不会生成源映射文件
			sourcemap: false,
			// 用于配置 CommonJS 模块的选项
			commonjsOptions: {
				// 用于指定是否忽略 CommonJS 模块中的 try-catch 语句。当设置为false时，构建过程会保留 CommonJS 模块中的 try-catch 语句
				ignoreTryCatch: false
			},
			// 规定触发警告的 chunk 大小, 当某个代码分块的大小超过该限制时，Vite 会发出警告
			chunkSizeWarningLimit: 2000,
			// 用于配置 Rollup 打包工具的选项
			rollupOptions: {
				// 用于配置输出选项
				output: {
					// 静态资源分类和包装
					chunkFileNames: "assets/js/[name]-[hash].js", // 用于指定代码分块的输出文件名格式
					entryFileNames: "assets/js/[name]-[hash].js", // 用于指定入口文件的输出文件名格式
					assetFileNames: "assets/[ext]/[name]-[hash].[ext]" // 用于指定静态资源的输出文件名格式
				}
			}
		}
	};
});
