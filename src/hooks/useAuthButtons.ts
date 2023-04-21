import { computed } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/stores/modules/auth";

/**
 * @description 页面按钮权限
 */
export const useAuthButtons = () => {
	const router = useRoute();
	const authStore = useAuthStore();
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
