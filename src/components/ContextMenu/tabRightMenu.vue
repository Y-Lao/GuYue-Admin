<template>
	<div class="context-menu" ref="contextMenu" @blur="() => onClose()" tabindex="-1">
		<div class="context-menu-item-container">
			<vertical-right-outlined />
			<div class="context-menu-item" @click="clickMenu('closeLeft')">关闭左侧</div>
		</div>
		<div class="context-menu-item-container">
			<vertical-left-outlined />
			<div class="context-menu-item" @click="clickMenu('closeRight')">关闭右侧</div>
		</div>
		<div class="context-menu-item-container">
			<close-circle-outlined />
			<div class="context-menu-item" @click="clickMenu('closeOther')">关闭其他</div>
		</div>
		<div class="context-menu-item-container">
			<sync-outlined />
			<div class="context-menu-item" @click="clickMenu('refreshPage')">刷新页面</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref, nextTick } from "vue";
import { VerticalRightOutlined, VerticalLeftOutlined, CloseCircleOutlined, SyncOutlined } from "@ant-design/icons-vue";
import { useGlobalStore } from "@/stores/modules/global";
import { useTabsStore } from "@/stores/modules/tabs";
import { useKeepAliveStore } from "@/stores/modules/keepAlive";

interface MenuValue {
	path: string;
	name: string;
}

const globalStore = useGlobalStore();
const tabsStore = useTabsStore();
const keepAliveStore = useKeepAliveStore();

const props = defineProps<{
	data: MenuValue;
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

const clickMenu = (type: string) => {
	if (type === "closeLeft") closeLeftTab(props.data);
	if (type === "closeRight") closeRightTab(props.data);
	if (type === "closeOther") closeOtherTab(props.data);
	if (type === "refreshPage") refresh(props.data);
	props.onClose();
};

// 关闭左侧
const closeLeftTab = (menu: MenuValue) => {
	tabsStore.closeLeftTab(menu.path);
	const names = tabsStore.tabsMenuList.map(item => item.name);
	keepAliveStore.setKeepAliveName([...names] as string[]);
};

// 关闭右侧
const closeRightTab = (menu: MenuValue) => {
	tabsStore.closeRightTab(menu.path);
	const names = tabsStore.tabsMenuList.map(item => item.name);
	keepAliveStore.setKeepAliveName([...names] as string[]);
};

// 关闭其他
const closeOtherTab = (menu: MenuValue) => {
	tabsStore.rightCloseMultipleTab(menu.path);
	keepAliveStore.setKeepAliveName([menu.name] as string[]);
};

// 刷新当前页面
const refresh = (menu: MenuValue) => {
	if (globalStore.routeName !== menu.name) return;
	setTimeout(() => {
		keepAliveStore.removeKeepAliveName(menu.name as string);
		globalStore.setGlobalState("refreshPage", false);
		nextTick(() => {
			keepAliveStore.addKeepAliveName(menu.name as string);
			globalStore.setGlobalState("refreshPage", true);
		});
	}, 0);
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
		padding: 0 14px;
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
