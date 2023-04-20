import { computed } from "vue";
import { useRoute } from "vue-router";
import { AuthStore } from "@/stores/modules/auth";

/**
 * @description 页面按钮权限
 */
export const useAuthButtons = () => {
	const router = useRoute();
	const authStore = AuthStore();
	const authButtons = authStore.authButtonListGet[router.name as string] || [];

	const BUTTONS = computed(() => {
		let currentPageAuthButton: { [key: string]: boolean } = {};
		authButtons.forEach(item => (currentPageAuthButton[item] = true));
		return currentPageAuthButton;
	});

	return {
		BUTTONS
	};
};
