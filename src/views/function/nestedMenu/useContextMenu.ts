import { ref, onMounted, onUnmounted, type Ref } from "vue";

const useContextMenu = (containerRef: Ref) => {
	const showMenu = ref(false);
	const x = ref(0);
	const y = ref(0);

	/** 右键事件处理函数 */
	const handleContextMenu = (e: MouseEvent) => {
		// 阻止浏览器的默认行为
		e.preventDefault();
		// 阻止冒泡
		e.stopPropagation();
		showMenu.value = true;
		x.value = e.clientX;
		y.value = e.clientY;
	};

	/** 关闭菜单事件 */
	const closeMenu = () => {
		showMenu.value = false;
	};

	onMounted(() => {
		const div = containerRef.value;
		// 注册右键监听事件
		div.addEventListener("contextmenu", handleContextMenu);
		// 触发 window 点击事件的时候执行函数
		window.addEventListener("click", closeMenu, true);
		// 处理 window 的 contextmenu 事件，用来关闭之前打开的菜单
		window.addEventListener("contextmenu", closeMenu, true);
	});

	onUnmounted(() => {
		const div = containerRef.value;
		div?.removeEventListener("contextmenu", handleContextMenu);
		window?.removeEventListener("click", closeMenu, true);
		window?.removeEventListener("contextmenu", closeMenu, true);
	});

	return {
		showMenu,
		x,
		y
	};
};

export default useContextMenu;
