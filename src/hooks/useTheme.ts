import { storeToRefs } from "pinia";
import { useGlobalStore } from "@/stores/modules/global";
import { ConfigProvider } from "ant-design-vue";

/**
 * @desc 切换主题
 */

export const useTheme = () => {
	const globalStore = useGlobalStore();
	const { primary, isGrey, isWeak } = storeToRefs(globalStore);

	// 切换暗黑模式
	const switchDark = () => {
		// const body = document.documentElement as HTMLElement;
		// if (themeConfig.value.styleSetting == "realDark") body.setAttribute("data-theme", "dark");
		// else body.setAttribute("data-theme", "light");
		changePrimary();
	};

	// 修改主题颜色
	const changePrimary = () => {
		ConfigProvider.config({
			theme: {
				primaryColor: primary.value
			}
		});
	};

	// 灰色和弱色切换
	const changeGreyOrWeak = (value: boolean, type: string) => {
		const body = document.body as HTMLElement;
		if (!value) return body.setAttribute("style", "");
		if (type === "grey") body.setAttribute("style", "filter: grayscale(1)");
		if (type === "weak") body.setAttribute("style", "filter: invert(80%)");
		const propName = type === "grey" ? "isWeak" : "isGrey";
		globalStore.setGlobalState(propName, false);
	};

	// 初始化 theme 配置
	const initTheme = () => {
		switchDark();
		changePrimary();
		if (isGrey.value) changeGreyOrWeak(true, "grey");
		if (isWeak.value) changeGreyOrWeak(true, "weak");
	};

	return {
		initTheme,
		switchDark,
		changePrimary,
		changeGreyOrWeak
	};
};
