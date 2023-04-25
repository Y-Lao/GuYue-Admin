<template>
	<div>
		<a-dropdown :trigger="['click']" placement="bottom">
			<i :class="'iconfont icon-zhongyingwen'" class="toolBar-icon" id="languageGuide"></i>
			<template #overlay>
				<a-menu>
					<a-menu-item key="zh_CN" :disabled="language && language === 'zh_CN'" @click="handleSetLanguage('zh_CN')"
						>简体中文</a-menu-item
					>
					<a-menu-item key="en" :disabled="language === 'en'" @click="handleSetLanguage('en')">English</a-menu-item>
				</a-menu>
			</template>
		</a-dropdown>
	</div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useGlobalStore } from "@/stores/modules/global";
import { getBrowserLang } from "@/utils/util";

const i18n = useI18n();
const globalStore = useGlobalStore();
const language = computed((): string => globalStore.language);

// 切换语言
const handleSetLanguage = (lang: string) => {
	i18n.locale.value = lang;
	globalStore.setGlobalState("language", lang);
};

onMounted(() => {
	handleSetLanguage(language.value || getBrowserLang());
});
</script>
