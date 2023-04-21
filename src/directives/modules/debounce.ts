/**
 * v-debounce
 * 按钮防抖指令，可自行扩展至input
 * 接收参数：function类型
 */
import type { Directive, DirectiveBinding } from "vue";
interface ElType extends HTMLElement {
	__handleClick__: () => any;
}

const debounce: Directive = {
	// 指令绑定到元素上时触发
	mounted(el: ElType, binding: DirectiveBinding) {
		// 如果绑定的值不是函数，抛出异常
		if (typeof binding.value !== "function") {
			throw "callback must be a function";
		}
		let timer: NodeJS.Timeout | null = null;
		el.__handleClick__ = function () {
			// 如果计时器存在，清除计时器
			if (timer) clearTimeout(timer);
			// 设置一个计时器，500ms 后执行
			timer = setTimeout(() => {
				binding.value();
			}, 500);
		};
		// 给元素添加点击事件监听器
		el.addEventListener("click", el.__handleClick__);
	},
	// 指令与元素解绑时触发
	beforeUnmount(el: ElType) {
		// 移除元素的点击事件监听器
		el.removeEventListener("click", el.__handleClick__);
	}
};

export default debounce;
