<template>
	<a-drawer v-model:visible="drawerVisible" title="Basic Drawer" placement="right">
		<p>Some contents...</p>
		<p>Some contents...</p>
		<p>Some contents...</p>
	</a-drawer>
</template>

<script setup lang="ts">
import { ref } from "vue";
import mittBus from "@/utils/mittBus";

// 打开主题设置
const drawerVisible = ref(false);
mittBus.on("openThemeDrawer", () => (drawerVisible.value = true));
</script>

<style scoped lang="less">
@import url("./index.less");
</style>
