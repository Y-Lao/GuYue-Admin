<template>
	<div class="context-menu" ref="contextMenu" @blur="() => onClose()" tabindex="-1">
		<div class="context-menu-item-container">
			<div class="context-menu-item" @click="clickMenu('sendEmail')">发送到邮箱</div>
		</div>
		<div class="context-menu-item-container">
			<div class="context-menu-item" @click="clickMenu('sendPhone')">发送到手机</div>
		</div>
		<div class="context-menu-item-container">
			<div class="context-menu-item" @click="clickMenu('sendOther')">其他</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref, nextTick } from "vue";
import { message } from "ant-design-vue";

const props = defineProps<{
	data: string;
	onClose: Function;
}>();

// 创建组件ref
const contextMenu = ref();
onMounted(async () => {
	// 确保组件已经渲染
	await nextTick();
	// 触发组件focus
	contextMenu.value.focus();
});

/* 判断点击菜单类型 */
const clickMenu = (type: string) => {
	if (type === "sendEmail") sendEmailMenu(props.data);
	if (type === "sendPhone") closeRightTab(props.data);
	if (type === "sendOther") closeOtherTab(props.data);
	props.onClose();
};

/* 发送到邮箱 */
const sendEmailMenu = (data: string) => {
	message.success(`${data}: 发送到邮箱`);
};

/* 发送到手机 */
const closeRightTab = (data: string) => {
	message.success(`${data}: 发送到手机`);
};

/* 其他 */
const closeOtherTab = (data: string) => {
	message.success(`${data}: 其他`);
};
</script>

<style scoped lang="less">
.context-menu {
	position: fixed;
	padding: 6px 0;
	font-size: 14px;
	font-weight: 500;
	user-select: none;
	background-color: @bg-color;
	border: 1px solid rgb(222 222 222 / 50%);
	border-radius: 2px;
	.context-menu-item-container {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 6px;
		cursor: pointer;
		&:hover {
			color: var(--ant-primary-color);
			background-color: var(--ant-primary-color-active-deprecated-f-30);
		}
		.context-menu-item {
			padding: 8px 12px;
		}
	}
	&:focus {
		outline: none;
	}
}
</style>
