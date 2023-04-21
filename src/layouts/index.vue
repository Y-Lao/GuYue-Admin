<!-- 一次性加载 LayoutComponents -->
<template>
	<component :is="LayoutComponents[layout]"></component>
	<ThemeDrawer />
</template>

<script setup lang="ts" name="layout">
import { computed, type Component } from "vue";
import { useGlobalStore } from "@/stores/modules/global";
// 主题抽屉
import ThemeDrawer from "./components/ThemeDrawer/index.vue";
// 纵向布局
import LayoutVertical from "./LayoutVertical/index.vue";

const LayoutComponents: { [key: string]: Component } = {
	vertical: LayoutVertical
};

const globalStore = useGlobalStore();
const layout = computed(() => globalStore.layout);
</script>

<style scoped lang="less"></style>
