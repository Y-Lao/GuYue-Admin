<!-- 一次性加载 LayoutComponents -->
<template>
	<component :is="LayoutComponents[themeConfig.layout]"></component>
	<ThemeDrawer />
</template>

<script setup lang="ts" name="layout">
import { computed, type Component } from "vue";
import { GlobalStore } from "@/stores";
// 主题抽屉
import ThemeDrawer from "./components/ThemeDrawer/index.vue";
// 纵向布局
import LayoutVertical from "./LayoutVertical/index.vue";

const LayoutComponents: { [key: string]: Component } = {
	vertical: LayoutVertical
};

const globalStore = GlobalStore();
const themeConfig = computed(() => globalStore.themeConfig);
</script>

<style scoped lang="less"></style>
