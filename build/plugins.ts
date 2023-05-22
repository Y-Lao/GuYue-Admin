import { resolve } from "path";
import { PluginOption } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
// 按需引入antdV
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";

/**
 * 创建 vite 插件
 * @param viteEnv
 */
export const createVitePlugins = (viteEnv: ViteEnv): (PluginOption | PluginOption[])[] => {
	return [
		vue(),
		vueJsx(),
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
	];
};
