<template>
	<a-config-provider :componentSize="assemblySize" :locale="i18nLocale">
		<!-- <a-spin :spinning="loading" :delay="500" :tip="$t('tip.loading')"> -->
		<router-view></router-view>
		<!-- </a-spin> -->
		<template #renderEmpty>
			<Empty />
		</template>
	</a-config-provider>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useGlobalStore } from "@/stores/modules/global";
import { getBrowserLang } from "@/utils/util";
import enUS from "ant-design-vue/es/locale/en_US";
import zhCN from "ant-design-vue/es/locale/zh_CN";
import { useTheme } from "@/hooks/useTheme";
// 组件picker时间国际化
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
// 自定义空状态
import Empty from "@/components/Empty/index.vue";

// 初始化主题配置
const { initTheme } = useTheme();
initTheme();

const globalStore = useGlobalStore();

// antd 语言配置
const i18nLocale = computed(() => {
	if (globalStore.language && globalStore.language == "zh_CN") {
		dayjs.locale("zh-cn");
		return zhCN;
	}
	if (globalStore.language == "en") {
		return enUS;
	}
	if (getBrowserLang() == "zh_CN") {
		dayjs.locale("zh-cn");
		return zhCN;
	} else {
		return enUS;
	}
});

// 配置组件全局大小
const assemblySize = computed(() => globalStore.assemblySize);

// 全局loading
// const loading = computed(() => globalStore.loading);
</script>

<style scoped></style>
