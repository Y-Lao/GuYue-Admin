/**
 * v-copy
 * 复制某个值至剪贴板
 * 接收参数：string类型/Ref<string>类型/Reactive<string>类型
 */
import type { Directive, DirectiveBinding } from "vue";
import { message } from "ant-design-vue";

interface ElType extends HTMLElement {
	copyData: string | number; // 定义一个属性，用于存储需要复制的数据
	__handleClick__: any; // 定义一个属性，用于存储事件处理函数
}

const copy: Directive = {
	mounted(el: ElType, binding: DirectiveBinding) {
		el.copyData = binding.value; // 将需要复制的数据存储到元素的属性中
		el.addEventListener("click", handleClick); // 给元素绑定点击事件
	},
	// 指令所在组件的 VNode 更新时触发
	updated(el: ElType, binding: DirectiveBinding) {
		el.copyData = binding.value; // 更新需要复制的数据
	},
	// 指令与元素解绑时触发
	beforeUnmount(el: ElType) {
		el.removeEventListener("click", el.__handleClick__); // 移除元素的点击事件
	}
};

// 点击事件处理函数
function handleClick(this: any) {
	const input = document.createElement("input"); // 创建一个 input 元素
	input.value = this.copyData.toLocaleString(); // 将需要复制的数据赋值给 input 的 value 属性
	document.body.appendChild(input); // 将 input 元素添加到 body 中
	input.select(); // 选中 input 元素中的文本
	document.execCommand("Copy"); // 执行复制操作
	document.body.removeChild(input); // 将 input 元素从 body 中移除
	message.success("复制成功"); // 使用 antd vue 的 message 组件显示复制成功的消息
}

export default copy;
