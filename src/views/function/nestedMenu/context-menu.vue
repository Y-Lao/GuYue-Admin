<template>
	<div ref="containerRef">
		<!-- 默认插槽 -->
		<slot></slot>
		<!-- 通过 Teleport 将菜单传送到 body 中  -->
		<Teleport to="body">
			<!-- 使用 Transition 组件，并注册 beforeEnter 和 enter、 afterEnter事件 -->
			<Transition @before-enter="handleBeforeEnter" @enter="handleEnter" @after-enter="handleAfterEnter">
				<!-- 显示菜单 -->
				<div v-if="showMenu" :style="{ left: `${x}px`, top: `${y}px` }" class="context-menu bg-#ffffff dark:bg-#101014">
					<div class="menu-list">
						<!-- 遍历菜单项 -->
						<div class="menu-item" v-for="item in menu" :key="item.label" @click="handleClick(item.label)">
							{{ item.label }}
						</div>
					</div>
				</div>
			</Transition>
		</Teleport>
	</div>
</template>

<script setup lang="ts">
import { ref, toRefs } from "vue";
import useContextMenu from "./useContextMenu";

interface Menu {
	label: string;
	value: string;
}
interface ContextMenuProps {
	menu: Menu[]; // 右键菜单项
}

const props = withDefaults(defineProps<ContextMenuProps>(), {});
const { menu } = toRefs(props);

const emit = defineEmits<{
	(e: "select", val: string): void;
}>();

const containerRef = ref(null);
const { x, y, showMenu } = useContextMenu(containerRef);

const handleClick = (val: string) => {
	// 选中菜单后关闭菜单
	showMenu.value = false;
	// 并返回选中的菜单
	emit("select", val);
};

/** 动画事件 */
const handleBeforeEnter = (el: any) => {
	el.style.height = 0;
	el.style.overflow = "hidden";
};
const handleEnter = (el: any) => {
	el.style.height = "auto";
	const h = el.clientHeight;
	el.style.height = 0;
	requestAnimationFrame(() => {
		el.style.height = `${h}px`;
		el.style.transition = `.3s`;
	});
};
const handleAfterEnter = (el: any) => {
	el.style.transition = "none";
};
</script>

<style scoped lang="less">
.context-menu {
	position: fixed;
	z-index: 9999;
	width: 120px;
	padding: 12px;
	border-radius: 6px;
	.menu-list {
		width: 100%;
		.menu-item {
			margin-bottom: 2px;
			font-size: 14px;
			cursor: pointer;
			&:hover {
				background-color: #eeeeee;
				border-radius: 2px;
			}
		}
	}
}
</style>
