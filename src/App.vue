<template>
	<a-config-provider :componentSize="assemblySize" :locale="i18nLocale">
		<router-view></router-view>
	</a-config-provider>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { GlobalStore } from "@/stores";
import { ConfigProvider } from "ant-design-vue";
import { getBrowserLang } from "@/utils/util";
import { DEFAULT_PRIMARY } from "@/config/config";
import enUS from "ant-design-vue/es/locale/en_US";
import zhCN from "ant-design-vue/es/locale/zh_CN";

// 初始化主题配置
ConfigProvider.config({
	theme: {
		primaryColor: DEFAULT_PRIMARY
	}
});

const globalStore = GlobalStore();

// antd 语言配置
const i18nLocale = computed(() => {
	if (globalStore.language && globalStore.language == "zh_CN") return zhCN;
	if (globalStore.language == "en") return enUS;
	return getBrowserLang() == "zh_CN" ? zhCN : enUS;
});

// 配置组件全局大小
const assemblySize = computed(() => globalStore.assemblySize);
</script>

<style scoped></style>
