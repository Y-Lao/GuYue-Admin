import { computed } from "vue";
import { GlobalStore } from "@/stores";
import { ConfigProvider } from "ant-design-vue";

/**
 * @desc 切换主题
 */

export const useTheme = () => {
	const globalStore = GlobalStore();
	const themeConfig = computed(() => globalStore.themeConfig);

	// 切换暗黑模式
	const switchDark = () => {
		const body = document.documentElement as HTMLElement;
		if (themeConfig.value.styleSetting == "realDark") body.setAttribute("data-theme", "dark");
		else body.setAttribute("data-theme", "light");
		changePrimary();
	};

	// 修改主题颜色
	const changePrimary = () => {
		ConfigProvider.config({
			theme: {
				primaryColor: themeConfig.value.primary
			}
		});
	};

	// 灰色和弱色切换
	const changeGreyOrWeak = (value: boolean, type: string) => {
		const body = document.body as HTMLElement;
		if (!value) return body.setAttribute("style", "");
		if (type === "grey") body.setAttribute("style", "filter: grayscale(1)");
		if (type === "weak") body.setAttribute("style", "filter: invert(80%)");
		let propName = type == "grey" ? "isWeak" : "isGrey";
		globalStore.setThemeConfig({ ...themeConfig.value, [propName]: false });
	};

	// 初始化 theme 配置
	const initTheme = () => {
		switchDark();
		changePrimary();
		if (themeConfig.value.isGrey) changeGreyOrWeak(true, "grey");
		if (themeConfig.value.isWeak) changeGreyOrWeak(true, "weak");
	};

	return {
		initTheme,
		switchDark,
		changePrimary,
		changeGreyOrWeak
	};
};
