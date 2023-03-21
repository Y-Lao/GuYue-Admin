/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_GLOB_APP_TITLE: string; // 定义标题
	readonly VITE_PORT: number; // 定义端口号
	readonly VITE_OPEN: boolean; // 运行 npm run dev 时自动打开浏览器
}

declare module "*.vue" {
	import type { DefineComponent } from "vue";
	// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
	const component: DefineComponent<{}, {}, any>;
	export default component;
}
