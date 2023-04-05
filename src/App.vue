<template>
	<a-config-provider>
		<router-view></router-view>
	</a-config-provider>
</template>

<script setup lang="ts">
import { ConfigProvider } from "ant-design-vue";
import { DEFAULT_PRIMARY } from "@/config/config";

// 初始化主题配置
ConfigProvider.config({
	theme: {
		primaryColor: DEFAULT_PRIMARY
	}
});
</script>

<style scoped></style>
