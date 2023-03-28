<template>
	<a-dropdown :trigger="['click']" placement="bottom">
		<i :class="'iconfont icon-zhongyingwen'" class="toolBar-icon"></i>
		<template #overlay>
			<a-menu @click="handleSetLanguage">
				<a-menu-item key="zh_CN" :disabled="language && language === 'zh_CN'">简体中文</a-menu-item>
				<a-menu-item key="en" :disabled="language === 'en'">English</a-menu-item>
			</a-menu>
		</template>
	</a-dropdown>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { GlobalStore } from "@/stores";
import { getBrowserLang } from "@/utils/util";

const i18n = useI18n();
const globalStore = GlobalStore();
const language = computed((): string => globalStore.language);

// 切换语言
const handleSetLanguage = (lang: string) => {
	i18n.locale.value = lang;
	globalStore.updateLanguage(lang);
};

onMounted(() => {
	handleSetLanguage(language.value || getBrowserLang());
});
</script>
