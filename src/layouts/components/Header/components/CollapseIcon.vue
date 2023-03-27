<template>
	<div class="collapse-icon" @click="collapse">
		<component :is="themeConfig.isCollapse ? 'MenuUnfoldOutlined' : 'MenuFoldOutlined'"></component>
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { GlobalStore } from "@/stores";

const globalStore = GlobalStore();
const themeConfig = computed(() => globalStore.themeConfig);

// 点击菜单Icon
const collapse = () => {
	globalStore.setThemeConfig({ ...themeConfig.value, isCollapse: !themeConfig.value.isCollapse });
};
</script>

<style scoped lang="less">
.collapse-icon {
	margin-right: 20px;
	font-size: 22px;
	cursor: pointer;
}
</style>
