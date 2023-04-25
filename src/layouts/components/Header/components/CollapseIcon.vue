<template>
	<div class="collapse-icon" @click="collapse">
		<component :is="globalStore.isCollapse ? 'MenuUnfoldOutlined' : 'MenuFoldOutlined'" id="collapseIconGuide"></component>
	</div>
</template>

<script setup lang="ts">
import { useGlobalStore } from "@/stores/modules/global";

const globalStore = useGlobalStore();
// 点击菜单Icon
const collapse = () => {
	globalStore.setGlobalState("isCollapse", !globalStore.isCollapse);
};
</script>

<style scoped lang="less">
.collapse-icon {
	margin-right: 20px;
	font-size: 22px;
	cursor: pointer;
}
</style>
